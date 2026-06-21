import { useTranslation } from "react-i18next";
import { EXPERIENCE } from "../data/site";
import { Chip, Reveal, SectionHeader } from "./ui";

export function Experience() {
  const { t } = useTranslation();
  const present = t("experience.present");

  return (
    <section id="experience" className="py-20 sm:py-28">
      <div className="wrap">
        <SectionHeader
          index={t("experience.index")}
          label={t("experience.label")}
          title={t("experience.title")}
          intro={t("experience.lead")}
        />

        <ol className="relative space-y-10 border-s border-line ps-7">
          {EXPERIENCE.map((e, i) => {
            const bullets = t(`experience.items.${e.id}.bullets`, {
              returnObjects: true,
            }) as string[];
            const period = e.current ? `${e.period} — ${present}` : e.period;
            const hasRoles = !!e.roles?.length;

            const companyName = e.url ? (
              <a
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ulink text-accent"
              >
                {e.company}
              </a>
            ) : (
              <span className="text-text">{e.company}</span>
            );

            return (
              <li key={e.id} className="relative">
                <span className="absolute -start-[33px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-bg" />
                <Reveal delay={i * 0.05}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3 className="text-lg font-semibold">
                      {hasRoles ? (
                        companyName
                      ) : (
                        <>
                          {t(`experience.items.${e.id}.role`)}
                          <span className="mx-1.5 text-faint">@</span>
                          {companyName}
                        </>
                      )}
                    </h3>
                    <span className="keep-mono text-xs text-faint" dir="ltr">
                      {period}
                    </span>
                  </div>
                  <p className="mt-0.5 keep-mono text-xs text-faint" dir="ltr">
                    {e.location}
                  </p>

                  {/* one company, two connected chapters: promoted from within */}
                  {hasRoles ? (
                    <ol className="mt-4 space-y-3 border-s border-line/70 ps-5">
                      {e.roles!.map((r) => (
                        <li key={r.id} className="relative">
                          <span
                            className={`absolute -start-[23px] top-[0.4rem] h-1.5 w-1.5 rounded-full ring-4 ring-bg ${
                              r.current ? "bg-accent" : "bg-faint"
                            }`}
                          />
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <span className="font-medium">
                              {t(`experience.items.${e.id}.roles.${r.id}.title`)}
                            </span>
                            <span className="chip keep-mono !text-[10px]" dir="ltr">
                              {t(`experience.items.${e.id}.roles.${r.id}.tag`)}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ol>
                  ) : null}

                  <ul className="mt-4 space-y-2">
                    {bullets.map((b, j) => (
                      <li key={j} className="flex gap-2.5 text-dim">
                        <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3.5 flex flex-wrap gap-1.5" dir="ltr">
                    {e.tech.map((tech) => (
                      <Chip key={tech}>{tech}</Chip>
                    ))}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
