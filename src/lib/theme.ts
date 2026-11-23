import { useSyncExternalStore } from "react";

/**
 * Theme lives on <html data-theme>, settled before first paint by the inline
 * script in index.html (stored choice, else the OS preference, else dark).
 * Until the visitor picks, the page keeps following the OS; once they pick,
 * the choice sticks in localStorage.
 */
export type Theme = "light" | "dark";

const KEY = "theme";
const COLORS: Record<Theme, string> = { dark: "#0c1714", light: "#eff3ee" };
const listeners = new Set<() => void>();

const read = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

function stored(): Theme | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

function apply(next: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", next);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", COLORS[next]);
  listeners.forEach((fn) => fn());
}

if (typeof window !== "undefined") {
  const mq = window.matchMedia("(prefers-color-scheme: light)");
  mq.addEventListener("change", () => {
    if (!stored()) apply(mq.matches ? "light" : "dark");
  });
  // Another tab changed it.
  window.addEventListener("storage", (e) => {
    if (e.key === KEY && (e.newValue === "light" || e.newValue === "dark")) apply(e.newValue);
  });
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, read, () => "dark");
}

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

/**
 * Switch theme. With View Transitions the new theme grows as a circle from
 * `origin` (usually the toggle that was pressed); without them, or under
 * reduced motion, it simply swaps.
 */
export function setTheme(next: Theme, origin?: { x: number; y: number }) {
  try {
    localStorage.setItem(KEY, next);
  } catch {
    /* the choice just won't survive a reload */
  }
  const doc = document as ViewTransitionDoc;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!doc.startViewTransition || reduced) {
    apply(next);
    return;
  }
  const x = origin?.x ?? window.innerWidth - 40;
  const y = origin?.y ?? 32;
  const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const t = doc.startViewTransition(() => apply(next));
  t.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 560, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    })
    .catch(() => {
      /* transition skipped; the theme is already applied */
    });
}

export function toggleTheme(origin?: { x: number; y: number }) {
  setTheme(read() === "dark" ? "light" : "dark", origin);
}

/** Centre of an element, for the transition origin. */
export function centerOf(el: Element | null): { x: number; y: number } | undefined {
  if (!el) return undefined;
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}
