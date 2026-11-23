/**
 * Language-neutral facts. Every sentence a person reads lives in src/i18n/*.
 *
 * Rule for this file: nothing goes in that a stranger can't check. Star counts
 * are GitHub's own, refreshed by hand with `gh api repos/mohamad-liyaghi/<repo>`.
 * Articles are not here at all: they come from the Medium feed at build time
 * (scripts/medium-feed.ts → src/data/articles.json).
 */
import snapshot from "./articles.json";

export const PROFILE = {
  name: "Mohamad Liyaghi",
  email: "liaghimohamad69@gmail.com",
  site: "https://mohamad-liyaghi.ir",
  company: "Zebracat",
  companyUrl: "https://www.zebracat.ai",
  github: "https://github.com/mohamad-liyaghi",
  linkedin: "https://www.linkedin.com/in/mohamad-liyaghi/",
  medium: "https://medium.com/@el_mohamad",
  telegram: "https://t.me/El_mohamad",
  repo: "https://github.com/mohamad-liyaghi/mohamad-liyaghi.github.io",
} as const;

/** Checked 2026-11-23 against the GitHub API (non-fork repos). */
export const STATS = {
  stars: 230,
  repos: 24,
  years: 5,
} as const;

export type LangId = "en" | "fa";

export const RESUMES: Record<LangId, { pdf: string; view: string }> = {
  en: { pdf: "/Mohamad_Liyaghi_CV.pdf", view: "/cv.html" },
  fa: { pdf: "/Mohamad_Liyaghi_CV_FA.pdf", view: "/cv-fa.html" },
};

export type SocialId = "github" | "linkedin" | "medium" | "telegram";

export const SOCIALS: { id: SocialId; handle: string; href: string }[] = [
  { id: "github", handle: "mohamad-liyaghi", href: PROFILE.github },
  { id: "linkedin", handle: "mohamad-liyaghi", href: PROFILE.linkedin },
  { id: "medium", handle: "@el_mohamad", href: PROFILE.medium },
  { id: "telegram", handle: "@El_mohamad", href: PROFILE.telegram },
];

export type SectionId = "work" | "writing" | "projects" | "about" | "contact";
export const SECTIONS: SectionId[] = ["work", "writing", "projects", "about", "contact"];

export type RoleId = "zebracat" | "freelance";

export const ROLES: {
  id: RoleId;
  org: string;
  href: string | null;
  from: string;
  to: string | null;
  /** Shown only where the stack is mine to describe. */
  tech: string[];
}[] = [
  { id: "zebracat", org: "Zebracat", href: PROFILE.companyUrl, from: "2024-09", to: null, tech: [] },
  {
    id: "freelance",
    org: "Freelance",
    href: null,
    from: "2021-06",
    to: "2024-09",
    tech: ["Django", "DRF", "FastAPI", "React", "PostgreSQL", "Docker"],
  },
];

export type ProjectId = "foodanywhere" | "fastcommerce" | "academymaster" | "tsuna" | "rubika" | "fastquora";
export type ProjectFilter = "all" | "django" | "fastapi" | "go";

export const PROJECTS: {
  id: ProjectId;
  name: string;
  href: string;
  stars: number;
  lang: "Python" | "Go";
  framework: Exclude<ProjectFilter, "all">;
  tech: string[];
}[] = [
  {
    id: "foodanywhere",
    name: "FoodAnywhere",
    href: "https://github.com/mohamad-liyaghi/FoodAnywhere",
    stars: 40,
    lang: "Python",
    framework: "django",
    tech: ["Django", "PostGIS", "Celery", "OpenTelemetry", "Kubernetes"],
  },
  {
    id: "fastcommerce",
    name: "Fast Commerce",
    href: "https://github.com/mohamad-liyaghi/fast-commerce",
    stars: 22,
    lang: "Python",
    framework: "fastapi",
    tech: ["FastAPI", "PostgreSQL", "Celery", "Redis", "Pytest"],
  },
  {
    id: "academymaster",
    name: "AcademyMaster",
    href: "https://github.com/mohamad-liyaghi/AcademyMaster",
    stars: 21,
    lang: "Python",
    framework: "django",
    tech: ["Django", "DRF", "Celery Beat", "PostgreSQL", "Docker"],
  },
  {
    id: "tsuna",
    name: "Tsuna",
    href: "https://github.com/mohamad-liyaghi/Tsuna-Streaming",
    stars: 16,
    lang: "Python",
    framework: "django",
    tech: ["Django", "Celery", "Redis", "PostgreSQL", "Kubernetes"],
  },
  {
    id: "rubika",
    name: "Telegram to Rubika",
    href: "https://github.com/mohamad-liyaghi/telegram-to-rubika-uploader",
    stars: 14,
    lang: "Go",
    framework: "go",
    tech: ["Go", "Chunked transfer", "Resumable uploads"],
  },
  {
    id: "fastquora",
    name: "FastQuora",
    href: "https://github.com/mohamad-liyaghi/FastQuora",
    stars: 11,
    lang: "Python",
    framework: "fastapi",
    tech: ["FastAPI", "Elasticsearch", "Redis", "Jaeger", "Docker"],
  },
];

export const PROJECT_FILTERS: ProjectFilter[] = ["all", "django", "fastapi", "go"];

export type StackGroupId = "languages" | "backend" | "ai" | "data" | "frontend" | "infra";

/** General skills. None of this describes how any employer's product works. */
export const STACK: { id: StackGroupId; items: string[] }[] = [
  { id: "languages", items: ["Python", "Go", "TypeScript", "SQL", "Bash"] },
  { id: "backend", items: ["Django", "DRF", "FastAPI", "Celery", "asyncio", "WebSockets"] },
  { id: "ai", items: ["LLM APIs", "Structured output", "Tool calling", "RAG", "Vector search", "Evals"] },
  { id: "data", items: ["PostgreSQL", "PostGIS", "Redis", "Elasticsearch", "MongoDB"] },
  { id: "frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
  { id: "infra", items: ["Docker", "Kubernetes", "GitHub Actions", "AWS", "OpenTelemetry", "Sentry"] },
];

export type Article = {
  title: string;
  href: string;
  date: string;
  minutes: number;
  dek: string;
  image: string | null;
  tags: string[];
};

export const ARTICLES: Article[] = snapshot.items;
export const ARTICLES_FETCHED_AT: string = snapshot.fetchedAt;

export const BUILD = {
  sha: typeof __BUILD_SHA__ !== "undefined" ? __BUILD_SHA__ : "dev",
  year: typeof __BUILD_YEAR__ !== "undefined" ? __BUILD_YEAR__ : "2026",
  date: typeof __BUILD_DATE__ !== "undefined" ? __BUILD_DATE__ : "2026-11-23",
};
