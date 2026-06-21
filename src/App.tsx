import { useEffect } from "react";
import {
  Navigate,
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
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { ScrollProgress } from "./components/controls";
import { Skills } from "./components/Skills";
import { Writing } from "./components/Writing";

function initialLang(): Lang {
  try {
    const s = localStorage.getItem("lang") ?? undefined;
    if (isLang(s)) return s;
  } catch {
    /* ignore */
  }
  return (navigator.language || "en").slice(0, 2) === "fa" ? "fa" : "en";
}

function Home() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) window.setTimeout(() => el.scrollIntoView(), 60);
    // run once on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="bg-grid" aria-hidden="true" />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function LangHome() {
  const { lang } = useParams();
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

  return <Home />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${initialLang()}`} replace />} />
      <Route path="/:lang" element={<LangHome />} />
      <Route path="*" element={<Navigate to={`/${initialLang()}`} replace />} />
    </Routes>
  );
}
