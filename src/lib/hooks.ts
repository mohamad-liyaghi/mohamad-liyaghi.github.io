import { useCallback, useEffect, useRef, useState } from "react";
import { SECTIONS, type SectionId } from "../data/profile";

/** True once the user has asked the OS to keep motion to a minimum. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * Adds `data-in` to an element the first time it enters the viewport, which is
 * all the CSS needs to run a reveal. Elements stay revealed once seen — nothing
 * on this page should animate twice.
 */
export function useReveal<T extends Element = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.setAttribute("data-in", "");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in", "");
            io.unobserve(entry.target);
          }
        }
      },
      // The bottom margin holds the reveal until the element is properly in
      // view, and it is in pixels rather than a percentage on purpose: as a
      // share of a very tall window the dead band grows past the footer, and
      // the last rows of the page would then never fire at all.
      { rootMargin: "0px 0px -64px 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/** Which section the reader is currently looking at, for the nav. */
export function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);
  useEffect(() => {
    const targets = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

/** True once the page has scrolled past the given offset. */
export function useScrolledPast(offset = 24): boolean {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  return past;
}

export type Theme = "light" | "dark";

/** Theme lives on <html data-theme> and is set before paint in index.html. */
export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  });
  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", next === "dark" ? "#12110D" : "#F7F4EE");
      try {
        window.localStorage.setItem("theme", next);
      } catch {
        /* the choice just won't survive a reload */
      }
      return next;
    });
  }, []);
  return [theme, toggle];
}
