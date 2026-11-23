import { STACK } from "../data/profile";
import { useI18n } from "../i18n";
import { Section } from "./primitives";

const FACTS = ["work", "education", "languages"] as const;

export function About() {
  const { t } = useI18n();
  return (
    <Section id="about" title={t.about.title}>
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_13rem] md:gap-12">
        <div className="flex max-w-[38rem] flex-col gap-5 text-[1.125rem] leading-[1.7]">
          {t.about.paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
        <figure className="order-first w-40 md:order-none md:w-auto">
          <img
            src="/portrait.webp"
            alt={t.a11y.photo}
            width={480}
            height={600}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full rounded-[var(--radius)] bg-sunk object-cover grayscale-[0.15]"
          />
        </figure>
      </div>

      <dl className="mt-12 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
        {FACTS.map((key) => {
          const [label, value] = t.about.facts[key];
          return (
            <div key={key}>
              <dt className="meta">{label}</dt>
              <dd className="mt-1 font-medium">{value}</dd>
            </div>
          );
        })}
      </dl>

      <h3 className="h3 mt-16">{t.about.stackTitle}</h3>
      <dl className="mt-6 divide-y divide-line border-y border-line">
        {STACK.map((group) => (
          <div key={group.id} className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="meta pt-1">{t.about.groups[group.id]}</dt>
            <dd className="flex flex-wrap gap-2" dir="ltr" style={{ justifyContent: "flex-start" }}>
              {group.items.map((item) => (
                <span key={item} className="chip text-text">
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
