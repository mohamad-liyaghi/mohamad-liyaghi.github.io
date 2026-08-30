/**
 * Language-neutral facts. Every string a human reads lives in src/i18n/*.
 *
 * Rule for this file: nothing goes in that a stranger can't verify. Star
 * counts are GitHub's own, refreshed by hand; dates come from the Medium feed.
 */

export const PROFILE = {
  name: "Mohamad Liyaghi",
  email: "liaghimohamad69@gmail.com",
  site: "https://mohamad-liyaghi.ir",
  company: "Zebracat",
  companyUrl: "https://www.zebracat.ai",
  github: "https://github.com/mohamad-liyaghi",
  githubUser: "mohamad-liyaghi",
  linkedin: "https://www.linkedin.com/in/mohamad-liyaghi/",
  medium: "https://medium.com/@el_mohamad",
  telegram: "https://t.me/El_mohamad",
  repo: "https://github.com/mohamad-liyaghi/mohamad-liyaghi.github.io",
} as const;

/** Verified 2026-08-30 against the GitHub API. */
export const STATS = {
  stars: 229,
  repos: 23,
  followers: 73,
  years: 5,
} as const;

export type LangId = "en" | "fa";

export const RESUMES: {
  id: LangId;
  pdf: string;
  view: string;
  file: string;
}[] = [
  { id: "en", pdf: "/Mohamad_Liyaghi_CV.pdf", view: "/cv.html", file: "Mohamad_Liyaghi_CV.pdf" },
  { id: "fa", pdf: "/Mohamad_Liyaghi_CV_FA.pdf", view: "/cv-fa.html", file: "Mohamad_Liyaghi_CV_FA.pdf" },
];

export type SocialId = "email" | "github" | "linkedin" | "medium" | "telegram";

export const SOCIALS: { id: SocialId; handle: string; href: string }[] = [
  { id: "email", handle: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { id: "github", handle: "mohamad-liyaghi", href: PROFILE.github },
  { id: "linkedin", handle: "mohamad-liyaghi", href: PROFILE.linkedin },
  { id: "medium", handle: "@el_mohamad", href: PROFILE.medium },
  { id: "telegram", handle: "@El_mohamad", href: PROFILE.telegram },
];

export type SectionId = "work" | "projects" | "about" | "stack" | "writing" | "contact";

export const SECTIONS: { id: SectionId; n: string }[] = [
  { id: "work", n: "01" },
  { id: "projects", n: "02" },
  { id: "about", n: "03" },
  { id: "stack", n: "04" },
  { id: "writing", n: "05" },
  { id: "contact", n: "06" },
];

export type RoleId = "zebracat" | "freelance";

export const ROLES: {
  id: RoleId;
  org: string;
  href: string;
  from: string;
  to: string | null;
  tech: string[];
}[] = [
  {
    id: "zebracat",
    org: "Zebracat",
    href: PROFILE.companyUrl,
    from: "2024-09",
    to: null,
    tech: ["Python", "FastAPI", "Django", "RabbitMQ", "Redis", "React", "Remotion", "AWS"],
  },
  {
    id: "freelance",
    org: "Freelance",
    href: "",
    from: "2021-06",
    to: "2024-09",
    tech: ["Django", "DRF", "FastAPI", "React", "PostgreSQL", "Docker"],
  },
];

export type ProjectId =
  | "foodanywhere"
  | "fastcommerce"
  | "academymaster"
  | "tsuna"
  | "rubika"
  | "fastquora";

export const PROJECTS: {
  id: ProjectId;
  name: string;
  href: string;
  stars: number;
  lang: string;
  tech: string[];
}[] = [
  {
    id: "foodanywhere",
    name: "FoodAnywhere",
    href: "https://github.com/mohamad-liyaghi/FoodAnywhere",
    stars: 40,
    lang: "Python",
    tech: ["Django", "PostGIS", "Celery", "OpenTelemetry", "Kubernetes"],
  },
  {
    id: "fastcommerce",
    name: "fast-commerce",
    href: "https://github.com/mohamad-liyaghi/fast-commerce",
    stars: 22,
    lang: "Python",
    tech: ["FastAPI", "PostgreSQL", "Celery", "Redis", "Pytest"],
  },
  {
    id: "academymaster",
    name: "AcademyMaster",
    href: "https://github.com/mohamad-liyaghi/AcademyMaster",
    stars: 21,
    lang: "Python",
    tech: ["Django", "DRF", "Celery Beat", "PostgreSQL", "Docker"],
  },
  {
    id: "tsuna",
    name: "Tsuna-Streaming",
    href: "https://github.com/mohamad-liyaghi/Tsuna-Streaming",
    stars: 16,
    lang: "Python",
    tech: ["Django", "Celery", "Redis", "PostgreSQL", "Kubernetes"],
  },
  {
    id: "rubika",
    name: "telegram-to-rubika-uploader",
    href: "https://github.com/mohamad-liyaghi/telegram-to-rubika-uploader",
    stars: 14,
    lang: "Go",
    tech: ["Go", "chunked transfer", "resumable uploads"],
  },
  {
    id: "fastquora",
    name: "FastQuora",
    href: "https://github.com/mohamad-liyaghi/FastQuora",
    stars: 11,
    lang: "Python",
    tech: ["FastAPI", "Elasticsearch", "Redis", "Jaeger", "Docker"],
  },
];

export type StackGroupId =
  | "languages"
  | "backend"
  | "ai"
  | "data"
  | "frontend"
  | "infra"
  | "reliability";

export const STACK: { id: StackGroupId; items: string[] }[] = [
  { id: "languages", items: ["Python", "Go", "TypeScript", "SQL", "Bash"] },
  {
    id: "backend",
    items: ["Django", "DRF", "FastAPI", "Celery", "RabbitMQ", "asyncio", "WebSockets"],
  },
  {
    id: "ai",
    items: ["LLM APIs", "structured output", "tool calling", "RAG", "vector search", "evaluation"],
  },
  { id: "data", items: ["PostgreSQL", "PostGIS", "Redis", "Elasticsearch", "MongoDB"] },
  { id: "frontend", items: ["React", "TypeScript", "Tailwind", "Remotion"] },
  { id: "infra", items: ["Docker", "Kubernetes", "GitHub Actions", "AWS", "Nginx"] },
  { id: "reliability", items: ["OpenTelemetry", "Prometheus", "Grafana", "Sentry", "Pytest"] },
];

/** Newest six from medium.com/feed/@el_mohamad, read 2026-08-30. */
export type Article = { id: string; href: string; date: string; minutes: number; topic: string };

export const ARTICLES: Article[] = [
  {
    id: "featureFactory",
    href: "https://medium.com/@el_mohamad/stop-being-a-feature-factory-the-engineers-other-job-is-reading-the-money-f95653b9c3ff",
    date: "2026-08-30",
    minutes: 15,
    topic: "engineering",
  },
  {
    id: "bottleneck",
    href: "https://medium.com/@el_mohamad/stop-being-the-bottleneck-the-engineers-new-job-in-the-age-of-coding-agents-9fb50db04d74",
    date: "2026-08-09",
    minutes: 5,
    topic: "agents",
  },
  {
    id: "nightShift",
    href: "https://medium.com/@el_mohamad/stop-being-your-products-night-shift-how-an-agent-squad-actually-works-9fb5b2f9718a",
    date: "2026-08-02",
    minutes: 33,
    topic: "agents",
  },
  {
    id: "habits",
    href: "https://medium.com/@el_mohamad/stop-vibing-start-engineering-15-advanced-habits-for-coding-agents-4f65530837b7",
    date: "2026-07-26",
    minutes: 24,
    topic: "practice",
  },
  {
    id: "routing",
    href: "https://medium.com/@el_mohamad/stop-treating-open-source-models-as-a-downgrade-how-model-routing-actually-works-3891150cbc97",
    date: "2026-07-12",
    minutes: 16,
    topic: "models",
  },
  {
    id: "vectors",
    href: "https://medium.com/@el_mohamad/stop-treating-embeddings-as-meaning-how-vector-spaces-actually-work-c7a5240723cb",
    date: "2026-07-04",
    minutes: 16,
    topic: "retrieval",
  },
];

export const BUILD = {
  sha: typeof __BUILD_SHA__ !== "undefined" ? __BUILD_SHA__ : "dev",
  year: typeof __BUILD_YEAR__ !== "undefined" ? __BUILD_YEAR__ : "2026",
};
