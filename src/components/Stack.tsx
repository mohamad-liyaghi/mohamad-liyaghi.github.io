import { SECTIONS, STACK } from "../data/profile";
import { useI18n } from "../i18n";
import { Reveal, Section, SectionHead } from "./primitives";

const N = SECTIONS.find((s) => s.id === "stack")!.n;

export function Stack() {
  const { t } = useI18n();

  return (
    <Section id="stack">
      <SectionHead id="stack" n={N} title={t.stack.title} lede={t.stack.lede} />

      <dl className="grid gap-px border-t border-hairline">
        {STACK.map((group, i) => (
          <Reveal key={group.id} delay={i * 55}>
            <div className="grid gap-2 border-b border-hairline py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <dt className="label pt-1">{t.stack.groups[group.id]}</dt>
              <dd>
                <ul className="flex flex-wrap gap-x-2 gap-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border border-hairline bg-surface px-2.5 py-1 font-mono text-[0.78rem] text-body transition-colors duration-300 hover:border-accent hover:text-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
