export function initScrollReveal() {
  // Respect reduced-motion: skip entirely so content renders immediately (never hidden).
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const sr = ScrollReveal({
    origin: "bottom",
    distance: "26px",
    duration: 760,
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    opacity: 0,
    reset: false,
    mobile: true,
    viewFactor: 0.12,
  });

  // Hero — orchestrated top-down entrance, snappy and staggered.
  sr.reveal(".delaySmallReveal", { delay: 80, origin: "top", distance: "18px" });
  sr.reveal(".delayMediumReveal", { delay: 200, origin: "top", distance: "22px" });
  sr.reveal(".delayLargeReveal", { delay: 320, origin: "top", distance: "26px" });
  sr.reveal(".delayExtraBigReveal", { delay: 440, origin: "top", distance: "26px" });

  // Cards, timeline & grids — reveal together as one group per section
  // (no per-item interval, so a section's items rise in at the same time).
  sr.reveal(".intervalCardReveal");
  sr.reveal(".intervalCardRevealContact");
}
