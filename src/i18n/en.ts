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
    primary: "Primary",
    theme: "Switch to {mode} mode",
    light: "light",
    dark: "dark",
    lang: "Switch to Persian",
    menu: "Open menu",
    close: "Close menu",
    top: "Back to top",
    external: "opens in a new tab",
    photo: "Portrait of Mohamad Liyaghi",
  },
  hero: {
    eyebrow: "Backend · AI · Video",
    nameLines: ["Mohamad", "Liyaghi"],
    role: "Software Engineer · AI",
    at: "at",
    statement:
      "A prompt is cheap. Getting a video out of it, every time, is the job. I work on that path at Zebracat: queues that survive a dead worker, model output that has to pass a schema, and Remotion templates that ship like code.",
    lede: "Five years of Python, mostly backend, full-stack when the work needs it. I write about language-model systems once they have real users.",
    resume: "Résumé",
    email: "Email me",
  },
  pipeline: {
    kicker: "How a render happens",
    from: "From a prompt",
    to: "to a finished video",
    steps: [
      { title: "Jobs", body: "Split. Retry. Resume." },
      { title: "Models", body: "Generate, then check." },
      { title: "Frames", body: "React, rendered." },
    ],
  },
  resume: {
    label: "Résumé",
    read: "Read online",
    download: "Download PDF",
    en: "English",
    fa: "Persian",
  },
  stats: {
    years: "years shipping",
    repos: "public repos",
    writing: "essays",
  },
  work: {
    title: "Experience",
    lede: "Zebracat now. Freelance before that.",
    present: "present",
    roles: {
      zebracat: {
        role: "Software Engineer · AI",
        where: "Remote — Berlin",
        what: "Generative text-to-video platform",
        bullets: [],
        steps: [
          {
            title: "Jobs",
            body: "A failed scene no longer kills the render. Each step is a job on RabbitMQ, with its own state and its own retry.",
          },
          {
            title: "Models",
            body: "Scripts and scenes are generated, then checked against a schema. A bad response retries; it does not take the video down.",
          },
          {
            title: "Frames",
            body: "Templates are Remotion — React rendered headlessly into frames. Changing one is a code change.",
          },
        ],
      },
      freelance: {
        role: "Full-Stack Developer",
        where: "Remote",
        what: "SaaS and consumer web products",
        bullets: [
          "Took client products from the data model through the API, the UI, and deploy, then stayed for the support.",
          "Django/DRF or FastAPI behind React, containerised, with monitoring in place before handover.",
          "Owned auth, access control, and how the data was stored — the parts a client could not audit themselves.",
        ],
        steps: [],
      },
    },
  },
  projects: {
    title: "Open source",
    lede: "Public backends, mostly. A few I still get asked about.",
    more: "All {count} repositories",
    stars: "stars",
    kinds: {
      foodanywhere: "Geospatial",
      fastcommerce: "Commerce",
      academymaster: "Permissions",
      tsuna: "Streaming",
      rubika: "Transfer",
      fastquora: "Search",
    },
    items: {
      foodanywhere:
        "Find a nearby restaurant and get the order through the kitchen. PostGIS does the search, Celery the slow work, and a trace follows the order from the request to the worker that finishes it.",
      fastcommerce:
        "An async store API built for throughput. Clean boundaries, background processing, and tests that block a bad deploy.",
      academymaster:
        "An academy's API: who can see what, and jobs that run on a schedule.",
      tsuna:
        "Video and music streaming, with the expensive processing off the request path.",
      rubika:
        "Move files up to 2 GB straight between the two, so you don't burn bandwidth re-uploading something you already sent.",
      fastquora:
        "Ask and answer, with Elasticsearch on the search path and tracing through the cache.",
    },
  },
  about: {
    title: "About",
    paragraphs: [
      "Software engineer. Five years of Python, most of it backend, the last stretch on AI video. The work that matters there is rarely the model. It is the queue that has to survive a dead worker, the state you can resume, the progress a person can trust.",
      "I move across the stack because that is where things break: Django and FastAPI behind React and TypeScript, Remotion when the output is a video. I publish backends in the open, and I write on Medium.",
    ],
    facts: {
      work: { label: "Work", value: "Remote" },
      role: { label: "Role", value: "Software Engineer · AI" },
      company: { label: "Company", value: "Zebracat" },
      education: { label: "Education", value: "B.Sc. Computer Science" },
      languages: { label: "Languages", value: "Persian (native), English (professional)" },
    },
  },
  stack: {
    title: "Stack",
    lede: "What I actually reach for.",
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
    lede: "On agents, models, and the money around shipping them.",
    more: "Everything on Medium",
    read: "{minutes} min read",
    items: {
      featureFactory: {
        title: "Stop Being a Feature Factory: The Engineer's Other Job Is Reading the Money",
        dek: "Shipping features is not the job. Reading the unit economics is.",
      },
      bottleneck: {
        title: "Stop Being the Bottleneck: The Engineer's New Job in the Age of Coding Agents",
        dek: "Coding agents move the scarce work. The engineer has to move with it.",
      },
      nightShift: {
        title: "Stop Being Your Product's Night Shift: How an Agent Squad Actually Works",
        dek: "A working pattern for a squad of agents that ships while you sleep.",
      },
      habits: {
        title: "Stop Vibing, Start Engineering: 15 Advanced Habits for Coding Agents",
        dek: "Fifteen habits that separate prompting an agent from engineering with one.",
      },
      routing: {
        title: "Stop Treating Open Source Models as a Downgrade: How Model Routing Actually Works",
        dek: "Open-source models hold up if you send each request to the right one.",
      },
      vectors: {
        title: "Stop Treating Embeddings as Meaning: How Vector Spaces Actually Work",
        dek: "Embeddings are geometry, not meaning. The geometry is the useful part.",
      },
    },
  },
  contact: {
    title: "Get in touch",
    lede: "Email is fastest. I reply.",
    open: "Open to the right conversation.",
    cta: "Write to me",
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
    built: "English / فارسی",
    source: "Source",
    rights: "© {year} Mohamad Liyaghi",
  },
};

export type Dict = typeof en;
