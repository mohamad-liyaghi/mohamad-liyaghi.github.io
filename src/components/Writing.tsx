import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ARTICLES, PROFILE } from "../data/site";
import { Icon } from "./Icons";
import { ArrowLink, Reveal, SectionHeader } from "./ui";

export function Writing() {
  const { t, i18n } = useTranslation();
  const lng = i18n.language === "fa" ? "fa" : "en";

  return (
    <section id="writing" className="py-20 sm:py-28">
      <div className="wrap">
        <SectionHeader
          index={t("writing.index")}
          label={t("writing.label")}
          title={t("writing.title")}
          intro={t("writing.intro")}
        />

        <div className="grid gap-3">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.n} delay={i * 0.05}>
              <a
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card group flex items-start gap-4 p-5"
              >
                <span className="kbd keep-mono pt-0.5 text-accent">{a.n}</span>
                <div className="flex-1">
                  <h3
                    className="font-medium leading-snug text-text transition-colors"
                    dir="ltr"
                  >
                    {a.title}
                  </h3>
                  <div
                    className="mt-2 flex items-center gap-2.5 keep-mono text-xs text-faint"
                    dir="ltr"
                  >
                    <span className="text-accent2">{a.tag}</span>
                    <span>·</span>
                    <span>{a.date}</span>
                  </div>
                </div>
                <Icon
                  name="arrow-up-right"
                  size={17}
                  className="shrink-0 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent rtl:group-hover:-translate-x-0.5"
                />
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            to={`/${lng}/blog`}
            className="group inline-flex items-center gap-1.5 keep-mono text-sm text-accent transition-colors hover:text-text"
          >
            {t("writing.open")}
            <span className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180">
              →
            </span>
          </Link>
          <ArrowLink href={PROFILE.medium} label={t("writing.all")} />
        </div>
      </div>
    </section>
  );
}
