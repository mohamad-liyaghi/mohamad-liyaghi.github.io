import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { ARTICLES, BUILD, PROFILE, RESUMES, type LangId } from "../data/profile";
import { useI18n } from "../i18n";
import { copyEmail } from "../lib/actions";
import { useModKey, useSpotlight } from "../lib/hooks";
import { HeroField } from "./HeroField";
import { ArrowOut, Chevron, Copy, Doc } from "./Icons";
import { Out } from "./primitives";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** A post counts as new for two weeks after it is published. */
function isFresh(iso: string) {
  const age = new Date(`${BUILD.date}T12:00:00`).getTime() - new Date(`${iso}T12:00:00`).getTime();
  return age >= 0 && age < 14 * 86_400_000;
}

function ResumeMenu() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !wrap.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrap}
      className="relative"
      onBlur={(e) => !wrap.current?.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <button
        ref={button}
        type="button"
        className="btn btn-ghost"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <Doc />
        {t.hero.resume}
        <Chevron width={16} height={16} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        id={id}
        hidden={!open}
        className="absolute start-0 top-full z-30 mt-2 w-[17rem] rounded-[var(--radius)] border border-line bg-raised p-1.5 shadow-[var(--shadow)]"
      >
        {(Object.keys(RESUMES) as LangId[]).map((l) => (
          <div key={l} className="flex items-center gap-1 rounded-[var(--radius-sm)] p-1">
            <span className="flex-1 ps-2 text-[0.9rem] font-medium">{t.resume[l]}</span>
            <a
              href={RESUMES[l].view}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-3 py-1.5 text-[0.85rem] text-muted transition-colors hover:bg-sunk hover:text-text"
            >
              {t.resume.read}
              <span className="sr-only"> ({t.a11y.external})</span>
            </a>
            <a
              href={RESUMES[l].pdf}
              download
              className="rounded-full px-3 py-1.5 text-[0.85rem] text-muted transition-colors hover:bg-sunk hover:text-text"
            >
              {t.resume.pdf}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function LatestEssay() {
  const { t, fmt, dayMonth, num } = useI18n();
  const ref = useSpotlight<HTMLDivElement>();
  const post = ARTICLES[0];
  if (!post) return null;
  return (
    <div ref={ref} className="fade-in w-full max-w-[26rem]" style={delay(650)}>
      <Out href={post.href} className="spot group block">
        <div className="spot-in flex gap-4 p-3.5">
          {post.image ? (
            <img
              src={post.image}
              alt=""
              width={112}
              height={63}
              decoding="async"
              className="h-[63px] w-[112px] shrink-0 rounded-[6px] object-cover"
            />
          ) : null}
          <div className="min-w-0">
            <p className="meta flex items-center gap-2 text-[0.8rem]">
              <span>{t.hero.latest}</span>
              {isFresh(post.date) ? (
                <span className="rounded-full bg-accent-fill px-1.5 py-px text-[0.7rem] font-semibold text-on-accent">
                  {t.hero.isNew}
                </span>
              ) : null}
            </p>
            <p className="mt-1 text-[0.95rem] leading-snug font-semibold text-text">
              <span lang="en" dir="ltr">
                {post.title}
              </span>
            </p>
            <p className="meta mt-1 text-[0.8rem]">
              {dayMonth(post.date)}, {fmt(t.writing.read, { minutes: num(post.minutes) })}
            </p>
          </div>
        </div>
      </Out>
    </div>
  );
}

export function Hero() {
  const { t, lang } = useI18n();
  const mod = useModKey();

  return (
    <section id="top" aria-labelledby="hero-name" className="relative isolate overflow-hidden">
      <HeroField />
      <div className="wrap relative flex min-h-[min(100svh,58rem)] flex-col justify-end pt-[calc(var(--bar)+3rem)] pb-14 sm:pb-20">
        <h1
          id="hero-name"
          className="display text-[clamp(3.4rem,13.5vw,11.5rem)] text-text"
          style={lang === "fa" ? { fontSize: "clamp(3.6rem, 15vw, 10rem)" } : undefined}
        >
          {t.hero.name.map((line, i) => (
            <span key={line} className="rise-line">
              <span style={delay(120 + i * 110)}>{line}</span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div className="fade-in relative z-10 max-w-[38rem]" style={delay(450)}>
            <p className="text-[1.2rem] font-medium text-text [font-stretch:105%]">
              {t.hero.role}{" "}
              <Out href={PROFILE.companyUrl} className="link text-accent">
                {PROFILE.company}
              </Out>
              <span className="text-muted">, {t.hero.companyNote}</span>
            </p>
            <p className="mt-4 text-muted">{t.hero.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button type="button" className="btn btn-primary" onClick={() => copyEmail(t.toast)}>
                <Copy />
                {t.hero.copyEmail}
              </button>
              <ResumeMenu />
              <a href={`mailto:${PROFILE.email}`} className="btn px-3 text-muted hover:text-text">
                {PROFILE.email}
                <ArrowOut width={15} height={15} className="rtl:-scale-x-100" />
              </a>
            </div>
          </div>
          <LatestEssay />
        </div>

        <p className="fade-in meta mt-12 hidden items-center gap-2 md:flex" style={delay(900)}>
          <span className="kbd">{mod}</span>
          <span className="kbd">K</span>
          <span>{t.hero.paletteHint}</span>
        </p>
      </div>
    </section>
  );
}
