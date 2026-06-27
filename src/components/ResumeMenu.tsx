import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RESUMES } from "../data/site";
import { Icon } from "./Icons";

/**
 * Résumé download button with a small language picker beneath it.
 * Click the button → a popover opens with English (first) and فارسی (RTL),
 * each offering a PDF download and a "view in browser" link.
 */
export function ResumeMenu() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  // Close on outside-click and Escape; return focus to the trigger on Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        className="btn btn-primary"
      >
        <Icon name="download" size={15} />
        {t("hero.resume")}
        <Icon
          name="arrow-down"
          size={12}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            dir="ltr"
            initial={reduce ? false : { opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-[calc(100%+0.55rem)] z-50 w-64 max-w-[min(16rem,calc(100vw-2.5rem))] origin-top-left overflow-hidden rounded-xl border border-line bg-bg-elev/95 p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            <p className="px-2.5 pb-1.5 pt-1 keep-mono text-[10px] uppercase tracking-wider text-faint">
              {t("resumeMenu.heading")}
            </p>

            {RESUMES.map((r) => (
              <div key={r.id} className="flex items-center gap-1">
                <a
                  href={r.pdf}
                  download={r.file}
                  onClick={close}
                  className="group flex flex-1 items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-dim transition-colors hover:bg-accent/10 hover:text-text"
                >
                  <span className="keep-mono inline-flex h-6 w-7 shrink-0 items-center justify-center rounded border border-line text-[10px] font-medium uppercase text-faint transition-colors group-hover:border-accent/50 group-hover:text-accent">
                    {r.id}
                  </span>
                  <span className="flex-1">{r.label}</span>
                  <span className="keep-mono text-[10px] text-faint">PDF</span>
                  <Icon
                    name="download"
                    size={14}
                    className="text-faint transition-colors group-hover:text-accent"
                  />
                </a>
                <a
                  href={r.view}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  title={t("resumeMenu.view")}
                  aria-label={`${r.label} — ${t("resumeMenu.view")}`}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-faint transition-colors hover:bg-accent/10 hover:text-accent"
                >
                  <Icon name="arrow-up-right" size={15} />
                </a>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
