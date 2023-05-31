export function initScrollReveal() {
  const sr = ScrollReveal({
    origin: "top",
    distance: "50px",
    duration: 2000,
  });

  sr.reveal(".delaySmallReveal", { delay: 200 });
  sr.reveal(".delayMediumReveal", { delay: 200 });
  sr.reveal(".delayLargeReveal", { delay: 300 });
  sr.reveal(".delayExtraBigReveal", { delay: 600 });
  sr.reveal(".intervalCardReveal", { interval: 300 });
  sr.reveal(".intervalCardRevealContact", { interval: 300 });
}
