import { motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  ARTICLES,
  BUILD,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  SKILLS,
  SOCIALS,
} from "../data/site";
import { toggleTheme } from "../lib/hooks";
import { Icon } from "./Icons";

/* ------------------------------------------------------------------ *
 *  Boot log — streams for ~5s, then the screen clears to the prompt.
 *  Technical and identical in both languages (a real console is English).
 * ------------------------------------------------------------------ */
type BootLine = { d: number; node: ReactNode };

const K = (ts: string, msg: string, d: number): BootLine => ({
  d,
  node: (
    <p className="t-dim">
      <span className="t-faint">[ {ts}]</span> {msg}
    </p>
  ),
});
const OK = (msg: ReactNode, d: number): BootLine => ({
  d,
  node: (
    <p className="t-dim">
      <span className="t-faint">[</span>
      <span className="t-ok">&nbsp;&nbsp;OK&nbsp;&nbsp;</span>
      <span className="t-faint">]</span> {msg}
    </p>
  ),
});

const BOOT: BootLine[] = [
  K("0.000000", "Linux portfolio 5.0.0-generic (gcc 14.2.0) — booting", 110),
  K("0.041982", "Command line: ro quiet splash focus=ai persist=on", 150),
  K("0.182740", "Detected 5 CPU cores online — one per year", 250),
  OK("Mounted /home/mohamad", 240),
  OK("Started Network Manager", 200),
  OK("Reached target Basic System", 230),
  OK("Started PostgreSQL + Redis", 240),
  OK("Started Message Broker (RabbitMQ · Celery)", 260),
  OK("Started Backend API (Django · FastAPI · Go Fiber)", 300),
  OK("Started Vector Search (Qdrant · embeddings)", 250),
  OK(
    <>
      Started AI Runtime — <span className="t-cyan">image agents</span>
      <span className="t-faint"> · </span>
      <span className="t-magenta">RAG</span>
      <span className="t-faint"> · </span>
      <span className="t-yellow">cost engine</span>
    </>,
    360,
  ),
  OK("Started Video Pipeline (Remotion · headless render)", 300),
  OK("Started Observability (OpenTelemetry · Grafana)", 250),
  OK("Reached target Multi-User System", 230),
  OK("Started OpenSSH daemon on 0.0.0.0:22", 220),
  {
    d: 340,
    node: (
      <p className="t-dim">
        mohamad-portfolio login: <span className="t-text">mohamad</span>{" "}
        <span className="t-faint">(autologin)</span>
      </p>
    ),
  },
];

const BOOT_TOTAL = BOOT.reduce((a, b) => a + b.d, 0) + 650;

/* ------------------------------------------------------------------ *
 *  Prompt + small renderers
 * ------------------------------------------------------------------ */
function Prompt() {
  return (
    <span className="select-none">
      <span className="t-cyan">mohamad</span>
      <span className="t-faint">@</span>
      <span className="t-blue">portfolio</span>
      <span className="t-faint">:</span>
      <span className="t-magenta">~</span>
      <span className="t-faint">$</span>{" "}
    </span>
  );
}

function TLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="t-blue underline decoration-dotted underline-offset-4 hover:text-cyan-300"
    >
      {children}
    </a>
  );
}

/* neofetch — the résumé, at a glance */
const NF_LOGO = `███╗   ███╗██╗
████╗ ████║██║
██╔████╔██║██║
██║╚██╔╝██║██║
██║ ╚═╝ ██║███████╗
╚═╝     ╚═╝╚══════╝`;

const SWATCHES = [
  "var(--term-red)",
  "var(--term-orange)",
  "var(--term-yellow)",
  "var(--term-ok)",
  "var(--term-cyan)",
  "var(--term-blue)",
  "var(--term-magenta)",
  "var(--term-faint)",
];

/* htop/btop — "what's running": backend ranks #1, team-lead #2 */
const PROCS = [
  { pid: 1, cpu: 42.0, mem: 18.3, cmd: "backend-systems --scale --async" },
  { pid: 2, cpu: 27.5, mem: 12.1, cmd: "team-lead --review --ship" },
  { pid: 3, cpu: 19.8, mem: 9.4, cmd: "image-agents --multimodal" },
  { pid: 4, cpu: 14.2, mem: 7.1, cmd: "rag-pipelines --rerank" },
  { pid: 5, cpu: 11.6, mem: 5.5, cmd: "cost-engine --tokens --cache" },
  { pid: 6, cpu: 8.3, mem: 4.2, cmd: "video-pipeline --remotion" },
];

function Bar({ pct, color }: { pct: number; color: string }) {
  const W = 20;
  const f = Math.round((pct / 100) * W);
  return (
    <span className="whitespace-pre">
      <span className="t-faint">[</span>
      <span style={{ color }}>{"|".repeat(f)}</span>
      <span className="t-faint">{"·".repeat(W - f)}</span>
      <span className="t-faint">] </span>
      <span className="t-text">{pct}%</span>
    </span>
  );
}

function Row({ k, children }: { k: string; children: ReactNode }) {
  return (
    <p className="whitespace-pre-wrap break-words">
      <span className="nf-label">{k.padEnd(9, " ")}</span>
      <span className="t-text">{children}</span>
    </p>
  );
}

function Neofetch() {
  return (
    <div className="my-1 grid gap-4 sm:grid-cols-[auto_1fr] sm:gap-7">
      <pre className="nf-logo hidden sm:block" aria-hidden="true">
        {NF_LOGO}
      </pre>
      <div className="leading-[1.7]">
        <p>
          <span className="t-cyan font-semibold">mohamad</span>
          <span className="t-faint">@</span>
          <span className="t-blue font-semibold">portfolio</span>
        </p>
        <p className="t-faint">-----------------------</p>
        <Row k="OS">Software Engineer · AI</Row>
        <Row k="Host">
          <TLink href={PROFILE.companyUrl}>ZebracatAi</TLink>
        </Row>
        <Row k="Kernel">full-stack · backend-heavy</Row>
        <Row k="Uptime">5 years, shipping</Row>
        <Row k="Shell">python · typescript · go</Row>
        <Row k="Stack">Django · FastAPI · React · Go Fiber</Row>
        <Row k="AI">
          <span className="t-cyan">image agents</span>
          <span className="t-faint"> · </span>
          <span className="t-magenta">RAG</span>
          <span className="t-faint"> · </span>
          <span className="t-yellow">cost engineering</span>
        </Row>
        <Row k="Infra">Docker · k8s · AWS · RabbitMQ · Redis</Row>
        <Row k="Writes">
          <TLink href={PROFILE.medium}>medium.com/@el_mohamad</TLink>
        </Row>
        <Row k="Location">Tehran, Iran</Row>
        <Row k="Email">
          <a
            href={`mailto:${PROFILE.email}`}
            className="t-blue underline decoration-dotted underline-offset-4"
          >
            {PROFILE.email}
          </a>
        </Row>
        <div className="mt-2 flex gap-1.5" aria-hidden="true">
          {SWATCHES.map((c) => (
            <span key={c} className="nf-swatch" style={{ background: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Command registry
 * ------------------------------------------------------------------ */
const ORDER = [
  "help",
  "ls",
  "cat",
  "neofetch",
  "about",
  "experience",
  "skills",
  "projects",
  "whoami",
  "writing",
  "blog",
  "resume",
  "contact",
  "socials",
  "uses",
  "htop",
  "theme",
  "lang",
  "clear",
] as const;

type CmdResult = { node?: ReactNode; clear?: boolean; run?: () => void };

export function Terminal() {
  const { t, i18n } = useTranslation();
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const lng = i18n.language === "fa" ? "fa" : "en";

  const [phase, setPhase] = useState<"boot" | "ready">(reduce ? "ready" : "boot");
  const [shown, setShown] = useState(reduce ? BOOT.length : 0);
  const [blocks, setBlocks] = useState<{ id: number; node: ReactNode }[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);

  const idRef = useRef(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = () => ++idRef.current;

  const push = useCallback(
    (node: ReactNode) => setBlocks((b) => [...b, { id: nextId(), node }]),
    [],
  );

  /* ---- output renderers (defined here so they can read t/data) ---- */
  const renderers = useMemo(() => {
    const help = (
      <div className="grid gap-0.5">
        <p className="t-faint">{t("term.helpLead")}:</p>
        {ORDER.map((c) => (
          <p key={c}>
            <span className="t-cyan inline-block w-28">
              {c === "cat" ? "cat <file>" : c}
            </span>
            <span className="t-dim">{t(`term.cmd.${c}`)}</span>
          </p>
        ))}
        <p className="mt-1 t-faint">{t("term.helpFoot")}</p>
      </div>
    );

    const whoami = (
      <div>
        <p className="t-text">
          {PROFILE.name} — <span className="t-blue">Software Engineer · AI</span>
        </p>
        <p className="t-dim">
          @ <TLink href={PROFILE.companyUrl}>ZebracatAi</TLink> · Tehran, Iran ·
          5 years shipping
        </p>
      </div>
    );

    const about = (
      <div className="grid gap-1.5 max-w-2xl">
        <p className="t-dim">{t("hero.tagline")}</p>
        <p className="t-dim">
          AI in the practical sense — <span className="t-cyan">image agents</span>,{" "}
          <span className="t-magenta">RAG pipelines</span>, and the{" "}
          <span className="t-yellow">cost engineering</span> that keeps them fast
          and affordable at scale.
        </p>
        <p className="t-faint">
          → run <span className="t-cyan">skills</span>,{" "}
          <span className="t-cyan">projects</span> or{" "}
          <span className="t-cyan">writing</span> for more.
        </p>
      </div>
    );

    const skills = (
      <div className="grid gap-0.5">
        {SKILLS.map((s) => (
          <p key={s.key} className="whitespace-pre-wrap">
            <span className="t-cyan inline-block w-32 align-top">
              {t(`skills.cats.${s.key}`)}
            </span>
            <span className="t-dim">{s.items.join(" · ")}</span>
          </p>
        ))}
      </div>
    );

    const oss = PROJECTS.filter((p) => p.kind === "oss");
    const projects = (
      <div className="grid gap-1">
        <p className="t-faint">
          open-source side projects — the day job lives in{" "}
          <span className="t-cyan">experience</span>.
        </p>
        {oss.map((p) => (
          <p key={p.id}>
            <span className="t-cyan">{p.name}</span>{" "}
            <span className="t-faint">— </span>
            <TLink href={p.href}>{p.linkLabel.toLowerCase()}</TLink>
            <span className="t-faint"> · {p.tech.slice(0, 3).join(" · ")}</span>
          </p>
        ))}
        <p className="t-faint">→ {t("projects.more")}.</p>
      </div>
    );

    const ls = (
      <p className="flex flex-wrap gap-x-5 gap-y-1">
        <span className="t-text">about.md</span>
        <span className="t-text">experience.md</span>
        <span className="t-text">skills.md</span>
        <span className="t-text">contact.md</span>
        <span className="t-yellow">resume.pdf</span>
        <span className="t-cyan">projects/</span>
        <span className="t-cyan">writing/</span>
        <span className="t-cyan">uses/</span>
      </p>
    );

    const procmon = (
      <div className="grid gap-0.5 overflow-x-auto">
        <p className="flex items-center gap-2">
          <span className="nf-label w-10">CPU</span>
          <Bar pct={78} color="var(--term-ok)" />
        </p>
        <p className="flex items-center gap-2">
          <span className="nf-label w-10">MEM</span>
          <Bar pct={61} color="var(--term-cyan)" />
        </p>
        <p className="t-faint">
          {t("term.procs.uptime")} · {t("term.procs.tasks")} ·{" "}
          {t("term.procs.load")}
        </p>
        <p className="mt-1 t-faint whitespace-nowrap">
          <span className="inline-block w-9 text-end pe-2">PID</span>
          <span className="inline-block w-14 text-end pe-2">CPU%</span>
          <span className="inline-block w-14 text-end pe-3">MEM%</span>
          <span>COMMAND</span>
        </p>
        {PROCS.map((p) => (
          <p key={p.pid} className="whitespace-nowrap">
            <span className="t-faint inline-block w-9 text-end pe-2">
              {p.pid}
            </span>
            <span className="t-ok inline-block w-14 text-end pe-2">
              {p.cpu.toFixed(1)}
            </span>
            <span className="t-cyan inline-block w-14 text-end pe-3">
              {p.mem.toFixed(1)}
            </span>
            <span className="t-text">{p.cmd}</span>
          </p>
        ))}
        <p className="mt-1 t-faint">F10 quit · htop · btop</p>
      </div>
    );

    const experience = (
      <div className="grid gap-3 max-w-2xl">
        {EXPERIENCE.map((e) => {
          const bullets = t(`experience.items.${e.id}.bullets`, {
            returnObjects: true,
          }) as string[];
          const host = e.url
            ? e.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
            : "";
          return (
            <div key={e.id}>
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="t-text font-semibold">{e.company}</span>
                {host ? <TLink href={e.url}>{host}</TLink> : null}
                <span className="t-faint">
                  — {e.period}
                  {e.current ? ` · ${t("experience.present")}` : ""}
                </span>
              </p>
              <p className="t-cyan">→ {t(`experience.items.${e.id}.track`)}</p>
              {bullets.map((b, i) => (
                <p key={i} className="mt-0.5 flex gap-2 t-dim">
                  <span className="t-faint">·</span>
                  <span>{b}</span>
                </p>
              ))}
            </div>
          );
        })}
      </div>
    );

    const writing = (
      <div className="grid gap-1">
        {ARTICLES.map((a) => (
          <p key={a.n}>
            <span className="t-faint">{a.n}</span>{" "}
            <TLink href={a.href}>{a.title}</TLink>{" "}
            <span className="t-faint">· {a.date}</span>
          </p>
        ))}
        <p className="t-faint">
          → run <span className="t-cyan">blog</span> for the full page.
        </p>
      </div>
    );

    const contact = (
      <div className="grid gap-1">
        <p>
          <span className="nf-label">email</span>
          <a
            href={`mailto:${PROFILE.email}`}
            className="t-blue underline decoration-dotted underline-offset-4"
          >
            {PROFILE.email}
          </a>
        </p>
        {SOCIALS.filter((s) => s.id !== "email").map((s) => (
          <p key={s.id}>
            <span className="nf-label">{s.label.toLowerCase()}</span>
            <TLink href={s.href}>{s.handle}</TLink>
          </p>
        ))}
      </div>
    );

    const socials = (
      <div className="grid gap-1">
        {SOCIALS.map((s) => (
          <p key={s.id}>
            <span className="nf-label">{s.label.toLowerCase()}</span>
            <TLink href={s.href}>{s.href.replace("mailto:", "")}</TLink>
          </p>
        ))}
      </div>
    );

    return {
      help,
      whoami,
      about,
      skills,
      projects,
      experience,
      writing,
      contact,
      socials,
      ls,
      procmon,
    };
  }, [t]);

  /* ---- command execution ---- */
  const exec = useCallback(
    (raw: string): CmdResult => {
      const parts = raw.trim().split(/\s+/);
      const cmd = (parts[0] || "").toLowerCase();
      const arg = parts.slice(1).join(" ");
      const open = (href: string, what: string): CmdResult => ({
        node: <p className="t-dim">{t("term.opening", { what })}</p>,
        run: () => window.open(href, "_blank", "noopener"),
      });

      // fork bomb :(){ :|:& };:
      if (/:\s*\(\s*\)\s*\{/.test(raw) || raw.replace(/\s/g, "").includes(":|:&};:"))
        return { node: <p className="t-orange">{t("term.forkbomb")}</p> };

      switch (cmd) {
        case "":
          return {};
        case "help":
        case "?":
        case "menu":
          return { node: renderers.help };
        case "neofetch":
        case "résumé":
        case "summary":
          return { node: <Neofetch /> };
        case "whoami":
        case "id":
          return { node: renderers.whoami };
        case "about":
        case "info":
          return { node: renderers.about };
        case "skills":
        case "stack":
        case "tools":
          return { node: renderers.skills };
        case "projects":
          return { node: renderers.projects };
        case "experience":
        case "exp":
        case "work":
          return { node: renderers.experience };
        case "cv":
          return open(PROFILE.resumePdf, "résumé.pdf");
        case "ls":
        case "dir": {
          const d = arg.replace(/^\.?\//, "").replace(/\/$/, "").toLowerCase();
          if (!d) return { node: renderers.ls };
          if (d === "projects") return { node: renderers.projects };
          if (d === "writing") return { node: renderers.writing };
          if (d === "uses")
            return {
              node: <p className="t-dim">{t("term.opening", { what: "/uses" })}</p>,
              run: () => navigate(`/${lng}/uses`),
            };
          return {
            node: (
              <p className="t-red">
                ls: cannot access '{arg}': No such file or directory
              </p>
            ),
          };
        }
        case "cat": {
          if (!arg) return { node: <p className="t-dim">{t("term.catUsage")}</p> };
          const f = arg.replace(/^\.?\//, "").replace(/\/$/, "").toLowerCase();
          const files: Record<string, ReactNode> = {
            "about.md": renderers.about,
            "experience.md": renderers.experience,
            "skills.md": renderers.skills,
            "contact.md": renderers.contact,
          };
          if (files[f]) return { node: files[f] };
          if (f === "resume.pdf")
            return {
              node: (
                <p className="t-yellow">
                  cat: resume.pdf is binary — run{" "}
                  <span className="t-cyan">resume</span> to open it 📄
                </p>
              ),
            };
          if (["projects", "writing", "uses"].includes(f))
            return { node: <p className="t-red">{t("term.isDir", { file: f })}</p> };
          return { node: <p className="t-red">{t("term.noFile", { file: arg })}</p> };
        }
        case "htop":
        case "btop":
        case "top":
          return { node: renderers.procmon };
        case "rm":
        case "rmdir":
        case "del":
        case "mkfs":
        case "dd":
          return { node: <p className="t-orange">{t("term.dontmess")}</p> };
        case "writing":
        case "articles":
        case "posts":
          return { node: renderers.writing };
        case "contact":
          return { node: renderers.contact };
        case "socials":
        case "social":
        case "links":
          return { node: renderers.socials };
        case "blog":
          return {
            node: <p className="t-dim">{t("term.opening", { what: "blog" })}</p>,
            run: () => navigate(`/${lng}/blog`),
          };
        case "uses":
          return {
            node: <p className="t-dim">{t("term.opening", { what: "/uses" })}</p>,
            run: () => navigate(`/${lng}/uses`),
          };
        case "resume":
          return open(PROFILE.resumePdf, "résumé.pdf");
        case "github":
          return open(PROFILE.github, "github");
        case "linkedin":
          return open(PROFILE.linkedin, "linkedin");
        case "medium":
          return open(PROFILE.medium, "medium");
        case "telegram":
          return open(PROFILE.telegram, "telegram");
        case "email":
        case "mail":
          return open(`mailto:${PROFILE.email}`, "mail");
        case "theme":
          return {
            node: <p className="t-dim">{t("term.themeMsg")}</p>,
            run: () => toggleTheme(),
          };
        case "lang":
        case "fa":
        case "en": {
          const next = cmd === "fa" || cmd === "en" ? cmd : lng === "fa" ? "en" : "fa";
          return {
            node: <p className="t-dim">{t("term.langMsg")}</p>,
            run: () => navigate(`/${next}`),
          };
        }
        case "clear":
        case "cls":
          return { clear: true };
        case "echo":
          return { node: <p className="t-text">{arg}</p> };
        case "pwd":
          return { node: <p className="t-text">/home/mohamad</p> };
        case "date":
          return { node: <p className="t-text">{new Date().toString()}</p> };
        case "sudo":
          return {
            node: (
              <p className="t-red">
                mohamad is not in the sudoers file. This incident will be
                reported. 😏
              </p>
            ),
          };
        case "exit":
        case "logout":
          return {
            node: <p className="t-faint">nice try — you're stuck with me. 🙂</p>,
          };
        default:
          return {
            node: <p className="t-red">{t("term.notFound", { cmd })}</p>,
          };
      }
    },
    [t, renderers, navigate, lng],
  );

  const submit = useCallback(
    (value: string) => {
      const cmd = value.trim();
      // echo the typed command
      push(
        <p>
          <Prompt />
          <span className="t-text">{value}</span>
        </p>,
      );
      if (cmd) {
        setHistory((h) => [...h, cmd]);
        setHIdx(-1);
      }
      const res = exec(value);
      if (res.clear) {
        setBlocks([]);
      } else if (res.node) {
        push(<div className="pb-1">{res.node}</div>);
      }
      res.run?.();
      setInput("");
    },
    [exec, push],
  );

  /* ---- boot streaming ---- */
  const finishBoot = useCallback(() => {
    setPhase("ready");
    setBlocks([
      { id: nextId(), node: <p className="t-dim">{t("term.welcome")}</p> },
      { id: nextId(), node: <Neofetch /> },
      {
        id: nextId(),
        node: (
          <p className="t-faint">
            {t("term.hint")} <span className="t-cyan">help</span> ·{" "}
            <span className="t-cyan">experience</span> ·{" "}
            <span className="t-cyan">ls</span> ·{" "}
            <span className="t-cyan">resume</span>
          </p>
        ),
      },
    ]);
  }, [t]);

  useEffect(() => {
    if (reduce) {
      finishBoot();
      return;
    }
    const timers: number[] = [];
    let acc = 0;
    BOOT.forEach((line, i) => {
      acc += line.d;
      timers.push(window.setTimeout(() => setShown(i + 1), acc));
    });
    timers.push(window.setTimeout(finishBoot, BOOT_TOTAL));
    return () => timers.forEach((x) => clearTimeout(x));
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- keep view pinned to the newest output ---- */
  useLayoutEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [blocks, shown, input, phase]);

  /* ---- focus the prompt the moment it's interactive — no click needed ---- */
  useEffect(() => {
    if (phase !== "ready") return;
    const id = requestAnimationFrame(() =>
      inputRef.current?.focus({ preventScroll: true }),
    );
    return () => cancelAnimationFrame(id);
  }, [phase]);

  const onKey = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const idx = hIdx < 0 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx < 0) return;
      const idx = hIdx + 1;
      if (idx >= history.length) {
        setHIdx(-1);
        setInput("");
      } else {
        setHIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const hit = ORDER.find((c) => c.startsWith(input.trim().toLowerCase()));
      if (hit) setInput(hit);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setBlocks([]);
    }
  };

  const focusInput = () => {
    if (window.getSelection()?.toString()) return; // don't steal text selection
    inputRef.current?.focus();
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100svh-4rem)] items-center pt-24 pb-14"
    >
      <h1 className="sr-only">
        {PROFILE.name} — Software Engineer · AI at Zebracat. Image agents, RAG
        pipelines and cost engineering at scale.
      </h1>

      <div className="wrap w-full">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="term scanlines mx-auto w-full max-w-3xl"
          dir="ltr"
        >
          {/* title bar — unix, not mac (no traffic lights) */}
          <div className="term-bar keep-mono">
            <span className="inline-flex items-center gap-2">
              <Icon name="terminal" size={13} className="t-cyan" />
              <span>{t("term.bar")}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="hidden xs:inline t-faint">{t("term.shell")}</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="live-dot" />
                <span className="t-faint">{t("term.online")}</span>
              </span>
            </span>
          </div>

          <div
            ref={bodyRef}
            onClick={focusInput}
            className="term-body keep-mono text-[12.5px] leading-[1.75] sm:text-[13.5px]"
          >
            {/* boot log (cleared once interactive) */}
            {phase === "boot" && (
              <div className="space-y-px">
                {BOOT.slice(0, shown).map((l, i) => (
                  <div key={i}>{l.node}</div>
                ))}
                <span className="term-caret" aria-hidden="true" />
              </div>
            )}

            {/* interactive history */}
            {phase === "ready" && (
              <div className="space-y-1.5">
                {blocks.map((b) => (
                  <div key={b.id}>{b.node}</div>
                ))}
                {/* live prompt */}
                <p className="flex flex-wrap items-center">
                  <Prompt />
                  <span className="t-text whitespace-pre-wrap break-all">
                    {input}
                  </span>
                  <span className="term-caret" aria-hidden="true" />
                </p>
                <input
                  ref={inputRef}
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                  className="term-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  aria-label="terminal input"
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* quick actions below the console (always reachable, no typing needed) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : (BOOT_TOTAL + 200) / 1000, duration: 0.4 }}
          className="mx-auto mt-5 flex max-w-3xl flex-wrap items-center gap-2.5"
          dir="ltr"
        >
          <a href={PROFILE.resumePdf} download className="btn btn-primary">
            <Icon name="download" size={15} /> résumé.pdf
          </a>
          <button
            onClick={() => {
              if (phase === "ready") submit("experience");
              inputRef.current?.focus();
            }}
            className="btn btn-ghost"
          >
            <Icon name="terminal" size={15} /> experience
          </button>
          <button onClick={() => navigate(`/${lng}/blog`)} className="btn btn-ghost">
            blog
          </button>
          <span className="ms-auto hidden items-center gap-2 keep-mono text-xs text-faint sm:inline-flex">
            <span className="live-dot" /> build {BUILD.sha}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
