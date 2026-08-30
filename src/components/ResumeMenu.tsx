import { useEffect, useId, useRef, useState } from "react";
import { RESUMES } from "../data/profile";
import { useI18n } from "../i18n";
import { ArrowDown, Chevron, Doc } from "./Icons";

/** Résumé in two languages, each readable in the browser or downloadable. */
export function ResumeMenu() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="btn btn-primary"
      >
        <Doc />
        {t.hero.resume}
        <Chevron
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          width={16}
          height={16}
        />
      </button>

      <div
        id={id}
        hidden={!open}
        className="absolute top-full z-40 mt-2 w-64 border border-rule bg-surface p-1 shadow-[0_18px_44px_-24px_rgb(0_0_0/0.5)] start-0"
      >
        {RESUMES.map((r) => (
          <div key={r.id} className="p-3">
            <p className="label mb-2">{t.resume[r.id]}</p>
            <div className="flex items-center gap-2">
              <a
                href={r.view}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 border border-hairline px-3 py-2 text-center text-sm text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {t.resume.read}
              </a>
              <a
                href={r.pdf}
                download={r.file}
                aria-label={`${t.resume.download} — ${t.resume[r.id]}`}
                className="icon-btn border-hairline"
              >
                <ArrowDown />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
