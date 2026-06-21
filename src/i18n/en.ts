const en = {
  nav: {
    about: "about",
    work: "work",
    projects: "projects",
    stack: "stack",
    writing: "writing",
    contact: "contact",
    menu: "menu",
    close: "close",
  },
  a11y: {
    theme: "Toggle theme",
    lang: "Switch language",
    top: "Back to top",
    menu: "Open menu",
    github: "GitHub",
    linkedin: "LinkedIn",
    medium: "Medium",
    telegram: "Telegram",
    email: "Email",
  },
  hero: {
    boot: ["booting portfolio…", "modules: backend · ai · frontend · devops [ok]"],
    prompt: "guest@mohamad-liyaghi:~$",
    cmd: "whoami",
    name: "Mohamad Liyaghi",
    nameAlt: "محمد لیاقی",
    role: "Software Engineer · AI",
    tagline: "I build backend systems and AI features that hold up at scale.",
    blurb:
      "Full-stack engineer and AI enthusiast at Zebracat. Five years turning hard requirements into reliable, high-throughput systems — and writing about what actually works.",
    focus: ["distributed backends", "LLM agents", "RAG pipelines", "video at scale"],
    status: "available for interesting problems",
    exp: "5y shipping",
    resume: "resume.pdf",
    contact: "contact",
    scroll: "scroll",
  },
  about: {
    index: "01",
    label: "about",
    cmd: "cat about.md",
    title: "A full-stack engineer who likes hard problems",
    p: [
      "I'm Mohamad — a software engineer at Zebracat (zebracat.ai), where we turn text into video with generative AI. I work across the stack but live mostly in the backend: services that stay fast and predictable when traffic doesn't.",
      "I'm an AI enthusiast in the practical sense — I build and ship LLM features (agents, RAG, guardrails, and the cost engineering that keeps them sane) and I sweat the parts that make them production-grade: queues, caching, observability, and back-pressure under load.",
      "On the frontend I'm at home in React and TypeScript, and I enjoy media-heavy work — programmatic video with tools like Remotion and headless rendering. I'm dedicated, I read a lot, I write about what I learn, and I'm happiest when I'm shipping.",
    ],
    factLabels: {
      based: "based",
      role: "role",
      company: "company",
      focus: "focus",
      langs: "languages",
    },
    facts: {
      based: "Tehran, Iran",
      role: "Software Engineer · AI",
      company: "Zebracat — zebracat.ai",
      focus: "AI systems · distributed backends",
      langs: "Persian (native) · English (C1)",
    },
  },
  experience: {
    index: "02",
    label: "work",
    title: "Experience",
    lead: "Where I've shipped.",
    present: "present",
    teamlead: "Team Lead",
    items: {
      zebracat: {
        role: "Software Engineer · Team Lead",
        bullets: [
          "Lead backend work on an AI text-to-video platform — services that fan out heavy generative jobs and stream progress back to users in real time.",
          "Design async pipelines (queues, workers, back-pressure) that keep latency and cost under control as request volume grows.",
          "Coordinate the team day to day — scope, review and ship — keeping systems stable while the product moves fast.",
        ],
      },
      freelance: {
        role: "Full-Stack Developer",
        bullets: [
          "Delivered end-to-end web products solo — from requirements to production — across SaaS and consumer apps.",
          "Owned both sides: scalable Django / FastAPI backends and responsive React frontends, plus deployment and monitoring.",
          "Integrated third-party services and built for reliability, security and deadlines that didn't move.",
        ],
      },
    },
  },
  projects: {
    index: "03",
    label: "projects",
    title: "Selected work",
    intro: "A mix of production systems and open-source backends. More on GitHub.",
    work: "work",
    source: "source",
    live: "live",
    more: "see everything on GitHub",
    items: {
      zebracat:
        "Generative text-to-video at scale: orchestrated microservices, async job pipelines, vector search and a programmatic video-rendering layer.",
      foodanywhere:
        "Open-source food-delivery backend connecting users with nearby restaurants — geospatial search, cart caching and heavy tasks offloaded to workers, with full metrics and logging.",
      fastquora:
        "A Q&A platform built on FastAPI — Postgres for data, Elasticsearch for search, Redis for caching — containerized and tested end to end.",
      fastcommerce:
        "An async e-commerce backend focused on throughput — clean API design, background task processing and tests you can trust.",
      academymaster:
        "Academy-management API with layered permissions and background jobs — Django + Celery, containerized for scalable deployment.",
      anonmarket:
        "Privacy-focused marketplace with real-time features via Django Channels, Postgres persistence and Redis caching.",
    },
  },
  skills: {
    index: "04",
    label: "stack",
    title: "Toolbox",
    intro: "What I reach for — chosen for reliability and scale, not novelty.",
    cats: {
      languages: "languages",
      backend: "backend",
      frontend: "frontend & media",
      data: "data & search",
      ai: "ai & llm",
      messaging: "async & realtime",
      infra: "devops & cloud",
      observability: "observability",
    },
  },
  writing: {
    index: "05",
    label: "writing",
    title: "Writing",
    intro:
      "I write about the unglamorous reality of shipping AI systems — what breaks, what scales and what actually works in production.",
    read: "read on Medium",
    all: "all posts on Medium",
  },
  contact: {
    index: "06",
    label: "contact",
    title: "Let's build something",
    intro:
      "Open to interesting work and good conversations. The fastest way to reach me is email.",
    copy: "copy",
    copied: "copied!",
    or: "or find me on",
  },
  footer: {
    index: "index",
    elsewhere: "elsewhere",
    colophon: "colophon",
    colophonText:
      "Built with React, TypeScript & Framer Motion. Set in JetBrains Mono & Archivo. Deployed on GitHub Pages.",
    rights: "All rights reserved.",
    source: "view source",
    build: "build",
  },
};

export default en;
export type Dict = typeof en;
