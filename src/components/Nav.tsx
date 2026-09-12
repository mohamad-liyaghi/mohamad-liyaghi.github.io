import { useEffect, useState } from "react";
import { SECTIONS } from "../data/profile";
import { useI18n } from "../i18n";
import { useScrolledPast, useTheme } from "../lib/hooks";
import { openPalette } from "./CommandPalette";
import { Close, Menu, Monogram, Moon, Search, Sun } from "./Icons";

export function Nav() {
  const { t, lang, toggleLang } = useI18n();
  const [theme, toggleTheme] = useTheme();
  const scrolled = useScrolledPast(16);
  const [open, setOpen] = useState(false);

  // A locked body keeps the drawer from scrolling the page behind it.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const themeLabel = t.a11y.theme.replace("{mode}", theme === "dark" ? t.a11y.light : t.a11y.dark);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[70] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        {t.a11y.skip}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 lg:hidden transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled
            ? "border-b border-hairline bg-paper/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <nav
          aria-label={t.a11y.primary}
          className="mx-auto flex h-16 w-full items-center justify-between gap-4 px-6 sm:px-8"
        >
          <a
            href="#top"
            className="flex items-center gap-2.5 text-ink transition-colors duration-300 hover:text-accent"
          >
            <Monogram className="h-7 w-7" />
            <span className="sr-only">{t.meta.title}</span>
          </a>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={openPalette}
              aria-label={t.a11y.palette}
              className="icon-btn"
            >
              <Search />
            </button>
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t.a11y.lang}
              className="icon-btn w-auto px-2.5 font-mono text-xs font-medium tracking-widest uppercase"
            >
              {lang === "en" ? "فا" : "EN"}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={themeLabel}
              className="icon-btn"
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.a11y.menu}
              aria-expanded={open}
              className="icon-btn"
            >
              <Menu />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        hidden={!open}
        className="fixed inset-0 z-[70] bg-paper lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label={t.a11y.menu}
      >
        <div className="flex h-16 items-center justify-end px-6 sm:px-8">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.a11y.close}
            className="icon-btn"
          >
            <Close />
          </button>
        </div>
        <ul className="flex flex-col px-6 sm:px-8">
          {SECTIONS.map(({ id, n }) => (
            <li key={id} className="border-b border-hairline">
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-5 py-5 text-2xl text-ink"
              >
                <span className="label text-accent">{n}</span>
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
