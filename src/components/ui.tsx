import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Icon } from "./Icons";

/* Scroll-reveal wrapper that respects reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* 02 // WORK ───────── + title + optional intro */
export function SectionHeader({
  index,
  label,
  title,
  intro,
}: {
  index: string;
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3">
        <span className="kbd text-accent keep-mono">{index}</span>
        <span className="kbd text-faint keep-mono">// {label}</span>
        <span className="rule flex-1" />
      </div>
      <h2 className="mt-4 text-[1.7rem] xs:text-3xl md:text-[2.4rem] font-semibold leading-[1.1] tracking-tight">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 max-w-2xl text-dim leading-relaxed">{intro}</p>
      ) : null}
    </div>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="chip keep-mono">{children}</span>;
}

export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? "ulink inline-flex items-center gap-1"}
    >
      {children}
    </a>
  );
}

export function ArrowLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 text-sm text-dim transition-colors hover:text-text keep-mono"
    >
      {label}
      <Icon
        name="arrow-up-right"
        size={15}
        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5"
      />
    </a>
  );
}
