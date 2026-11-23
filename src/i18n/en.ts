import meta from "./meta.json";

export const en = {
  meta: meta.en,
  nav: {
    work: "Work",
    writing: "Writing",
    projects: "Open source",
    about: "About",
    contact: "Contact",
  },
  a11y: {
    skip: "Skip to content",
    primary: "Sections",
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
    lang: "نسخهٔ فارسی",
    langShort: "فا",
    menu: "Menu",
    close: "Close",
    home: "Mohamad Liyaghi, back to top",
    external: "opens in a new tab",
    photo: "Mohamad Liyaghi",
    palette: "Search and commands",
  },
  hero: {
    name: ["Mohamad", "Liyaghi"],
    role: "Software engineer at",
    companyNote: "AI video generation",
    intro:
      "I build backends and AI features, mostly in Python, and go full-stack when the work needs it. Five years in, I still like the unglamorous parts best: data models that hold up, APIs that say what they do, systems that are easy to run.",
    copyEmail: "Copy email",
    resume: "Résumé",
    latest: "Latest essay",
    isNew: "New",
    paletteHint: "to search the site",
  },
  resume: {
    en: "English",
    fa: "Persian",
    read: "Read online",
    pdf: "PDF",
  },
  work: {
    title: "Work",
    lede: "One company now, three years of freelance before it.",
    sep: ", ",
    present: "Present",
    remote: "Remote",
    roles: {
      zebracat: {
        org: "Zebracat",
        role: "Software Engineer, AI",
        what: "an AI video generation platform.",
        bullets: [
          "Ship product features end to end, from backend services to the web app people use every day.",
          "Turn new AI capabilities into features that survive contact with real users.",
          "Care about the boring half of the job: reliability, clear interfaces, and code the next person can change.",
        ],
      },
      freelance: {
        org: "Freelance",
        role: "Full-stack developer",
        what: "building SaaS and consumer web products for clients.",
        bullets: [
          "Took products from an empty repo to production: data model, API, interface, deploy. Then stayed on for support.",
          "Owned the parts a client can't easily check themselves: authentication, access control, and how their data is stored.",
          "Handed over with monitoring and tests already in place, so the next developer didn't start blind.",
        ],
      },
    },
  },
  writing: {
    title: "Writing",
    lede: "I write on Medium most weeks, lately an AI engineering series on how the pieces actually work: RAG, prompts, evals, model choice.",
    read: "{minutes} min read",
    more: "Show {count} more",
    less: "Show fewer",
    all: "All posts on Medium",
    note: "Posts are in English.",
  },
  projects: {
    title: "Open source",
    lede: "Backends I built in public. {stars} stars across {repos} repositories, and people still fork them.",
    filters: {
      all: "All",
      django: "Django",
      fastapi: "FastAPI",
      go: "Go",
    },
    filterLabel: "Filter projects by framework",
    stars: "{count} stars",
    more: "All repositories on GitHub",
    items: {
      foodanywhere: {
        kind: "Food delivery",
        body: "Find nearby restaurants and follow an order through the kitchen. PostGIS handles the search, Celery the slow work, and traces follow each order end to end.",
      },
      fastcommerce: {
        kind: "E-commerce API",
        body: "An async store API built for throughput, with clean module boundaries, background jobs, and tests that block a bad deploy.",
      },
      academymaster: {
        kind: "Academy management",
        body: "Courses, enrolments and roles for a teaching academy: who can see what, and the scheduled jobs that keep it tidy.",
      },
      tsuna: {
        kind: "Streaming",
        body: "Video and music streaming, with the heavy processing moved off the request path.",
      },
      rubika: {
        kind: "File transfer",
        body: "Moves files up to 2 GB from Telegram to Rubika directly, so people in Iran don't burn VPN bandwidth uploading the same file twice.",
      },
      fastquora: {
        kind: "Q&A",
        body: "Ask and answer, with Elasticsearch on the search path and tracing through the cache.",
      },
    },
  },
  about: {
    title: "About",
    paragraphs: [
      "I'm a software engineer. I started with Django, spent three years freelancing for clients who needed a product built and then kept running, and now work on an AI video product at Zebracat.",
      "Most of what I know came from shipping things and fixing them afterwards. I publish backends in the open and write about building with language models, because writing it down is how I find out what I actually understand.",
    ],
    facts: {
      work: ["Works", "Remotely"],
      education: ["Studied", "B.Sc. Computer Science"],
      languages: ["Speaks", "Persian and English"],
    },
    stackTitle: "Tools I reach for",
    groups: {
      languages: "Languages",
      backend: "Backend",
      ai: "AI",
      data: "Data",
      frontend: "Frontend",
      infra: "Infrastructure",
    },
  },
  contact: {
    title: "Contact",
    lede: "Email is the quickest way to reach me. I read everything and reply to most of it.",
    copy: "Copy",
    write: "Write an email",
    elsewhere: "Elsewhere",
    socials: {
      github: "GitHub",
      linkedin: "LinkedIn",
      medium: "Medium",
      telegram: "Telegram",
    },
  },
  palette: {
    placeholder: "Search sections, essays, projects…",
    empty: "No matches. Try a project name or a word from an essay title.",
    groups: {
      nav: "Go to",
      writing: "Essays",
      projects: "Projects",
      resume: "Résumé",
      actions: "Actions",
      links: "Elsewhere",
    },
    copyEmail: "Copy email address",
    toLight: "Switch to light theme",
    toDark: "Switch to dark theme",
    lang: "Read in Persian",
    resumeRead: "Read the {lang} résumé",
    resumePdf: "Download the {lang} résumé (PDF)",
    navigate: "move",
    open: "open",
    dismiss: "close",
  },
  toast: {
    copied: "Email copied",
    failed: "Couldn't copy. The address is {email}",
  },
  footer: {
    rights: "© {year} Mohamad Liyaghi",
    source: "Source",
    build: "Build {sha}",
    synced: "Essays synced from Medium on {date}",
    top: "Back to top",
  },
};

export type Dict = typeof en;
