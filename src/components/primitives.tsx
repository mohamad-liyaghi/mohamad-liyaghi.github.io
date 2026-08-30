import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "../lib/hooks";
import { useI18n } from "../i18n";

const delayStyle = (delay: number): CSSProperties =>
  delay ? ({ "--delay": `${delay}ms` } as CSSProperties) : {};

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-6 sm:px-8 lg:px-10 ${className}`}>{children}</div>
  );
}

/** Fades and lifts into place once, the first time it is seen. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={delayStyle(delay)}>
      {children}
    </div>
  );
}

/** A hairline that draws itself from the reading edge. */
export function Rule({ delay = 0, className = "" }: { delay?: number; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref} className={`rule ${className}`} style={delayStyle(delay)} aria-hidden />;
}

export function SectionHead({
  n,
  title,
  lede,
  id,
}: {
  n: string;
  title: string;
  lede?: string;
  id: string;
}) {
  const { num, lang } = useI18n();
  return (
    <header className="mb-12 sm:mb-16">
      <Rule />
      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:gap-8">
        <Reveal delay={80}>
          <span className="label text-accent">{num(Number(n)).padStart(2, lang === "fa" ? "\u06F0" : "0")}</span>
        </Reveal>
        <div className="flex-1">
          <Reveal delay={140}>
            <h2 id={`${id}-title`} className="text-[2rem] sm:text-[2.6rem]">
              {title}
            </h2>
          </Reveal>
          {lede ? (
            <Reveal delay={220}>
              <p className="mt-3 max-w-2xl text-[0.95rem] text-muted sm:text-base">{lede}</p>
            </Reveal>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-20 sm:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** External link with the target/rel pair and a screen-reader note. */
export function Out({
  href,
  children,
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { t } = useI18n();
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
      {external ? <span className="sr-only"> ({t.a11y.external})</span> : null}
    </a>
  );
}
