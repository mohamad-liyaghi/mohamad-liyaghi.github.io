import { useEffect, useMemo, useRef, useState } from "react";
import { PROFILE, SECTIONS } from "../data/profile";
import { useI18n } from "../i18n";
import { useTheme } from "../lib/hooks";
import { Search } from "./Icons";

type Item = {
  id: string;
  group: "page" | "action" | "go";
  label: string;
  run: () => void;
};

export function openPalette() {
  window.dispatchEvent(new Event("palette:open"));
}

export function CommandPalette() {
  const { t, toggleLang } = useI18n();
  const [, toggleTheme] = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(() => {
    const page: Item[] = SECTIONS.map(({ id }) => ({
      id: `page-${id}`,
      group: "page",
      label: t.nav[id],
      run: () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
    }));
    const action: Item[] = [
      { id: "theme", group: "action", label: t.palette.theme, run: toggleTheme },
      { id: "lang", group: "action", label: t.palette.lang, run: toggleLang },
      {
        id: "resume",
        group: "action",
        label: t.palette.resume,
        run: () => window.open("/cv.html", "_blank", "noopener"),
      },
      {
        id: "email",
        group: "action",
        label: t.palette.email,
        run: () => {
          window.location.href = `mailto:${PROFILE.email}`;
        },
      },
    ];
    const go: Item[] = [
      {
        id: "github",
        group: "go",
        label: t.contact.socials.github,
        run: () => window.open(PROFILE.github, "_blank", "noopener"),
      },
      {
        id: "linkedin",
        group: "go",
        label: t.contact.socials.linkedin,
        run: () => window.open(PROFILE.linkedin, "_blank", "noopener"),
      },
      {
        id: "medium",
        group: "go",
        label: t.contact.socials.medium,
        run: () => window.open(PROFILE.medium, "_blank", "noopener"),
      },
    ];
    return [...page, ...action, ...go];
  }, [t, toggleLang, toggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => item.label.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("palette:open", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("palette:open", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setIndex(0);
      return;
    }
    const t = window.setTimeout(() => input.current?.focus(), 20);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    setIndex(0);
  }, [query]);

  if (!open) return null;

  const groupLabel = { page: t.palette.page, action: t.palette.action, go: t.palette.go };

  const run = (item: Item) => {
    setOpen(false);
    item.run();
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center bg-ink/40 px-4 pt-[12vh] backdrop-blur-[2px]"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.a11y.palette}
        className="w-full max-w-lg border border-rule bg-surface shadow-[0_24px_80px_-32px_rgb(0_0_0/0.55)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-hairline px-4">
          <Search className="shrink-0 text-muted" />
          <input
            ref={input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setIndex((i) => Math.min(filtered.length - 1, i + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setIndex((i) => Math.max(0, i - 1));
              } else if (e.key === "Enter" && filtered[index]) {
                e.preventDefault();
                run(filtered[index]);
              }
            }}
            placeholder={t.palette.placeholder}
            className="w-full bg-transparent py-3.5 text-[0.95rem] text-ink outline-none placeholder:text-muted"
            aria-autocomplete="list"
          />
        </div>
        <ul className="max-h-80 overflow-auto py-2" role="listbox">
          {filtered.length === 0 ? (
            <li className="px-4 py-6 text-sm text-muted">{t.palette.empty}</li>
          ) : (
            filtered.map((item, i) => {
              const showGroup = i === 0 || filtered[i - 1]?.group !== item.group;
              return (
                <li key={item.id}>
                  {showGroup ? (
                    <p className="label px-4 pt-2 pb-1">{groupLabel[item.group]}</p>
                  ) : null}
                  <button
                    type="button"
                    role="option"
                    aria-selected={i === index}
                    onMouseEnter={() => setIndex(i)}
                    onClick={() => run(item)}
                    className={`flex w-full items-center px-4 py-2 text-start text-sm ${
                      i === index ? "bg-accent-wash text-ink" : "text-body"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
