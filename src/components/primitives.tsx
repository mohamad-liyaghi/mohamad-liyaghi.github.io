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
    <header className="mb-8 sm:mb-10">
      <Reveal delay={80}>
        <p className="label flex items-center gap-3">
          <span className="text-accent">{num(Number(n)).padStart(2, lang === "fa" ? "\u06F0" : "0")}</span>
          <span className="h-px flex-1 bg-hairline" aria-hidden />
        </p>
      </Reveal>
      <Reveal delay={140}>
        <h2 id={`${id}-title`} className="mt-3 font-display text-[1.75rem] text-ink sm:text-[2rem]">
          {title}
        </h2>
      </Reveal>
      {lede ? (
        <Reveal delay={200}>
          <p className="mt-2 max-w-xl text-[0.95rem] text-muted">{lede}</p>
        </Reveal>
      ) : null}
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
    <section id={id} aria-labelledby={`${id}-title`} className={`py-16 sm:py-20 ${className}`}>
      {children}
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
