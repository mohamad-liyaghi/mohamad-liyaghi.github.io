import { useTranslation } from "react-i18next";
import { SKILLS } from "../data/site";
import { Chip, Reveal, SectionHeader } from "./ui";

// my two strongest lanes get a subtle highlight.
const FEATURED = new Set(["backend", "ai"]);

export function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="wrap">
        <SectionHeader
          index={t("skills.index")}
          label={t("skills.label")}
          title={t("skills.title")}
          intro={t("skills.intro")}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((cat, i) => {
            const featured = FEATURED.has(cat.key);
            return (
              <Reveal key={cat.key} delay={(i % 3) * 0.05}>
                <div
                  className={`card group relative h-full overflow-hidden p-5 transition duration-300 hover:-translate-y-0.5 hover:border-accent/40 ${
                    featured ? "ring-1 ring-accent/25" : ""
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-px transition-opacity ${
                      featured
                        ? "bg-accent/40"
                        : "bg-accent/0 group-hover:bg-accent/30"
                    }`}
                  />
                  <div className="mb-3.5 flex items-center justify-between gap-2">
                    <p className="kbd keep-mono text-faint" dir="ltr">
                      // {t(`skills.cats.${cat.key}`)}
                    </p>
                    <span className="keep-mono text-[10px] tabular-nums text-faint">
                      {String(cat.items.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5" dir="ltr">
                    {cat.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
