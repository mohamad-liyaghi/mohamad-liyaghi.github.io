import { motion, useScroll, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../lib/hooks";
import { Icon } from "./Icons";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent rtl:origin-right"
    />
  );
}

export function ThemeToggle() {
  const [theme, toggle] = useTheme();
  const { t } = useTranslation();
  return (
    <button
      onClick={toggle}
      aria-label={t("a11y.theme")}
      title={t("a11y.theme")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-dim transition-colors hover:border-accent/50 hover:text-text"
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
    </button>
  );
}

export function LangToggle() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const cur = i18n.language === "fa" ? "fa" : "en";
  const next = cur === "fa" ? "en" : "fa";
  // keep the current sub-path (e.g. /en/blog → /fa/blog) and any hash
  const goNext = () => {
    const rest = window.location.pathname.replace(/^\/(en|fa)/, "");
    navigate(`/${next}${rest}${window.location.hash}`);
  };
  return (
    <button
      onClick={goNext}
      aria-label={t("a11y.lang")}
      title={t("a11y.lang")}
      className="inline-flex h-10 items-center gap-1 rounded-md border border-line px-2.5 text-xs keep-mono transition-colors hover:border-accent/50"
    >
      <span className={cur === "en" ? "text-text" : "text-faint"}>EN</span>
      <span className="text-faint">/</span>
      <span className={cur === "fa" ? "text-text" : "text-faint"}>فا</span>
    </button>
  );
}
