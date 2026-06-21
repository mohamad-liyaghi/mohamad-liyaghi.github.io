import { useTranslation } from "react-i18next";
import { SKILLS } from "../data/site";
import { Chip, Reveal, SectionHeader } from "./ui";

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

        <div className="grid gap-4 sm:grid-cols-2">
          {SKILLS.map((cat, i) => (
            <Reveal key={cat.key} delay={(i % 2) * 0.05}>
              <div className="card h-full p-5">
                <p className="kbd keep-mono mb-3.5 text-faint" dir="ltr">
                  // {t(`skills.cats.${cat.key}`)}
                </p>
                <div className="flex flex-wrap gap-1.5" dir="ltr">
                  {cat.items.map((item) => (
                    <Chip key={item}>{item}</Chip>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
