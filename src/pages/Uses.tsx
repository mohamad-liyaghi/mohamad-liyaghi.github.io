import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { USES } from "../data/site";
import { Chip, Reveal } from "../components/ui";

export function Uses() {
  const { t, i18n } = useTranslation();
  const lng = i18n.language === "fa" ? "fa" : "en";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="min-h-[70vh] pt-28 pb-20 sm:pt-32">
      <div className="wrap">
        <Reveal>
          <Link
            to={`/${lng}`}
            className="group inline-flex items-center gap-1.5 keep-mono text-sm text-dim transition-colors hover:text-text"
          >
            <span className="transition-transform group-hover:-translate-x-0.5 rtl:rotate-180">
              ←
            </span>
            {t("uses.back")}
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <span className="kbd keep-mono text-accent">~/uses</span>
            <span className="kbd keep-mono text-faint">// {t("uses.label")}</span>
            <span className="rule flex-1" />
          </div>
          <h1 className="mt-4 text-[2rem] font-semibold leading-[1.1] tracking-tight md:text-[2.6rem]">
            {t("uses.title")}
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-dim">
            {t("uses.intro")}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {USES.map((group, i) => (
            <Reveal key={group.key} delay={i * 0.04}>
              <div className="card h-full p-5">
                <div className="mb-3.5 flex items-center gap-2">
                  <span className="keep-mono text-xs text-accent" dir="ltr">
                    $
                  </span>
                  <span className="keep-mono text-xs text-faint" dir="ltr">
                    {t(`uses.cats.${group.key}`)}
                  </span>
                  <span className="rule flex-1" />
                </div>
                <div className="flex flex-wrap gap-2" dir="ltr">
                  {group.items.map((item) => (
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
