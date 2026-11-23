import { useEffect, useRef, useState, type RefObject } from "react";
import { SECTIONS, type SectionId } from "../data/profile";

/** True when the OS asks for as little motion as possible. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Which section the reader is in, for the nav indicator. */
export function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);
  useEffect(() => {
    const targets = SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id as SectionId);
        }
      },
      // A thin band a third of the way down the viewport decides.
      { rootMargin: "-33% 0px -66% 0px" },
    );
    targets.forEach((el) => io.observe(el));
    const top = () => window.scrollY < 200 && setActive(null);
    window.addEventListener("scroll", top, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", top);
    };
  }, []);
  return active;
}

export function useScrolledPast(offset = 8): boolean {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const on = () => setPast(window.scrollY > offset);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [offset]);
  return past;
}

/**
 * Spotlight for `.spot` cards inside a container: one delegated pointer
 * listener writes the cursor position into the hovered card's --mx/--my.
 * Nothing runs on touch, where there is no hover to light.
 */
export function useSpotlight<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || !window.matchMedia("(hover: hover)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element).closest<HTMLElement>(".spot");
      if (!card || !root.contains(card)) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    const onLeave = (e: PointerEvent) => {
      const card = (e.target as Element).closest<HTMLElement>(".spot");
      if (card) {
        card.style.setProperty("--mx", "50%");
        card.style.setProperty("--my", "-40%");
      }
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerout", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerout", onLeave);
    };
  }, []);
  return ref;
}

/** "⌘" on Apple platforms, "Ctrl" elsewhere. */
export function useModKey(): string {
  const [mod, setMod] = useState("Ctrl");
  useEffect(() => {
    const p = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ?? navigator.platform;
    if (/mac|iphone|ipad/i.test(p)) setMod("⌘");
  }, []);
  return mod;
}
