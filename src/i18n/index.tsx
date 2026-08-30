import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { en, type Dict } from "./en";
import { fa } from "./fa";
import type { LangId } from "../data/profile";

const DICTS: Record<LangId, Dict> = { en, fa };
const LOCALES: Record<LangId, string> = { en: "en-US", fa: "fa-IR" };

/** `/fa` and `/en` are real, shareable URLs; anything else falls back to detection. */
function langFromPath(pathname: string): LangId | null {
  const seg = pathname.replace(/^\/+|\/+$/g, "").split("/")[0];
  return seg === "fa" || seg === "en" ? seg : null;
}

function detectLang(): LangId {
  const fromPath = langFromPath(window.location.pathname);
  if (fromPath) return fromPath;
  try {
    const saved = window.localStorage.getItem("lang");
    if (saved === "fa" || saved === "en") return saved;
  } catch {
    /* private mode — fall through to the browser's preference */
  }
  return navigator.language?.toLowerCase().startsWith("fa") ? "fa" : "en";
}

type I18nValue = {
  lang: LangId;
  dir: "ltr" | "rtl";
  t: Dict;
  setLang: (next: LangId) => void;
  toggleLang: () => void;
  /** Localised digits — Persian readers get Persian numerals. */
  num: (value: number) => string;
  /** Month + year, in the Gregorian or Persian calendar as appropriate. */
  monthYear: (iso: string) => string;
  fmt: (template: string, vars: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangId>(() =>
    typeof window === "undefined" ? "en" : detectLang(),
  );
  const dir = lang === "fa" ? "rtl" : "ltr";

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", dir);
    document.title = DICTS[lang].meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", DICTS[lang].meta.description);
    try {
      window.localStorage.setItem("lang", lang);
    } catch {
      /* nothing to do — the URL still carries the language */
    }
  }, [lang, dir]);

  // Keep the address bar honest, so /fa and /en can be linked and shared.
  useEffect(() => {
    const want = `/${lang}/`;
    if (window.location.pathname !== want) {
      window.history.replaceState({ lang }, "", want + window.location.hash);
    }
  }, [lang]);

  useEffect(() => {
    const onPop = () => {
      const next = langFromPath(window.location.pathname);
      if (next) setLangState(next);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const setLang = useCallback((next: LangId) => {
    setLangState(next);
    window.history.pushState({ lang: next }, "", `/${next}/${window.location.hash}`);
  }, []);

  const value = useMemo<I18nValue>(() => {
    const locale = LOCALES[lang];
    const nf = new Intl.NumberFormat(locale);
    const mf = new Intl.DateTimeFormat(locale, { year: "numeric", month: "short" });
    return {
      lang,
      dir,
      t: DICTS[lang],
      setLang,
      toggleLang: () => setLang(lang === "en" ? "fa" : "en"),
      num: (v) => nf.format(v),
      monthYear: (iso) => mf.format(new Date(`${iso.length === 7 ? `${iso}-01` : iso}T00:00:00`)),
      fmt: (template, vars) =>
        template.replace(/\{(\w+)\}/g, (whole, key: string) =>
          key in vars ? String(vars[key]) : whole,
        ),
    };
  }, [lang, dir, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
