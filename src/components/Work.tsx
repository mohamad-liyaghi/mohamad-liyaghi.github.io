import { ROLES, SECTIONS } from "../data/profile";
import { useI18n } from "../i18n";
import { ArrowOut } from "./Icons";
import { Out, Reveal, Section, SectionHead } from "./primitives";

const N = SECTIONS.find((s) => s.id === "work")!.n;

export function Work() {
  const { t, monthYear } = useI18n();

  return (
    <Section id="work">
      <SectionHead id="work" n={N} title={t.work.title} lede={t.work.lede} />

      <div className="flex flex-col gap-14 sm:gap-20">
        {ROLES.map((role, i) => {
          const copy = t.work.roles[role.id];
          const period = `${monthYear(role.from)} — ${role.to ? monthYear(role.to) : t.work.present}`;
          return (
            <Reveal key={role.id} delay={i * 90}>
              <article className="grid gap-5 sm:grid-cols-[10rem_1fr] sm:gap-10">
                <div className="sm:pt-1.5">
                  <p className="label whitespace-nowrap">{period}</p>
                  {role.to === null ? (
                    <p className="label mt-2 text-accent">{copy.where}</p>
                  ) : (
                    <p className="label mt-2">{copy.where}</p>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl sm:text-[1.75rem]">{copy.role}</h3>
                  <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.95rem] text-muted">
                    {role.href ? (
                      <Out
                        href={role.href}
                        className="ul inline-flex items-center gap-1 font-medium text-accent"
                      >
                        {role.org}
                        <ArrowOut width={13} height={13} />
                      </Out>
                    ) : (
                      <span className="font-medium text-ink">{role.org}</span>
                    )}
                    <span aria-hidden>·</span>
                    <span>{copy.what}</span>
                  </p>

                  <ul className="mt-6 flex flex-col gap-3.5">
                    {copy.bullets.map((line) => (
                      <li key={line} className="grid grid-cols-[1rem_1fr] gap-2 text-[0.95rem]">
                        <span aria-hidden className="pt-[0.6em] text-accent-bright">
                          <span className="block h-px w-2.5 bg-current" />
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5">
                    {role.tech.map((tech) => (
                      <li key={tech} className="font-mono text-xs text-muted">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
