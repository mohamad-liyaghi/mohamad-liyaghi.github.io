import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SECTIONS } from "../data/site";
import { scrollToId, useScrollSpy } from "../lib/hooks";
import { Icon } from "./Icons";
import { LangToggle, ThemeToggle } from "./controls";

const IDS = SECTIONS.map((s) => s.id);
const PAGES = ["blog", "uses"] as const;

export function Nav() {
  const { t, i18n } = useTranslation();
  const active = useScrollSpy(IDS);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const lng = i18n.language === "fa" ? "fa" : "en";
  const onHome = location.pathname.replace(/\/+$/, "") === `/${lng}`;

  const go = (id: string) => {
    setOpen(false);
    if (onHome) scrollToId(id);
    else navigate(`/${lng}#${id}`);
  };

  const home = () => {
    setOpen(false);
    if (onHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.replaceState(null, "", location.pathname);
    } else {
      navigate(`/${lng}`);
    }
  };

  // Close the mobile menu on Escape while it's open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-line bg-bg/72 backdrop-blur-xl">
        <nav className="wrap flex h-16 items-center justify-between gap-4">
          {/* left: prompt glyph + path → home */}
          <button
            onClick={home}
            aria-label={t("nav.home")}
            className="group flex items-center gap-2"
          >
            <Icon name="terminal" size={16} className="text-accent" />
            <span
              className="keep-mono text-sm text-dim transition-colors group-hover:text-text"
              dir="ltr"
            >
              ~/mohamad-liyaghi
            </span>
          </button>

          {/* center: numbered sections + pages (desktop) */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {SECTIONS.map((s) => {
              const on = onHome && active === s.id;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => go(s.id)}
                    className={`flex items-baseline gap-1.5 rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                      on ? "text-text" : "text-dim hover:text-text"
                    }`}
                  >
                    <span
                      className={`kbd keep-mono ${on ? "text-accent" : "text-faint"}`}
                    >
                      {s.n}
                    </span>
                    <span>{t(`nav.${s.key}`)}</span>
                  </button>
                </li>
              );
            })}
            <li aria-hidden="true" className="mx-1 h-4 w-px bg-line" />
            {PAGES.map((p) => {
              const onPage = location.pathname.endsWith(`/${p}`);
              return (
                <li key={p}>
                  <Link
                    to={`/${lng}/${p}`}
                    onClick={() => setOpen(false)}
                    className={`rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                      onPage ? "text-accent" : "text-dim hover:text-text"
                    }`}
                  >
                    {t(`nav.${p}`)}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* right: controls */}
          <div className="flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={t("a11y.menu")}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-dim lg:hidden"
            >
              <Icon name={open ? "close" : "menu"} size={18} />
            </button>
          </div>
        </nav>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-b border-line bg-bg/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="wrap grid gap-1 py-3">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => go(s.id)}
                    className="flex w-full items-center gap-3 rounded-md px-2 py-2.5 text-start text-base text-dim transition-colors hover:bg-bg-elev hover:text-text"
                  >
                    <span className="kbd keep-mono text-accent">{s.n}</span>
                    <span>{t(`nav.${s.key}`)}</span>
                  </button>
                </li>
              ))}
              <li aria-hidden="true" className="my-1 h-px bg-line" />
              {PAGES.map((p) => (
                <li key={p}>
                  <Link
                    to={`/${lng}/${p}`}
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center gap-3 rounded-md px-2 py-2.5 text-start text-base text-dim transition-colors hover:bg-bg-elev hover:text-text"
                  >
                    <span className="kbd keep-mono text-accent">~/</span>
                    <span>{t(`nav.${p}`)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
