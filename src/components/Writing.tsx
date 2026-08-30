import { ARTICLES, PROFILE, SECTIONS } from "../data/profile";
import { useI18n } from "../i18n";
import { ArrowOut } from "./Icons";
import { Out, Reveal, Section, SectionHead } from "./primitives";

const N = SECTIONS.find((s) => s.id === "writing")!.n;

export function Writing() {
  const { t, num, fmt, monthYear } = useI18n();

  return (
    <Section id="writing">
      <SectionHead id="writing" n={N} title={t.writing.title} lede={t.writing.lede} />

      <ul className="border-t border-hairline">
        {ARTICLES.map((a, i) => (
          <li key={a.id} className="border-b border-hairline">
            <Reveal delay={i * 55}>
              <Out href={a.href} className="group block py-6">
                <div className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-8">
                  <p className="label pt-1 whitespace-nowrap">
                    {monthYear(a.date)}
                    <span aria-hidden className="mx-2 text-rule">
                      /
                    </span>
                    {fmt(t.writing.read, { minutes: num(a.minutes) })}
                  </p>
                  {/* Titles stay English, so the whole row lays out LTR even on the
                      Persian page — otherwise each row packs to the right and the
                      column ends up with a ragged left edge. */}
                  <h3
                    dir="ltr"
                    className="flex items-start gap-2 text-[1.15rem] leading-snug text-ink transition-colors duration-300 group-hover:text-accent sm:text-[1.35rem]"
                  >
                    <span className="ul">
                      {t.writing.items[a.id as keyof typeof t.writing.items]}
                    </span>
                    <ArrowOut
                      width={15}
                      height={15}
                      className="mt-1.5 shrink-0 text-muted transition-colors duration-300 group-hover:text-accent"
                    />
                  </h3>
                </div>
              </Out>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={120}>
        <Out
          href={PROFILE.medium}
          className="ul mt-10 inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-accent"
        >
          {t.writing.more}
          <ArrowOut width={14} height={14} />
        </Out>
      </Reveal>
    </Section>
  );
}
