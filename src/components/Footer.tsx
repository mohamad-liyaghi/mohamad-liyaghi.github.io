import { BUILD, PROFILE } from "../data/profile";
import { useI18n } from "../i18n";
import { ArrowUp } from "./Icons";
import { Container, Out } from "./primitives";

export function Footer() {
  const { t, fmt } = useI18n();

  return (
    <footer className="border-t border-hairline py-10">
      <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1">
          <p className="text-[0.85rem] text-ink">{fmt(t.footer.rights, { year: BUILD.year })}</p>
          <p className="label">{t.footer.built}</p>
        </div>

        <div className="flex items-center gap-5">
          <Out href={PROFILE.repo} className="ul text-[0.85rem] text-muted hover:text-ink">
            {t.footer.source}
          </Out>
          <span className="font-mono text-[0.7rem] text-rule" aria-hidden>
            {BUILD.sha}
          </span>
          <a href="#top" aria-label={t.a11y.top} className="icon-btn">
            <ArrowUp />
          </a>
        </div>
      </Container>
    </footer>
  );
}
