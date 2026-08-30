import { SECTIONS } from "../data/profile";
import { useI18n } from "../i18n";
import { Reveal, Section, SectionHead } from "./primitives";

const N = SECTIONS.find((s) => s.id === "about")!.n;
const FACT_KEYS = ["based", "role", "company", "languages"] as const;

export function About() {
  const { t } = useI18n();

  return (
    <Section id="about">
      <SectionHead id="about" n={N} title={t.about.title} />

      <div className="grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          {t.about.paragraphs.map((p, i) => (
            <Reveal key={p.slice(0, 24)} delay={i * 80}>
              <p className="text-[1.02rem] leading-[1.75]">{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <dl className="border-t border-rule">
            {FACT_KEYS.map((key) => {
              const fact = t.about.facts[key];
              return (
                <div key={key} className="border-b border-hairline py-4">
                  <dt className="label">{fact.label}</dt>
                  <dd className="mt-1.5 text-[0.95rem] text-ink">{fact.value}</dd>
                </div>
              );
            })}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
