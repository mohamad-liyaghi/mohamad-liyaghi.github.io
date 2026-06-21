import { useTranslation } from "react-i18next";
import { Reveal, SectionHeader } from "./ui";

const FACT_KEYS = ["based", "role", "company", "focus", "langs"] as const;

export function About() {
  const { t } = useTranslation();
  const paras = t("about.p", { returnObjects: true }) as string[];

  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="wrap">
        <SectionHeader
          index={t("about.index")}
          label={t("about.label")}
          title={t("about.title")}
        />

        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:gap-12">
          <Reveal className="space-y-5">
            <p className="keep-mono text-xs text-accent2" dir="ltr">
              $ {t("about.cmd")}
            </p>
            {paras.map((p, i) => (
              <p key={i} className="text-[1.02rem] leading-relaxed text-dim">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card overflow-hidden">
              <div className="flex items-center gap-2 border-b border-line bg-bg-elev/50 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ms-2 keep-mono text-xs text-faint" dir="ltr">
                  whoami.json
                </span>
              </div>
              <div className="p-5">
                <div className="mb-5 flex items-center gap-4">
                  <img
                    src="/me.jpg"
                    alt={t("hero.name")}
                    loading="lazy"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-lg object-cover ring-1 ring-line"
                  />
                  <div>
                    <p className="font-semibold">{t("hero.name")}</p>
                    <p className="keep-mono text-xs text-faint" dir="ltr">
                      {t("hero.nameAlt")}
                    </p>
                  </div>
                </div>
                <dl className="space-y-2.5 keep-mono text-xs">
                  {FACT_KEYS.map((k) => (
                    <div key={k} className="flex gap-3">
                      <dt className="w-20 shrink-0 text-faint">
                        {t(`about.factLabels.${k}`)}
                      </dt>
                      <dd className="text-dim" dir="auto">
                        {t(`about.facts.${k}`)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
