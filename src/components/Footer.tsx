import { ARTICLES_FETCHED_AT, BUILD, PROFILE } from "../data/profile";
import { useI18n } from "../i18n";
import { ArrowUp, Mark } from "./Icons";
import { Out } from "./primitives";

export function Footer() {
  const { t, fmt, date, num } = useI18n();
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-5 py-10 text-[0.875rem] text-muted lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <Mark className="h-6 w-6" />
          <span>{fmt(t.footer.rights, { year: num(Number(BUILD.year)).replace(/٬|,/g, "") })}</span>
        </div>
        <p className="lg:text-center">{fmt(t.footer.synced, { date: date(ARTICLES_FETCHED_AT) })}</p>
        <div className="flex items-center gap-5">
          <Out href={`${PROFILE.repo}/commit/${BUILD.sha}`} className="link whitespace-nowrap" data-build={BUILD.sha}>
            {fmt(t.footer.build, { sha: BUILD.sha })}
          </Out>
          <Out href={PROFILE.repo} className="link">
            {t.footer.source}
          </Out>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="icon-btn border border-line"
            aria-label={t.footer.top}
          >
            <ArrowUp width={16} height={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
