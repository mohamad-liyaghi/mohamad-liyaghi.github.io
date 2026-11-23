import { useEffect, useRef, useState } from "react";
import type { ToastDetail } from "../lib/actions";
import { Check } from "./Icons";

/** One toast at a time, announced politely, gone after a couple of seconds. */
export function Toaster() {
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const timer = useRef(0);

  useEffect(() => {
    const on = (e: Event) => {
      const { message } = (e as CustomEvent<ToastDetail>).detail;
      window.clearTimeout(timer.current);
      setToast({ id: Date.now(), message });
      timer.current = window.setTimeout(() => setToast(null), 2600);
    };
    window.addEventListener("toast", on);
    return () => {
      window.removeEventListener("toast", on);
      window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <div role="status" aria-live="polite" className="no-print pointer-events-none fixed inset-x-0 bottom-6 z-[95] flex justify-center px-4">
      {toast ? (
        <p
          key={toast.id}
          className="toast flex items-center gap-2.5 rounded-full border border-line-strong bg-raised py-2.5 ps-3 pe-4 text-[0.95rem] font-medium text-text shadow-[var(--shadow)]"
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-accent-fill text-on-accent">
            <Check width={14} height={14} strokeWidth={2.4} />
          </span>
          {toast.message}
        </p>
      ) : null}
    </div>
  );
}
