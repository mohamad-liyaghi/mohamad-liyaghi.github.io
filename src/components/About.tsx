import { SECTIONS } from "../data/profile";
import { useI18n } from "../i18n";
import { Reveal, Section, SectionHead } from "./primitives";

const N = SECTIONS.find((s) => s.id === "about")!.n;
const FACT_KEYS = ["role", "company", "work", "education", "languages"] as const;

export function About() {
  const { t } = useI18n();

  return (
    <Section id="about">
      <SectionHead id="about" n={N} title={t.about.title} />

      <div className="grid items-start gap-10 lg:grid-cols-[1.35fr_18rem] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
        <div className="flex flex-col gap-6">
          {t.about.paragraphs.map((p, i) => (
            <Reveal key={p.slice(0, 24)} delay={i * 80}>
              <p className="text-[1.02rem] leading-[1.75]">{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="lg:row-span-2">
          <figure className="portrait">
            <img
              src="/portrait.jpg"
              alt={t.a11y.photo}
              width={800}
              height={1000}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </figure>
        </Reveal>

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
