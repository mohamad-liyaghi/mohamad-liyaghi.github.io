import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BUILD, PROFILE } from "../data/site";
import { scrollToId } from "../lib/hooks";
import { Icon } from "./Icons";

/* systemd-style boot log — technical, identical in both languages */
const BOOT = [
  "Reached target Basic System.",
  "Started Network Manager.",
  "Mounted /home/mohamad.",
  "Started PostgreSQL and Redis.",
  "Started Async Workers (Celery · RabbitMQ).",
  "Started Backend API (Django · FastAPI).",
  "Started AI Runtime (agents · RAG · guardrails).",
  "Reached target Multi-User System.",
];

export function Hero() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const focus = t("hero.focus", { returnObjects: true }) as string[];
  const nameAlt = t("hero.nameAlt");
  const nameParts = t("hero.name").trim().split(/\s+/);
  const surname = nameParts.length > 1 ? nameParts.pop() : "";
  const given = nameParts.join(" ");

  // boot timeline (slower, so it reads like a real boot)
  const STEP = 0.16;
  const tBootEnd = 0.5 + BOOT.length * STEP;
  const tLogin = tBootEnd + 0.15;
  const tWhoami = tLogin + 0.65;
  const tName = tWhoami + 0.4;
  const tRole = tName + 0.55;
  const tStatus = tRole + 0.5;
  const tFocus = tStatus + 0.5;
  const tEnd = tFocus + 0.5;

  const at = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 3 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: reduce ? 0 : delay, duration: 0.28 },
  });

  const Prompt = () => (
    <>
      <span className="t-orange">mohamad@liyaghi</span>
      <span className="t-faint">:</span>
      <span className="t-blue">~</span>
      <span className="t-faint">$</span>{" "}
    </>
  );

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-4rem)] items-center pt-24 pb-14"
    >
      <div className="wrap w-full">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="term scanlines mx-auto w-full max-w-3xl rounded-xl p-5 keep-mono text-[12.5px] leading-[1.85] sm:p-9 sm:text-sm"
          dir="ltr"
        >
          {/* console banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[0.7rem] t-faint">
            <span>Ubuntu 24.04.1 LTS — tty1</span>
            <span className="hidden xs:inline">login: mohamad</span>
          </div>

          {/* boot log */}
          <div className="mt-4 space-y-px">
            {BOOT.map((l, i) => (
              <motion.p key={i} {...at(0.5 + i * STEP)} className="t-dim">
                <span className="t-faint">[</span>
                <span className="t-ok">&nbsp;&nbsp;OK&nbsp;&nbsp;</span>
                <span className="t-faint">]</span> {l}
              </motion.p>
            ))}
          </div>

          {/* login */}
          <motion.div {...at(tLogin)} className="mt-3">
            <p className="t-dim">
              mohamad-liyaghi login: <span className="t-text">mohamad</span>
            </p>
            <p className="t-faint">Last login: Sat Jun 21 12:04 on tty1</p>
          </motion.div>

          {/* whoami → name */}
          <motion.p {...at(tWhoami)} className="mt-5">
            <Prompt />
            whoami
          </motion.p>
          <motion.h1 {...at(tName)} className="name-xl mt-1.5" dir="auto">
            {given}{" "}
            {surname ? <span className="t-orange">{surname}</span> : null}
            {nameAlt ? (
              <span className="ms-3 align-middle text-base font-normal t-faint">
                {nameAlt}
              </span>
            ) : null}
          </motion.h1>

          {/* role */}
          <motion.div {...at(tRole)} className="mt-5">
            <p>
              <Prompt />
              cat role.txt
            </p>
            <p className="t-text">
              {t("hero.role")} <span className="t-faint">—</span>{" "}
              <a
                href={PROFILE.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="t-orange underline-offset-4 hover:underline"
              >
                zebracat.ai
              </a>
            </p>
            <p className="t-dim">{t("hero.tagline")}</p>
          </motion.div>

          {/* status */}
          <motion.div {...at(tStatus)} className="mt-5">
            <p>
              <Prompt />
              ./status --now
            </p>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 t-dim">
              <span className="inline-flex items-center gap-2">
                <span className="live-dot" /> {t("hero.status")}
              </span>
              <span className="t-faint">· {t("hero.exp")}</span>
              <span className="t-faint">· build {BUILD.sha}</span>
            </p>
          </motion.div>

          {/* focus as `ls` */}
          <motion.div {...at(tFocus)} className="mt-5">
            <p>
              <Prompt />
              ls focus/
            </p>
            <p className="flex flex-wrap gap-x-6 gap-y-1 t-blue">
              {focus.map((f) => (
                <span key={f}>{f.replace(/\s+/g, "-")}/</span>
              ))}
            </p>
          </motion.div>

          {/* live prompt */}
          <motion.p {...at(tEnd)} className="mt-5">
            <Prompt />
            <span className="term-caret" aria-hidden="true" />
          </motion.p>
        </motion.div>

        {/* actions */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : tEnd + 0.2, duration: 0.4 }}
          className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center gap-3"
          dir="ltr"
        >
          <a href={PROFILE.resumePdf} download className="btn btn-primary">
            <Icon name="download" size={15} /> résumé.pdf
          </a>
          <button onClick={() => scrollToId("contact")} className="btn btn-ghost">
            <Icon name="terminal" size={15} /> contact
          </button>
          <button
            onClick={() => scrollToId("about")}
            className="btn btn-ghost ms-auto"
            aria-label={t("hero.scroll")}
          >
            {t("hero.scroll")} <Icon name="arrow-down" size={15} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
