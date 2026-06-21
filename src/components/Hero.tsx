import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BUILD, PROFILE } from "../data/site";
import { scrollToId } from "../lib/hooks";
import { Icon } from "./Icons";

export function Hero() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const boot = t("hero.boot", { returnObjects: true }) as string[];
  const focus = t("hero.focus", { returnObjects: true }) as string[];

  const appear = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-4rem)] items-center pt-24 pb-14"
    >
      <div className="wrap w-full">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-line bg-bg-soft/80 shadow-2xl shadow-black/30 backdrop-blur-sm"
        >
          {/* window title bar */}
          <div className="flex items-center gap-2 border-b border-line bg-bg-elev/60 px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ms-2 keep-mono text-xs text-faint" dir="ltr">
              mohamad@liyaghi: ~
            </span>
            <span className="ms-auto keep-mono text-xs text-faint">bash</span>
          </div>

          {/* body */}
          <div className="px-5 py-7 sm:px-9 sm:py-10">
            {/* boot lines */}
            <div className="keep-mono space-y-1 text-[0.72rem] text-faint" dir="ltr">
              {boot.map((line, i) => (
                <motion.p
                  key={i}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 * i, duration: 0.3 }}
                >
                  <span className="text-accent2">▸</span> {line}
                </motion.p>
              ))}
            </div>

            {/* prompt */}
            <motion.div
              {...appear(0.4)}
              className="mt-4 keep-mono text-sm"
              dir="ltr"
            >
              <span className="text-accent2">{t("hero.prompt")}</span>{" "}
              <span className="text-text">{t("hero.cmd")}</span>
            </motion.div>

            {/* name */}
            <motion.h1
              {...appear(0.5)}
              className="mt-4 flex flex-wrap items-end gap-x-3 text-[2.1rem] font-bold leading-none tracking-tight xs:text-5xl sm:text-6xl"
            >
              <span className="shimmer">{t("hero.name")}</span>
              <span className="caret" aria-hidden="true" />
              <span className="keep-mono pb-1 text-xs font-normal text-faint" dir="ltr">
                {t("hero.nameAlt")}
              </span>
            </motion.h1>

            {/* role + company */}
            <motion.p {...appear(0.6)} className="mt-4 text-base sm:text-lg">
              <span className="font-medium text-text">{t("hero.role")}</span>
              <span className="mx-2 text-faint">·</span>
              <a
                href={PROFILE.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ulink keep-mono text-accent"
              >
                zebracat.ai
              </a>
            </motion.p>

            {/* tagline */}
            <motion.p
              {...appear(0.68)}
              className="mt-3 max-w-xl text-pretty text-[0.98rem] leading-relaxed text-dim"
            >
              {t("hero.tagline")}
            </motion.p>

            {/* status line */}
            <motion.div
              {...appear(0.76)}
              className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 keep-mono text-xs text-dim"
              dir="ltr"
            >
              <span className="inline-flex items-center gap-2">
                <span className="live-dot" />
                {t("hero.status")}
              </span>
              <span className="text-faint">◇ {t("hero.exp")}</span>
              <span className="text-faint">◇ build {BUILD.sha}</span>
            </motion.div>

            {/* focus chips */}
            <motion.div {...appear(0.84)} className="mt-5 flex flex-wrap gap-2">
              {focus.map((f) => (
                <span key={f} className="chip">
                  {f}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div {...appear(0.92)} className="mt-7 flex flex-wrap gap-3">
              <a
                href={PROFILE.resumePdf}
                download
                className="btn btn-primary"
                dir="ltr"
              >
                <Icon name="download" size={15} />
                ./resume.pdf
              </a>
              <button
                onClick={() => scrollToId("contact")}
                className="btn btn-ghost"
                dir="ltr"
              >
                <Icon name="terminal" size={15} />
                ./contact
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* scroll hint */}
        <motion.button
          onClick={() => scrollToId("about")}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mx-auto mt-9 flex flex-col items-center gap-1 text-faint transition-colors hover:text-dim"
          aria-label={t("hero.scroll")}
        >
          <span className="kbd keep-mono">{t("hero.scroll")}</span>
          <motion.span
            animate={reduce ? undefined : { y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            <Icon name="arrow-down" size={16} />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
