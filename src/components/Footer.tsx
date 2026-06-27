import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BUILD, PROFILE, SECTIONS, SOCIALS } from "../data/site";
import { scrollToId } from "../lib/hooks";
import { ExternalLink } from "./ui";

export function Footer() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const lng = i18n.language === "fa" ? "fa" : "en";
  const onHome = location.pathname.replace(/\/+$/, "") === `/${lng}`;

  const go = (id: string) =>
    onHome ? scrollToId(id) : navigate(`/${lng}#${id}`);

  return (
    <footer className="mt-16 border-t border-line">
      <div className="wrap py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="kbd keep-mono mb-3.5 text-faint" dir="auto">
              // {t("footer.index")}
            </p>
            <ul className="space-y-2">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => go(s.id)}
                    className="text-sm text-dim transition-colors hover:text-text"
                  >
                    {t(`nav.${s.key}`)}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  to={`/${lng}/blog`}
                  className="text-sm text-dim transition-colors hover:text-text"
                >
                  {t("nav.blog")}
                </Link>
              </li>
              <li>
                <Link
                  to={`/${lng}/uses`}
                  className="text-sm text-dim transition-colors hover:text-text"
                >
                  {t("nav.uses")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="kbd keep-mono mb-3.5 text-faint" dir="auto">
              // {t("footer.elsewhere")}
            </p>
            <ul className="space-y-2">
              {SOCIALS.map((s) => (
                <li key={s.id}>
                  <ExternalLink href={s.href} className="ulink text-sm">
                    {s.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="kbd keep-mono mb-3.5 text-faint" dir="auto">
              // {t("footer.colophon")}
            </p>
            <p className="text-sm leading-relaxed text-dim">
              {t("footer.colophonText")}
            </p>
            <div className="mt-3">
              <ExternalLink href={PROFILE.repo} className="ulink keep-mono text-xs">
                {t("footer.source")} ↗
              </ExternalLink>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 keep-mono text-xs text-faint">
          <span dir="auto">
            © {BUILD.year} {t("hero.name")} · {t("footer.rights")}
          </span>
          <span dir="auto">
            {t("footer.build")} <span dir="ltr">{BUILD.sha}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
