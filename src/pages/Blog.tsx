import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ARTICLES, PROFILE } from "../data/site";
import { Icon } from "../components/Icons";
import { ArrowLink, Reveal } from "../components/ui";
import { useDocumentMeta } from "../lib/meta";

export function Blog() {
  const { t, i18n } = useTranslation();
  const lng = i18n.language === "fa" ? "fa" : "en";

  useDocumentMeta(t("routeMeta.blog"), t("blog.intro"));

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
            {t("blog.back")}
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <span className="kbd keep-mono text-accent">~/blog</span>
            <span className="kbd keep-mono text-faint">// {t("blog.label")}</span>
            <span className="rule flex-1" />
          </div>
          <h1 className="mt-4 text-[2rem] font-semibold leading-[1.1] tracking-tight md:text-[2.6rem]">
            {t("blog.title")}
          </h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-dim">
            {t("blog.intro")}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.n} delay={i * 0.05}>
              <a
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card group block p-5 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="kbd keep-mono pt-1 text-accent">{a.n}</span>
                  <div className="flex-1">
                    <h2
                      className="text-lg font-semibold leading-snug transition-colors group-hover:text-accent"
                      dir="ltr"
                    >
                      {a.title}
                    </h2>
                    <p className="mt-2 leading-relaxed text-dim" dir="ltr">
                      {a.summary}
                    </p>
                    <div
                      className="mt-3 flex flex-wrap items-center gap-2.5 keep-mono text-xs text-faint"
                      dir="ltr"
                    >
                      <span className="text-accent2">{a.tag}</span>
                      <span>·</span>
                      <span>{a.date}</span>
                      <span>·</span>
                      <span>
                        {a.min} {t("blog.min")}
                      </span>
                    </div>
                  </div>
                  <Icon
                    name="arrow-up-right"
                    size={18}
                    className="shrink-0 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent rtl:group-hover:-translate-x-0.5"
                  />
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-9">
          <ArrowLink href={PROFILE.medium} label={t("blog.all")} />
        </div>
      </div>
    </section>
  );
}
