import { useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { ARTICLES, PROFILE, PROJECTS, RESUMES, SECTIONS, SOCIALS, type LangId } from "../data/profile";
import { useI18n } from "../i18n";
import { copyEmail, scrollToSection } from "../lib/actions";
import { toggleTheme, useTheme } from "../lib/theme";
import { ArrowOut, ArrowRight, Copy, Doc, GitHub, LinkedIn, Medium, Moon, Return, Search, Star, Sun, Telegram } from "./Icons";

type Group = "nav" | "writing" | "projects" | "resume" | "actions" | "links";

type Item = {
  id: string;
  group: Group;
  label: string;
  /** Extra words that should match but aren't shown. */
  keywords?: string;
  hint?: string;
  icon: ReactNode;
  external?: boolean;
  /** Text in this label is English even on the Persian page. */
  en?: boolean;
  run: () => void;
};

const GROUP_ORDER: Group[] = ["nav", "actions", "writing", "projects", "resume", "links"];

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[ً-ٟ̀-ͯ]/g, "");

/**
 * Lower is better; null means no match. A substring hit beats a scattered
 * one, an early hit beats a late one, and a hit in the label beats a hit in
 * the keywords.
 */
function score(item: Item, q: string): number | null {
  const label = norm(item.label);
  const idx = label.indexOf(q);
  if (idx === 0) return 0;
  if (idx > 0) return 1 + idx / 100;
  const words = label.split(/\s+/);
  if (q.split(/\s+/).every((w) => words.some((x) => x.startsWith(w)))) return 2;
  const kw = item.keywords ? norm(item.keywords) : "";
  if (kw.includes(q)) return 3;
  let i = 0;
  for (const ch of label) if (ch === q[i]) i++;
  return i === q.length ? 4 : null;
}

const open = (href: string) => window.open(href, "_blank", "noopener,noreferrer");

export function CommandPalette() {
  const { t, lang, setLang, fmt, monthYear } = useI18n();
  const theme = useTheme();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const baseId = useId();

  const items = useMemo<Item[]>(() => {
    const other: LangId = lang === "en" ? "fa" : "en";
    const socialIcon = { github: <GitHub />, linkedin: <LinkedIn />, medium: <Medium />, telegram: <Telegram /> };
    return [
      ...SECTIONS.map<Item>((id) => ({
        id: `nav-${id}`,
        group: "nav",
        label: t.nav[id],
        keywords: id,
        icon: <ArrowRight className="rtl:-scale-x-100" />,
        run: () => scrollToSection(id),
      })),
      {
        id: "copy-email",
        group: "actions",
        label: t.palette.copyEmail,
        keywords: `email mail ${PROFILE.email} contact`,
        hint: PROFILE.email,
        icon: <Copy />,
        run: () => copyEmail(t.toast),
      },
      {
        id: "theme",
        group: "actions",
        label: theme === "dark" ? t.palette.toLight : t.palette.toDark,
        keywords: "theme dark light mode تیره روشن پوسته",
        icon: theme === "dark" ? <Sun /> : <Moon />,
        run: () => toggleTheme(),
      },
      {
        id: "lang",
        group: "actions",
        label: t.palette.lang,
        keywords: "language persian farsi english فارسی انگلیسی زبان",
        icon: <span className="w-[18px] text-center text-[0.75rem] font-bold">{t.a11y.langShort}</span>,
        run: () => setLang(other),
      },
      ...ARTICLES.map<Item>((a) => ({
        id: `post-${a.href}`,
        group: "writing",
        label: a.title,
        keywords: `${a.dek} ${a.tags.join(" ")}`,
        hint: monthYear(a.date),
        icon: <Medium />,
        external: true,
        en: true,
        run: () => open(a.href),
      })),
      ...PROJECTS.map<Item>((p) => ({
        id: `project-${p.id}`,
        group: "projects",
        label: p.name,
        keywords: `${t.projects.items[p.id].kind} ${p.tech.join(" ")} ${p.lang}`,
        hint: t.projects.items[p.id].kind,
        icon: <Star />,
        external: true,
        run: () => open(p.href),
      })),
      ...(Object.keys(RESUMES) as LangId[]).flatMap<Item>((l) => [
        {
          id: `resume-${l}`,
          group: "resume",
          label: fmt(t.palette.resumeRead, { lang: t.resume[l] }),
          keywords: "cv resume résumé رزومه",
          icon: <Doc />,
          external: true,
          run: () => open(RESUMES[l].view),
        },
        {
          id: `resume-${l}-pdf`,
          group: "resume",
          label: fmt(t.palette.resumePdf, { lang: t.resume[l] }),
          keywords: "cv resume résumé pdf download رزومه",
          icon: <Doc />,
          run: () => {
            const a = document.createElement("a");
            a.href = RESUMES[l].pdf;
            a.download = "";
            a.click();
          },
        },
      ]),
      ...SOCIALS.map<Item>((s) => ({
        id: `link-${s.id}`,
        group: "links",
        label: t.contact.socials[s.id],
        keywords: `${s.id} ${s.handle}`,
        hint: s.handle,
        icon: socialIcon[s.id],
        external: true,
        run: () => open(s.href),
      })),
    ];
  }, [t, lang, theme, setLang, fmt, monthYear]);

  const results = useMemo(() => {
    const q = norm(query.trim());
    if (!q) {
      // Without a query, keep it scannable: a few recent essays, not all ten.
      let essays = 0;
      return items.filter((i) => i.group !== "writing" || essays++ < 4);
    }
    return items
      .map((item) => ({ item, s: score(item, q) }))
      .filter((r): r is { item: Item; s: number } => r.s !== null)
      .sort((a, b) => a.s - b.s || GROUP_ORDER.indexOf(a.item.group) - GROUP_ORDER.indexOf(b.item.group))
      .map((r) => r.item);
  }, [items, query]);

  // Group for display, keeping the order results arrived in within each group.
  const grouped = useMemo(() => {
    const order = query.trim()
      ? [...new Set(results.map((r) => r.group))]
      : GROUP_ORDER.filter((g) => results.some((r) => r.group === g));
    return order.map((g) => ({ group: g, items: results.filter((r) => r.group === g) }));
  }, [results, query]);
  const flat = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  const show = useCallback(() => {
    if (dialog.current?.open) return;
    opener.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    dialog.current?.showModal();
    requestAnimationFrame(() => input.current?.focus());
  }, []);

  const hide = useCallback(() => dialog.current?.close(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialog.current?.open) hide();
        else show();
      } else if (e.key === "/" && !dialog.current?.open) {
        const el = document.activeElement;
        if (el && /input|textarea|select/i.test(el.tagName)) return;
        e.preventDefault();
        show();
      }
    };
    window.addEventListener("palette:open", show);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("palette:open", show);
      window.removeEventListener("keydown", onKey);
    };
  }, [show, hide]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = (item: Item) => {
    hide();
    // Let focus return to where it was before the action moves it.
    requestAnimationFrame(() => item.run());
  };

  const optionId = (i: number) => `${baseId}-opt-${i}`;
  let index = -1;

  return (
    <dialog
      ref={dialog}
      aria-label={t.a11y.palette}
      className="fixed inset-0 h-full w-full bg-transparent"
      onClose={() => {
        opener.current?.focus?.({ preventScroll: true });
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) hide();
      }}
    >
      <div
          className="pointer-events-none flex h-full items-start justify-center px-4 pt-[min(14vh,8rem)]"
          onClick={(e) => e.target === e.currentTarget && hide()}
        >
          <div className="pop pointer-events-auto flex max-h-[min(70vh,34rem)] w-full max-w-[36rem] flex-col overflow-hidden rounded-[var(--radius)] border border-line-strong bg-raised shadow-[var(--shadow)]">
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="shrink-0 text-muted" />
              <input
                ref={input}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((i) => (flat.length ? (i + 1) % flat.length : 0));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((i) => (flat.length ? (i - 1 + flat.length) % flat.length : 0));
                  } else if (e.key === "Home") {
                    setActive(0);
                  } else if (e.key === "End") {
                    setActive(Math.max(0, flat.length - 1));
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                    const item = flat[active];
                    if (item) run(item);
                  } else if (e.key === "Tab") {
                    e.preventDefault();
                  }
                }}
                placeholder={t.palette.placeholder}
                className="h-14 w-full bg-transparent text-[1rem] text-text outline-none placeholder:text-faint"
                role="combobox"
                aria-expanded="true"
                aria-controls={`${baseId}-list`}
                aria-activedescendant={flat[active] ? optionId(active) : undefined}
                aria-autocomplete="list"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="kbd shrink-0">esc</kbd>
            </div>

            <div ref={list} id={`${baseId}-list`} role="listbox" aria-label={t.a11y.palette} className="flex-1 overflow-y-auto overscroll-contain p-2">
              {flat.length === 0 ? (
                <p className="px-3 py-8 text-center text-[0.95rem] text-muted">{t.palette.empty}</p>
              ) : (
                grouped.map(({ group, items: groupItems }) => (
                  <div key={group} role="group" aria-labelledby={`${baseId}-g-${group}`} className="mb-1">
                    <div id={`${baseId}-g-${group}`} className="px-3 pt-3 pb-1.5 text-[0.8rem] font-medium text-faint">
                      {t.palette.groups[group]}
                    </div>
                    {groupItems.map((item) => {
                      index++;
                      const i = index;
                      const selected = i === active;
                      return (
                        <div
                          key={item.id}
                          id={optionId(i)}
                          data-index={i}
                          role="option"
                          aria-selected={selected}
                          onPointerMove={() => !selected && setActive(i)}
                          onClick={() => run(item)}
                          className={`flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-[0.95rem] transition-colors duration-100 ${
                            selected ? "bg-sunk text-text" : "text-muted"
                          }`}
                        >
                          <span className={`shrink-0 ${selected ? "text-accent" : "text-faint"}`}>{item.icon}</span>
                          <span className="min-w-0 flex-1 truncate" {...(item.en ? { lang: "en", dir: "ltr", style: { textAlign: "start" } } : {})}>
                            {item.label}
                          </span>
                          {item.hint ? (
                            <span className="hidden shrink-0 text-[0.8rem] text-faint sm:inline" dir="auto">
                              {item.hint}
                            </span>
                          ) : null}
                          {item.external ? <ArrowOut width={14} height={14} className="shrink-0 text-faint rtl:-scale-x-100" /> : null}
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-[0.78rem] text-faint">
              <span className="flex items-center gap-1.5">
                <kbd className="kbd">↑</kbd>
                <kbd className="kbd">↓</kbd>
                {t.palette.navigate}
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="kbd">
                  <Return width={12} height={12} />
                </kbd>
                {t.palette.open}
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="kbd">esc</kbd>
                {t.palette.dismiss}
              </span>
            </div>
          </div>
        </div>
    </dialog>
  );
}
