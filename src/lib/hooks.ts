import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const THEME_COLOR: Record<Theme, string> = {
  dark: "#16161e",
  light: "#e1e2e7",
};

export function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

/** Apply a theme to the DOM and notify every useTheme() listener. */
export function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* ignore */
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", THEME_COLOR[theme]);
  window.dispatchEvent(new CustomEvent("themechange"));
}

export function toggleTheme(): Theme {
  const next: Theme = readTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

export function useTheme(): [Theme, () => void] {
  const [theme, set] = useState<Theme>(readTheme);

  useEffect(() => {
    // index.html sets data-theme pre-paint; sync the meta colour + state here,
    // and keep every instance in lock-step via the themechange event.
    set(readTheme());
    const sync = () => set(readTheme());
    window.addEventListener("themechange", sync);
    return () => window.removeEventListener("themechange", sync);
  }, []);

  return [theme, useCallback(() => void toggleTheme(), [])];
}

export function useScrollSpy(ids: string[], offset = 110): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + offset + 1;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= scrollPos) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        current = ids[ids.length - 1] ?? current;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offset]);

  return active;
}

export function useCopy(timeout = 1600): [boolean, (text: string) => void] {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(
    (text: string) => {
      navigator.clipboard
        ?.writeText(text)
        .then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), timeout);
        })
        .catch(() => {
          /* ignore */
        });
    },
    [timeout],
  );
  return [copied, copy];
}

/** Smooth-scroll to a section id and update the hash without a jump. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}
