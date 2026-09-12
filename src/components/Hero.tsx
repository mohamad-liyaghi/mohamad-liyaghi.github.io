import type { CSSProperties } from "react";
import { ARTICLES, PROFILE, STATS } from "../data/profile";
import { useI18n } from "../i18n";
import { useReveal } from "../lib/hooks";
import { Mail } from "./Icons";
import { Container, Out, Reveal } from "./primitives";
import { ResumeMenu } from "./ResumeMenu";

/** The one drawn mark on the page: an amber stroke inked under the name. */
function Flourish() {
  const ref = useReveal<SVGSVGElement>();
  return (
    <svg
      ref={ref}
      className="flourish mt-1 h-3 w-[min(20rem,68%)] text-accent-bright"
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

function Stat({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div>
        <div className="font-display text-3xl text-ink sm:text-4xl">{value}</div>
        <div className="label mt-1.5">{label}</div>
      </div>
    </Reveal>
  );
}

function Pipeline() {
  const { t, num, lang } = useI18n();
  const zero = lang === "fa" ? "\u06F0" : "0";
  return (
    <Reveal delay={480}>
      <aside className="figure p-6 sm:p-7">
        <p className="label text-accent">{t.pipeline.kicker}</p>
        <p className="mt-5 font-display text-2xl leading-snug text-ink sm:text-[1.65rem]">
          {t.pipeline.from}
          <span className="mt-1 block text-muted">{t.pipeline.to}</span>
        </p>
        <ol className="mt-8 flex flex-col">
          {t.pipeline.steps.map((step, i) => (
            <li
              key={step.title}
              className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-hairline py-3.5"
            >
              <span className="label pt-1 text-accent">{num(i + 1).padStart(2, zero)}</span>
              <div>
                <p className="font-medium text-ink">{step.title}</p>
                <p className="mt-0.5 text-[0.9rem] text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </aside>
    </Reveal>
  );
}

export function Hero() {
  const { t, num } = useI18n();
  const nameRef = useReveal<HTMLHeadingElement>();

  return (
    <section id="top" className="relative pt-32 pb-16 sm:pt-40 sm:pb-24">
      <Container>
        <Reveal>
          <p className="label flex items-center gap-2.5">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent-bright"
            />
            {t.hero.eyebrow}
          </p>
        </Reveal>

        <div className="mt-7 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          <div>
            <h1 ref={nameRef} className="hero-name wipe font-display text-ink">
              {t.hero.nameLines.map((line, i) => (
                <span key={line} style={{ "--delay": `${120 + i * 110}ms` } as CSSProperties}>
                  {line}
                </span>
              ))}
            </h1>

            <Flourish />

            <Reveal delay={420}>
              <p className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.95rem]">
                <span className="font-medium text-ink">{t.hero.role}</span>
                <span className="text-muted">{t.hero.at}</span>
                <Out
                  href={PROFILE.companyUrl}
                  className="ul inline-flex items-center gap-1 font-medium text-accent"
                >
                  {PROFILE.company}
                </Out>
              </p>
            </Reveal>

            <Reveal delay={500}>
              <p className="hero-statement mt-8 max-w-2xl font-display text-[clamp(1.25rem,2.8vw,1.7rem)] leading-[1.45] text-ink">
                {t.hero.statement}
              </p>
            </Reveal>

            <Reveal delay={560}>
              <p className="mt-6 max-w-xl text-[0.95rem] text-muted">{t.hero.lede}</p>
            </Reveal>

            <Reveal delay={620}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <ResumeMenu />
                <a href={`mailto:${PROFILE.email}`} className="btn btn-ghost">
                  <Mail />
                  {t.hero.email}
                </a>
              </div>
            </Reveal>
          </div>

          <Pipeline />
        </div>

        <div className="mt-16 border-t border-hairline pt-8">
          <div className="grid grid-cols-3 gap-6 sm:max-w-lg">
            <Stat value={num(STATS.years)} label={t.stats.years} delay={700} />
            <Stat value={num(STATS.repos)} label={t.stats.repos} delay={760} />
            <Stat value={num(ARTICLES.length)} label={t.stats.writing} delay={820} />
          </div>
        </div>
      </Container>
    </section>
  );
}
