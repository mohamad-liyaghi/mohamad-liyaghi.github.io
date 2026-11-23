import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { SECTIONS, type SectionId } from "../data/profile";
import { useI18n } from "../i18n";
import { copyEmail, openPalette, scrollToSection } from "../lib/actions";
import { useActiveSection, useModKey, useScrolledPast } from "../lib/hooks";
import { centerOf, toggleTheme, useTheme } from "../lib/theme";
import { Close, Copy, Mark, Menu, Moon, Search, Sun } from "./Icons";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  const theme = useTheme();
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      type="button"
      onClick={() => toggleTheme(centerOf(ref.current))}
      aria-label={theme === "dark" ? t.a11y.toLight : t.a11y.toDark}
      className={`icon-btn ${className}`}
    >
      <span className="relative block h-[18px] w-[18px]">
        <Sun
          className={`absolute inset-0 transition-[transform,opacity] duration-500 ease-[var(--ease-out)] ${
            theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
          }`}
        />
        <Moon
          className={`absolute inset-0 transition-[transform,opacity] duration-500 ease-[var(--ease-out)] ${
            theme === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-50 opacity-0"
          }`}
        />
      </span>
    </button>
  );
}

export function LangLink({ className = "" }: { className?: string }) {
  const { t, lang, setLang } = useI18n();
  const other = lang === "en" ? "fa" : "en";
  return (
    <a
      href={`/${other}/`}
      hrefLang={other}
      lang={other}
      onClick={(e) => {
        e.preventDefault();
        setLang(other);
      }}
      className={`icon-btn w-auto px-3 text-[0.8rem] font-semibold ${className}`}
    >
      {t.a11y.langShort}
      <span className="sr-only"> {t.a11y.lang}</span>
    </a>
  );
}

function useIndicator(active: SectionId | null, list: React.RefObject<HTMLUListElement | null>) {
  const [box, setBox] = useState<{ x: number; w: number; pad: number } | null>(null);
  const { lang } = useI18n();
  useLayoutEffect(() => {
    const ul = list.current;
    if (!ul) return;
    const measure = () => {
      const a = active ? ul.querySelector<HTMLElement>(`[data-id="${active}"]`) : null;
      const pad = a ? parseFloat(getComputedStyle(a).paddingLeft) || 0 : 0;
      setBox(a ? { x: a.offsetLeft, w: a.offsetWidth, pad } : null);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ul);
    return () => ro.disconnect();
  }, [active, list, lang]);
  return box;
}

export function Nav() {
  const { t } = useI18n();
  const mod = useModKey();
  const scrolled = useScrolledPast(12);
  const active = useActiveSection();
  const list = useRef<HTMLUListElement>(null);
  const box = useIndicator(active, list);
  const menu = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  const go = (id: SectionId) => (e: MouseEvent) => {
    e.preventDefault();
    menu.current?.close();
    scrollToSection(id);
  };

  // Close the mobile sheet if the window grows past the breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => mq.matches && menu.current?.close();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-3 focus:z-[100] focus:rounded-full focus:bg-accent-fill focus:px-4 focus:py-2 focus:text-on-accent"
      >
        {t.a11y.skip}
      </a>

      <header
        className={`no-print fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
          scrolled ? "border-b border-line bg-bg/88 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="wrap flex h-[var(--bar)] items-center gap-3">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              history.replaceState(history.state, "", location.pathname);
            }}
            className="group -ms-1 flex items-center gap-2.5 rounded-full p-1 text-muted transition-colors hover:text-text"
            aria-label={t.a11y.home}
          >
            <Mark className="h-7 w-7 transition-transform duration-500 ease-[var(--ease-out)] group-hover:rotate-90" />
            <span
              className={`hidden text-[0.95rem] font-semibold tracking-tight whitespace-nowrap text-text transition-opacity duration-300 sm:inline md:hidden lg:inline [font-stretch:110%] ${
                scrolled ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden="true"
            >
              {t.hero.name.join(" ")}
            </span>
          </a>

          <nav aria-label={t.a11y.primary} className="ms-auto hidden md:block">
            <ul ref={list} className="relative flex items-center">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    data-id={id}
                    onClick={go(id)}
                    aria-current={active === id ? "location" : undefined}
                    className={`block rounded-full px-2.5 py-2 text-[0.9rem] whitespace-nowrap transition-colors duration-200 lg:px-3.5 ${
                      active === id ? "text-text" : "text-muted hover:text-text"
                    }`}
                  >
                    {t.nav[id]}
                  </a>
                </li>
              ))}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0.5 left-0 h-[2px] rounded-full bg-accent transition-[transform,width,opacity] duration-500 ease-[var(--ease-out)]"
                style={{
                  width: box ? box.w - 2 * box.pad : 0,
                  transform: `translateX(${box ? box.x + box.pad : 0}px)`,
                  opacity: box ? 1 : 0,
                }}
              />
            </ul>
          </nav>

          <div className="ms-auto flex items-center gap-1 md:ms-3">
            <button
              type="button"
              onClick={openPalette}
              aria-keyshortcuts="Control+K Meta+K"
              className="hidden h-9 items-center gap-2 rounded-full border border-line ps-3 pe-1.5 text-[0.85rem] text-muted transition-colors hover:border-line-strong hover:text-text md:inline-flex"
            >
              <Search width={15} height={15} />
              <span className="sr-only">{t.a11y.palette}</span>
              <span className="kbd">{mod}K</span>
            </button>
            <button type="button" onClick={openPalette} aria-label={t.a11y.palette} className="icon-btn md:hidden">
              <Search />
            </button>
            <LangLink />
            <ThemeToggle />
            <button
              ref={menuButton}
              type="button"
              onClick={() => menu.current?.showModal()}
              aria-label={t.a11y.menu}
              aria-haspopup="dialog"
              className="icon-btn md:hidden"
            >
              <Menu />
            </button>
          </div>
        </div>
        <div className="h-px origin-left bg-accent opacity-70 scroll-progress [transform:scaleX(0)] rtl:origin-right" aria-hidden="true" />
      </header>

      <dialog
        ref={menu}
        aria-label={t.a11y.menu}
        className="h-dvh w-full bg-bg md:hidden"
        onClick={(e) => e.target === menu.current && menu.current?.close()}
      >
        <div className="pop flex h-full flex-col">
          <div className="wrap flex h-[var(--bar)] items-center justify-between">
            <Mark className="h-7 w-7 text-muted" />
            <button type="button" onClick={() => menu.current?.close()} aria-label={t.a11y.close} className="icon-btn">
              <Close />
            </button>
          </div>
          <nav aria-label={t.a11y.primary} className="wrap mt-6">
            <ul>
              {SECTIONS.map((id) => (
                <li key={id} className="border-b border-line">
                  <a href={`#${id}`} onClick={go(id)} className="block py-4 text-[1.75rem] font-semibold [font-stretch:115%]">
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="wrap mt-auto pb-10">
            <button
              type="button"
              className="btn btn-primary w-full justify-center"
              onClick={() => {
                menu.current?.close();
                void copyEmail(t.toast);
              }}
            >
              <Copy />
              {t.hero.copyEmail}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
