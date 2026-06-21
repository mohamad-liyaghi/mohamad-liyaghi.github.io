import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SECTIONS } from "../data/site";
import { scrollToId, useScrollSpy } from "../lib/hooks";
import { Icon } from "./Icons";
import { LangToggle, ThemeToggle } from "./controls";

const IDS = SECTIONS.map((s) => s.id);

export function Nav() {
  const { t } = useTranslation();
  const active = useScrollSpy(IDS);
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  const home = () => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", location.pathname);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-line bg-bg/72 backdrop-blur-xl">
        <nav className="wrap flex h-16 items-center justify-between gap-4">
          {/* left: window chrome + path → home */}
          <button onClick={home} className="group flex items-center gap-2.5">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </span>
            <span
              className="keep-mono text-sm text-dim transition-colors group-hover:text-text"
              dir="ltr"
            >
              ~/mohamad-liyaghi
            </span>
          </button>

          {/* center: numbered nav (desktop) */}
          <ul className="hidden items-center gap-0.5 md:flex">
            {SECTIONS.map((s) => {
              const on = active === s.id;
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
          </ul>

          {/* right: controls */}
          <div className="flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={t("a11y.menu")}
              aria-expanded={open}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-dim md:hidden"
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
            className="border-b border-line bg-bg/95 backdrop-blur-xl md:hidden"
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
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
