import { useTranslation } from "react-i18next";
import { PROFILE, PROJECTS } from "../data/site";
import { Icon } from "./Icons";
import { ArrowLink, Chip, Reveal, SectionHeader } from "./ui";

export function Projects() {
  const { t } = useTranslation();

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="py-20 sm:py-28"
    >
      <div className="wrap">
        <SectionHeader
          index={t("projects.index")}
          label={t("projects.label")}
          title={t("projects.title")}
          intro={t("projects.intro")}
          titleId="projects-title"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.06}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex h-full flex-col p-5 transition duration-300 hover:-translate-y-0.5 hover:border-accent/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="kbd keep-mono text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-semibold" dir="ltr">
                      {p.name}
                    </h3>
                  </div>
                  <span className="flex items-center gap-2">
                    <span
                      className={`kbd keep-mono ${
                        p.kind === "work" ? "text-accent2" : "text-faint"
                      }`}
                    >
                      {p.kind === "work" ? t("projects.work") : "OSS"}
                    </span>
                    <Icon
                      name="arrow-up-right"
                      size={16}
                      className="text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent rtl:group-hover:-translate-x-0.5"
                    />
                  </span>
                </div>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-dim">
                  {t(`projects.items.${p.id}`)}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5" dir="ltr">
                  {p.tech.map((tech) => (
                    <Chip key={tech}>{tech}</Chip>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-7">
          <ArrowLink href={PROFILE.github} label={t("projects.more")} />
        </div>
      </div>
    </section>
  );
}
