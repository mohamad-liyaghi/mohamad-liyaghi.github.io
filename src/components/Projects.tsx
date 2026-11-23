import { useState } from "react";
import { PROFILE, PROJECT_FILTERS, PROJECTS, STATS, type ProjectFilter } from "../data/profile";
import { useI18n } from "../i18n";
import { useSpotlight } from "../lib/hooks";
import { ArrowOut, GitHub, Star } from "./Icons";
import { Out, Section } from "./primitives";

export function Projects() {
  const { t, fmt, num } = useI18n();
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const spot = useSpotlight<HTMLUListElement>();
  const shown = PROJECTS.filter((p) => filter === "all" || p.framework === filter);
  const count = (f: ProjectFilter) => PROJECTS.filter((p) => f === "all" || p.framework === f).length;

  return (
    <Section
      id="projects"
      title={t.projects.title}
      lede={fmt(t.projects.lede, { stars: num(STATS.stars), repos: num(STATS.repos) })}
      aside={
        <Out href={PROFILE.github} className="link inline-flex items-center gap-2 text-[0.95rem] font-medium">
          <GitHub width={16} height={16} />
          {t.projects.more}
        </Out>
      }
    >
      <div role="group" aria-label={t.projects.filterLabel} className="mb-6 flex flex-wrap gap-2">
        {PROJECT_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`inline-flex h-9 items-center gap-2 rounded-full border px-4 text-[0.9rem] transition-colors duration-200 ${
              filter === f
                ? "border-transparent bg-accent-fill font-medium text-on-accent"
                : "border-line text-muted hover:border-line-strong hover:text-text"
            }`}
          >
            {t.projects.filters[f]}
            <span className={filter === f ? "opacity-70" : "text-faint"}>{num(count(f))}</span>
          </button>
        ))}
      </div>

      <ul ref={spot} className="grid gap-4 sm:grid-cols-2">
        {shown.map((p) => {
          const copy = t.projects.items[p.id];
          return (
            <li key={p.id}>
              <Out href={p.href} className="spot group block h-full">
                <article className="spot-in flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="meta">{copy.kind}</p>
                      <h3 className="h3 mt-1">{p.name}</h3>
                    </div>
                    <ArrowOut
                      width={20}
                      height={20}
                      className="mt-1 shrink-0 text-faint transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent rtl:-scale-x-100"
                    />
                  </div>
                  <p className="mt-3 text-[0.95rem] text-muted">{copy.body}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-6 text-[0.85rem] text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Star width={15} height={15} className="text-accent" />
                      {fmt(t.projects.stars, { count: num(p.stars) })}
                    </span>
                    <span>{p.lang}</span>
                    <span className="text-faint" dir="ltr">
                      {p.tech.slice(0, 3).join(", ")}
                    </span>
                  </div>
                </article>
              </Out>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
