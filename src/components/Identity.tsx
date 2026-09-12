import { useEffect, useState } from "react";
import { HIGHLIGHTS, PROFILE, SECTIONS, SOCIALS } from "../data/profile";
import { useI18n } from "../i18n";
import { useActiveSection, useReveal, useTheme } from "../lib/hooks";
import { GitHub, LinkedIn, Mail, Medium, Moon, Search, Sun, Telegram } from "./Icons";
import { openPalette } from "./CommandPalette";
import { Out } from "./primitives";
import { ResumeMenu } from "./ResumeMenu";

const MARK = {
  github: GitHub,
  linkedin: LinkedIn,
  medium: Medium,
  telegram: Telegram,
  email: Mail,
} as const;

function Flourish() {
  const ref = useReveal<SVGSVGElement>();
  return (
    <svg
      ref={ref}
      className="flourish mt-2 h-2.5 w-[min(12rem,70%)] text-accent-bright"
      viewBox="0 0 300 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 8.6c39-4.9 77.4-6.2 115.4-5.3 25.3.6 50.6 2.6 75.9 3 34.1.6 68.2-1.3 103.7-4.6"
        pathLength={1}
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Identity() {
  const { t, lang, toggleLang } = useI18n();
  const [theme, toggleTheme] = useTheme();
  const active = useActiveSection();
  const nameRef = useReveal<HTMLHeadingElement>();
  const socials = SOCIALS.filter((s) => s.id !== "email");
  const [mod, setMod] = useState("Ctrl");
  const themeLabel = t.a11y.theme.replace("{mode}", theme === "dark" ? t.a11y.light : t.a11y.dark);

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setMod("⌘");
  }, []);

  return (
    <aside className="flex flex-col pt-24 lg:sticky lg:top-0 lg:h-dvh lg:overflow-y-auto lg:pt-10 lg:pb-10">
      <div className="mb-8 hidden items-center gap-1 lg:flex">
        <button
          type="button"
          onClick={openPalette}
          aria-label={t.a11y.palette}
          className="flex h-9 items-center gap-1.5 px-2 font-mono text-[0.7rem] tracking-wide text-muted transition-colors duration-300 hover:text-ink"
        >
          <Search width={14} height={14} />
          <kbd className="rounded-sm border border-hairline px-1 py-px text-[0.65rem]">{mod}K</kbd>
        </button>
        <span className="flex-1" />
        <button
          type="button"
          onClick={toggleLang}
          aria-label={t.a11y.lang}
          className="icon-btn w-auto px-2.5 font-mono text-xs font-medium tracking-widest uppercase"
        >
          {lang === "en" ? "فا" : "EN"}
        </button>
        <button type="button" onClick={toggleTheme} aria-label={themeLabel} className="icon-btn">
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
      </div>

      <p className="label flex items-center gap-2.5">
        <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent-bright" />
        {t.hero.eyebrow}
      </p>

      <h1 ref={nameRef} className="hero-name wipe mt-5 font-display text-ink">
        {t.hero.nameLines.map((line, i) => (
          <span key={line} style={{ ["--delay" as string]: `${80 + i * 90}ms` }}>
            {line}
          </span>
        ))}
      </h1>
      <Flourish />

      <p className="mt-6 text-[0.95rem]">
        <span className="font-medium text-ink">{t.hero.role}</span>
        <span className="text-muted"> {t.hero.at} </span>
        <Out href={PROFILE.companyUrl} className="ul font-medium text-accent">
          {PROFILE.company}
        </Out>
      </p>

      <p className="mt-4 max-w-sm text-[1.05rem] leading-snug text-ink">{t.hero.line}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {HIGHLIGHTS.map((item) => (
          <li
            key={item}
            className="border border-hairline bg-surface px-2 py-0.5 font-mono text-[0.7rem] text-body"
          >
            {item}
          </li>
        ))}
      </ul>

      <nav aria-label={t.a11y.primary} className="mt-10 hidden lg:block">
        <ul className="flex flex-col gap-1">
          {SECTIONS.map(({ id }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`group flex items-center gap-4 py-1.5 text-sm transition-colors duration-300 ${
                  active === id ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span
                  aria-hidden
                  className={`h-px bg-current transition-[width] duration-300 ${
                    active === id ? "w-8" : "w-4 group-hover:w-6"
                  }`}
                />
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-auto">
        <ResumeMenu />
        <a href={`mailto:${PROFILE.email}`} className="btn btn-ghost">
          <Mail />
          {t.hero.email}
        </a>
      </div>

      <ul className="mt-6 flex items-center gap-1">
        {socials.map((s) => {
          const Mark = MARK[s.id];
          return (
            <li key={s.id}>
              <Out
                href={s.href}
                className="icon-btn"
                aria-label={t.contact.socials[s.id]}
              >
                <Mark />
              </Out>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
