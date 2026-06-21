// Language-neutral structured data. Prose lives in src/i18n/*.

export const PROFILE = {
  name: "Mohamad Liyaghi",
  email: "liaghimohamad69@gmail.com",
  resumePdf: "/mohamad-liyaghi.pdf",
  resumeView: "/cv.html",
  company: "Zebracat",
  companyUrl: "https://www.zebracat.ai",
  github: "https://github.com/mohamad-liyaghi",
  githubUser: "mohamad-liyaghi",
  linkedin: "https://www.linkedin.com/in/mohamad-liyaghi/",
  medium: "https://medium.com/@el_mohamad",
  telegram: "https://t.me/El_mohamad",
  repo: "https://github.com/mohamad-liyaghi/mohamad-liyaghi.github.io",
};

export type SocialId = "github" | "linkedin" | "medium" | "telegram" | "email";

export const SOCIALS: { id: SocialId; label: string; handle: string; href: string }[] = [
  { id: "github", label: "GitHub", handle: "mohamad-liyaghi", href: PROFILE.github },
  { id: "linkedin", label: "LinkedIn", handle: "mohamad-liyaghi", href: PROFILE.linkedin },
  { id: "medium", label: "Medium", handle: "@el_mohamad", href: PROFILE.medium },
  { id: "telegram", label: "Telegram", handle: "@El_mohamad", href: PROFILE.telegram },
  { id: "email", label: "Email", handle: PROFILE.email, href: `mailto:${PROFILE.email}` },
];

export const SECTIONS = [
  { id: "about", n: "01", key: "about" },
  { id: "experience", n: "02", key: "work" },
  { id: "projects", n: "03", key: "projects" },
  { id: "skills", n: "04", key: "stack" },
  { id: "writing", n: "05", key: "writing" },
  { id: "contact", n: "06", key: "contact" },
] as const;

export type ExperienceRole = { id: string; current: boolean };

export type ExperienceItem = {
  id: string;
  company: string;
  url: string;
  location: string;
  period: string;
  current: boolean;
  roles?: ExperienceRole[];
  tech: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "zebracat",
    company: "ZebracatAi",
    url: PROFILE.companyUrl,
    location: "Remote · Berlin",
    period: "Sep 2024",
    current: true,
    // one company, two connected chapters: started on the backend, then promoted.
    roles: [
      { id: "lead", current: true },
      { id: "backend", current: false },
    ],
    tech: ["Python", "FastAPI", "Django", "RabbitMQ", "Redis", "Kubernetes", "AWS"],
  },
  {
    id: "freelance",
    company: "Freelance",
    url: "",
    location: "Remote",
    period: "Jun 2021 — Sep 2024",
    current: false,
    tech: ["Django", "FastAPI", "React", "PostgreSQL", "Docker"],
  },
];

export type ProjectKind = "work" | "oss";

export const PROJECTS: {
  id: string;
  name: string;
  kind: ProjectKind;
  href: string;
  linkLabel: string;
  tech: string[];
}[] = [
  {
    id: "zebracat",
    name: "ZebracatAi",
    kind: "work",
    href: PROFILE.companyUrl,
    linkLabel: "zebracat.ai",
    tech: ["Python", "FastAPI", "RabbitMQ", "Redis", "Vector search", "Remotion", "Kubernetes", "AWS"],
  },
  {
    id: "foodanywhere",
    name: "FoodAnywhere",
    kind: "oss",
    href: "https://github.com/mohamad-liyaghi/FoodAnywhere",
    linkLabel: "GitHub",
    tech: ["Django", "PostGIS", "Redis", "Celery", "Prometheus", "Grafana", "Loki", "Kubernetes"],
  },
  {
    id: "fastquora",
    name: "FastQuora",
    kind: "oss",
    href: "https://github.com/mohamad-liyaghi/FastQuora",
    linkLabel: "GitHub",
    tech: ["FastAPI", "PostgreSQL", "Elasticsearch", "Redis", "Docker", "Pytest"],
  },
  {
    id: "fastcommerce",
    name: "fast-commerce",
    kind: "oss",
    href: "https://github.com/mohamad-liyaghi/fast-commerce",
    linkLabel: "GitHub",
    tech: ["FastAPI", "PostgreSQL", "Redis", "Pytest", "Kubernetes"],
  },
  {
    id: "academymaster",
    name: "AcademyMaster",
    kind: "oss",
    href: "https://github.com/mohamad-liyaghi/AcademyMaster",
    linkLabel: "GitHub",
    tech: ["Django", "DRF", "Celery", "PostgreSQL", "Docker"],
  },
  {
    id: "anonmarket",
    name: "AnonMarket",
    kind: "oss",
    href: "https://github.com/mohamad-liyaghi/django-anonmarket",
    linkLabel: "GitHub",
    tech: ["Django", "Channels", "PostgreSQL", "Redis", "WebSockets"],
  },
];

// Ordered for emphasis: backend + ai lead, frontend sits lower (I'm backend-heavy).
export const SKILLS: { key: string; items: string[] }[] = [
  { key: "languages", items: ["Python", "TypeScript", "JavaScript", "Go"] },
  { key: "backend", items: ["Django", "DRF", "FastAPI", "Celery", "Express", "Go Fiber"] },
  { key: "ai", items: ["Image agents", "RAG pipelines", "LLM agents", "Cost engineering", "Vector search", "LangChain"] },
  { key: "data", items: ["PostgreSQL", "PostGIS", "MongoDB", "Redis", "MySQL", "Qdrant", "Milvus"] },
  { key: "messaging", items: ["RabbitMQ", "Socket.IO", "WebSockets", "asyncio", "Microservices"] },
  { key: "infra", items: ["Docker", "Kubernetes", "GitHub Actions", "Nginx", "AWS", "Gunicorn / Uvicorn"] },
  { key: "frontend", items: ["React", "Next.js", "Vite", "Tailwind", "Framer Motion", "Remotion"] },
  { key: "observability", items: ["Sentry", "OpenTelemetry", "Prometheus", "Grafana", "Loki", "Elastic APM"] },
];

export type Article = {
  n: string;
  title: string;
  href: string;
  date: string;
  tag: string;
  min: number;
  summary: string;
};

export const ARTICLES: Article[] = [
  {
    n: "01",
    title: "Stop Treating LLM Calls as Free: How Real Cost Engineering for Agents Actually Works",
    href:
      "https://medium.com/@el_mohamad/stop-treating-llm-calls-as-free-how-real-cost-engineering-for-agents-actually-works-e04c25fa2e0a",
    date: "Jun 2026",
    tag: "agents · cost",
    min: 11,
    summary:
      "Token budgets, caching, routing and model tiering — the engineering that keeps agentic systems affordable without dumbing them down.",
  },
  {
    n: "02",
    title: "Stop Trusting the Embedding: How Real RAG Pipelines Actually Work",
    href:
      "https://medium.com/@el_mohamad/stop-trusting-the-embedding-how-real-rag-pipelines-actually-work-6d1dd7a9143f",
    date: "May 2026",
    tag: "rag",
    min: 10,
    summary:
      "Chunking, hybrid retrieval, re-ranking and evaluation — why a vector search isn't a RAG pipeline, and how to build one that holds up.",
  },
  {
    n: "03",
    title: "Stop Trusting the Model: How Real LLM Guardrails Actually Work",
    href:
      "https://medium.com/@el_mohamad/stop-trusting-the-model-how-real-llm-guardrails-actually-work-16e3dd52c6cb",
    date: "May 2026",
    tag: "reliability",
    min: 9,
    summary:
      "Validation, structured outputs and failure handling that make LLM features safe to put in front of real users.",
  },
  {
    n: "04",
    title: "Stop Putting Everything in One Prompt: How Real Research Agents Actually Work",
    href:
      "https://medium.com/@el_mohamad/stop-putting-everything-in-one-prompt-how-real-research-agents-actually-work-50e981631cef",
    date: "Apr 2026",
    tag: "agents",
    min: 12,
    summary:
      "Decomposition, tool use and multi-step orchestration — how research agents actually plan, search and synthesize instead of one giant prompt.",
  },
];

/* /uses — the toolbox, grouped. Tool names are language-neutral. */
export const USES: { key: string; items: string[] }[] = [
  { key: "editor", items: ["Neovim", "VS Code", "Cursor", "tmux", "zsh + starship", "Linux"] },
  { key: "languages", items: ["Python", "TypeScript", "Go", "SQL", "Bash"] },
  { key: "backend", items: ["Django / DRF", "FastAPI", "Go Fiber", "Celery", "RabbitMQ", "PostgreSQL", "Redis"] },
  { key: "ai", items: ["Image agents", "RAG pipelines", "LangChain", "Qdrant", "Cost engineering"] },
  { key: "frontend", items: ["React", "Vite", "Tailwind", "Framer Motion", "Remotion"] },
  { key: "infra", items: ["Docker", "Kubernetes", "GitHub Actions", "AWS", "Nginx", "Grafana + Loki"] },
];

export const BUILD = {
  sha: typeof __BUILD_SHA__ !== "undefined" ? __BUILD_SHA__ : "local",
  year: typeof __BUILD_YEAR__ !== "undefined" ? __BUILD_YEAR__ : "2026",
};
