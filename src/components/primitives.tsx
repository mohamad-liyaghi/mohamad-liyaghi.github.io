import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useI18n } from "../i18n";

/**
 * A section: title and lede in a sticky left column on wide screens, the
 * content beside it. Stacks on narrow screens.
 */
export function Section({
  id,
  title,
  lede,
  aside,
  children,
}: {
  id: string;
  title: string;
  lede?: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section">
      <div className="wrap section-grid">
        <header className="section-head mb-10 lg:mb-0">
          <h2 id={`${id}-title`} className="h2 outline-none">
            {title}
          </h2>
          {lede ? <p className="lede mt-4">{lede}</p> : null}
          {aside ? <div className="mt-6">{aside}</div> : null}
        </header>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

/** External link: new tab, safe rel, and a screen-reader note saying so. */
export function Out({
  href,
  children,
  ...rest
}: { href: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { t } = useI18n();
  const external = /^https?:/.test(href);
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {children}
      {external ? <span className="sr-only"> ({t.a11y.external})</span> : null}
    </a>
  );
}
