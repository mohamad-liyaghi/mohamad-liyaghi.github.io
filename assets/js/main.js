import { initScrollReveal } from "./scrollReveal.js";
import { menu } from "./menu.js";

menu();
initScrollReveal();

const header = document.querySelector("header");
if (header) {
  const onScrollHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScrollHeader();
  document.addEventListener("scroll", onScrollHeader, { passive: true });
}

const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    if (next === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
}

const progressBar = document.getElementById("scroll-progress");
if (progressBar) {
  const updateProgress = () => {
    const h = document.documentElement;
    const total = h.scrollHeight - h.clientHeight;
    const pct = total > 0 ? (h.scrollTop / total) * 100 : 0;
    progressBar.style.width = pct + "%";
  };
  updateProgress();
  document.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
}

const navLinks = document.querySelectorAll('header nav .nav-list a[href^="#"]');
const sections = Array.from(navLinks)
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);
if (sections.length && "IntersectionObserver" in window) {
  const setActive = (id) => {
    navLinks.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + id);
    });
  };
  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
  );
  sections.forEach((s) => io.observe(s));
}

// Draw-in the gradient underline beneath each section title as it enters view.
const underlines = document.querySelectorAll(".accent-underline");
if (underlines.length && "IntersectionObserver" in window) {
  const titleIO = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("title-in");
          obs.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -15% 0px", threshold: 0.2 }
  );
  underlines.forEach((el) => titleIO.observe(el));
}
