import { ROLES } from "../data/profile";
import { useI18n } from "../i18n";
import { ArrowOut } from "./Icons";
import { Out, Section } from "./primitives";

/** A real sequence, so it gets a timeline: newest first, a rail that fills as you read. */
export function Work() {
  const { t, monthYear } = useI18n();
  return (
    <Section id="work" title={t.work.title} lede={t.work.lede}>
      <ol className="relative">
        <span aria-hidden="true" className="absolute start-[5px] top-2 bottom-2 w-px bg-line" />
        <span
          aria-hidden="true"
          className="timeline-fill absolute start-[5px] top-2 bottom-2 w-px origin-top bg-accent [transform:scaleY(1)]"
        />
        {ROLES.map((role) => {
          const copy = t.work.roles[role.id];
          const current = role.to === null;
          return (
            <li key={role.id} className="relative ps-10 pb-16 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute start-0 top-[0.45rem] h-[11px] w-[11px] rounded-full border-2 ${
                  current ? "border-accent bg-accent-fill" : "border-line-strong bg-bg"
                }`}
              />
              <p className="meta">
                <time dateTime={role.from}>{monthYear(role.from)}</time>
                {" – "}
                {role.to ? <time dateTime={role.to}>{monthYear(role.to)}</time> : t.work.present}
                <span className="mx-2 text-line-strong" aria-hidden="true">
                  /
                </span>
                {t.work.remote}
              </p>
              <h3 className="h3 mt-2 text-[1.5rem] sm:text-[1.65rem]">{copy.role}</h3>
              <p className="mt-1.5 text-muted">
                {role.href ? (
                  <Out href={role.href} className="link inline-flex items-center gap-1 font-medium text-accent">
                    {copy.org}
                    <ArrowOut width={14} height={14} className="rtl:-scale-x-100" />
                  </Out>
                ) : (
                  <span className="font-medium text-text">{copy.org}</span>
                )}
                {t.work.sep}
                {copy.what}
              </p>
              <ul className="mt-6 flex max-w-[40rem] flex-col gap-3">
                {copy.bullets.map((line) => (
                  <li key={line} className="relative ps-5">
                    <span aria-hidden="true" className="absolute start-0 top-[0.72em] h-[5px] w-[5px] rounded-full bg-faint" />
                    {line}
                  </li>
                ))}
              </ul>
              {role.tech.length ? (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {role.tech.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
