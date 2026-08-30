import meta from "./meta.json";

export const en = {
  meta: meta.en,
  nav: {
    work: "Experience",
    projects: "Open source",
    about: "About",
    stack: "Stack",
    writing: "Writing",
    contact: "Contact",
  },
  a11y: {
    skip: "Skip to content",
    theme: "Switch to {mode} mode",
    light: "light",
    dark: "dark",
    lang: "Switch to Persian",
    menu: "Open menu",
    close: "Close menu",
    top: "Back to top",
    external: "opens in a new tab",
  },
  hero: {
    eyebrow: "Backend · AI · Video",
    nameLines: ["Mohamad", "Liyaghi"],
    role: "Software Engineer · AI",
    at: "at",
    statement:
      "I build the systems that turn a prompt into a finished video — the job pipelines underneath, the model steps in between, and the interface on top.",
    lede: "Five years in Python, backend-leaning full-stack. I write about how LLM systems behave once real traffic reaches them.",
    resume: "Résumé",
    email: "Email me",
    scroll: "Scroll",
  },
  resume: {
    label: "Résumé",
    read: "Read online",
    download: "Download PDF",
    en: "English",
    fa: "Persian",
  },
  stats: {
    stars: "GitHub stars",
    repos: "public repos",
    years: "years shipping",
  },
  work: {
    title: "Where I've worked",
    lede: "Two entries, because there have only been two.",
    present: "present",
    roles: {
      zebracat: {
        role: "Software Engineer · AI",
        where: "Remote — Berlin",
        what: "Generative text-to-video platform",
        bullets: [
          "Build the generation pipeline: a render is split into jobs that retry independently across RabbitMQ workers, with state held per job so one failed step doesn't cost the whole video.",
          "Work on the model side of the product — script and scene generation, output validated against a schema before it reaches the pipeline, and retries that keep one bad response from failing a render.",
          "Build programmatic video with Remotion: React components rendered headlessly into frames, so changing a template ships like any other code change.",
          "Work across the stack — Django and FastAPI services behind React and TypeScript surfaces.",
        ],
      },
      freelance: {
        role: "Full-Stack Developer",
        where: "Remote",
        what: "SaaS and consumer web products",
        bullets: [
          "Shipped products end to end for clients: data model, API, frontend, deployment, and the support afterwards.",
          "Standardised on Django/DRF and FastAPI behind React, containerised, with monitoring in place before handover.",
          "Owned the parts a client couldn't audit for themselves — authentication, access control, and how their data was stored.",
        ],
      },
    },
  },
  projects: {
    title: "Open source",
    lede: "All of it public and readable. The star counts are GitHub's, not mine.",
    more: "All {count} repositories",
    stars: "stars",
    items: {
      foodanywhere:
        "Food-delivery backend. PostGIS for geospatial search, Celery for anything slow, and tracing that follows an order from the request to the worker that finishes it.",
      fastcommerce:
        "Async e-commerce backend built for throughput — clean API boundaries, background processing, and a test suite that gates deploys.",
      academymaster:
        "Academy-management API with layered permissions and scheduled background jobs, containerised for deployment.",
      tsuna:
        "Streaming backend for video and music, with the expensive processing pushed onto background workers.",
      rubika:
        "Relays files up to 2 GB directly between two platforms, so nobody burns limited bandwidth re-uploading what they already sent.",
      fastquora:
        "Q&A platform on FastAPI. Elasticsearch for search, Redis for cache, distributed tracing through both.",
    },
  },
  about: {
    title: "About",
    paragraphs: [
      "I'm a software engineer five years into Python, most of that on the backend. The last stretch has been AI video, where the interesting problems turn out to be less about the model and more about everything around it — queues that survive a dead worker, state you can resume, progress a person can actually watch.",
      "I work across the stack rather than at one layer: Django and FastAPI behind React and TypeScript, Remotion when the output is a video instead of a page. The seams between those are where systems usually break, so that's the part I pay attention to.",
      "Outside work I publish open source — mostly backends, plus a self-hosted stack for collaborating over networks you can't rely on. I write on Medium about what LLM systems actually do once real traffic reaches them.",
    ],
    facts: {
      work: { label: "Work", value: "Remote" },
      role: { label: "Role", value: "Software Engineer · AI" },
      company: { label: "Company", value: "Zebracat" },
      languages: { label: "Languages", value: "Persian (native), English (professional)" },
    },
  },
  stack: {
    title: "Stack",
    lede: "Short on purpose. This is the list I'd be glad to be interviewed on.",
    groups: {
      languages: "Languages",
      backend: "Backend",
      ai: "Models",
      data: "Data",
      frontend: "Frontend",
      infra: "Infrastructure",
      reliability: "Reliability",
    },
  },
  writing: {
    title: "Writing",
    lede: "Long-form notes on building with language models, published on Medium.",
    more: "Everything on Medium",
    read: "{minutes} min read",
    items: {
      featureFactory: "Stop Being a Feature Factory: The Engineer's Other Job Is Reading the Money",
      bottleneck: "Stop Being the Bottleneck: The Engineer's New Job in the Age of Coding Agents",
      nightShift: "Stop Being Your Product's Night Shift: How an Agent Squad Actually Works",
      habits: "Stop Vibing, Start Engineering: 15 Advanced Habits for Coding Agents",
      routing: "Stop Treating Open Source Models as a Downgrade: How Model Routing Actually Works",
      vectors: "Stop Treating Embeddings as Meaning: How Vector Spaces Actually Work",
    },
  },
  contact: {
    title: "Get in touch",
    lede: "Email reaches me fastest, and I answer. The rest of these work too.",
    cta: "Say hello",
    elsewhere: "Elsewhere",
    socials: {
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
      medium: "Medium",
      telegram: "Telegram",
    },
  },
  footer: {
    built: "Designed and built from scratch",
    source: "Source",
    rights: "© {year} Mohamad Liyaghi",
  },
};

export type Dict = typeof en;
