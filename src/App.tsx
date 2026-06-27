import { lazy, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import i18n, { isLang, type Lang } from "./i18n";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { ScrollProgress } from "./components/controls";
import { Skills } from "./components/Skills";
import { Terminal } from "./components/Terminal";
import { Writing } from "./components/Writing";
import { useCanonical, useDocumentMeta } from "./lib/meta";

// Secondary pages are split out of the main bundle.
const Blog = lazy(() => import("./pages/Blog").then((m) => ({ default: m.Blog })));
const Uses = lazy(() => import("./pages/Uses").then((m) => ({ default: m.Uses })));

function initialLang(): Lang {
  try {
    const s = localStorage.getItem("lang") ?? undefined;
    if (isLang(s)) return s;
  } catch {
    /* ignore */
  }
  return (navigator.language || "en").slice(0, 2) === "fa" ? "fa" : "en";
}

/* Shared chrome + per-language side effects for every page under /:lang */
function LangLayout() {
  const { lang } = useParams();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const l: Lang = isLang(lang) ? lang : "en";

  useEffect(() => {
    if (i18n.language !== l) i18n.changeLanguage(l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "fa" ? "rtl" : "ltr";
    try {
      localStorage.setItem("lang", l);
    } catch {
      /* ignore */
    }
  }, [l]);

  useCanonical(pathname);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:border focus:border-line focus:bg-bg-elev focus:px-4 focus:py-2 focus:text-text"
      >
        {t("a11y.skip")}
      </a>
      <div className="bg-grid" aria-hidden="true" />
      <ScrollProgress />
      <Nav />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

function Home() {
  const { t } = useTranslation();
  const { hash } = useLocation();
  useDocumentMeta(t("routeMeta.home"));
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) window.setTimeout(() => el.scrollIntoView(), 80);
    // run once on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Terminal />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Writing />
      <Contact />
    </>
  );
}

function LangIndexRedirect() {
  const { lang } = useParams();
  const l: Lang = isLang(lang) ? lang : "en";
  return <Navigate to={`/${l}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${initialLang()}`} replace />} />
      <Route path="/:lang" element={<LangLayout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
        <Route path="uses" element={<Uses />} />
        <Route path="*" element={<LangIndexRedirect />} />
      </Route>
      <Route path="*" element={<Navigate to={`/${initialLang()}`} replace />} />
    </Routes>
  );
}
