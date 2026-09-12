import { PROFILE, PROJECTS, SECTIONS, STATS } from "../data/profile";
import { useI18n } from "../i18n";
import { ArrowOut, Star } from "./Icons";
import { Out, Reveal, Section, SectionHead } from "./primitives";

const N = SECTIONS.find((s) => s.id === "projects")!.n;

export function Projects() {
  const { t, num, fmt } = useI18n();
  const featured = PROJECTS.find((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <Section id="projects">
      <SectionHead id="projects" n={N} title={t.projects.title} lede={t.projects.lede} />

      <div className="flex flex-col gap-px border border-hairline bg-hairline">
        {featured ? (
          <Reveal>
            <Out
              href={featured.href}
              className="card group block border-0 p-6 sm:p-8"
              aria-label={`${featured.name} — ${num(featured.stars)} ${t.projects.stars}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="label text-accent">{t.projects.kinds[featured.id]}</p>
                  <h3 className="mt-2 font-display text-2xl text-ink transition-colors duration-300 group-hover:text-accent sm:text-[1.85rem]">
                    {featured.name}
                  </h3>
                </div>
                <span className="label flex shrink-0 items-center gap-1.5 tracking-normal">
                  <Star width={13} height={13} className="text-accent-bright" />
                  {num(featured.stars)}
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed">
                {t.projects.items[featured.id]}
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-2.5 gap-y-1">
                {featured.tech.map((tech) => (
                  <li key={tech} className="font-mono text-[0.7rem] text-muted">
                    {tech}
                  </li>
                ))}
              </ul>
            </Out>
          </Reveal>
        ) : null}

        <ul className="grid gap-px bg-hairline sm:grid-cols-2">
          {rest.map((p, i) => (
            <li
              key={p.id}
              className={i === rest.length - 1 && rest.length % 2 === 1 ? "sm:col-span-2" : ""}
            >
              <Reveal delay={(i % 2) * 70 + Math.floor(i / 2) * 60} className="h-full">
                <Out
                  href={p.href}
                  className="card group flex h-full flex-col border-0 p-6 sm:p-7"
                  aria-label={`${p.name} — ${num(p.stars)} ${t.projects.stars}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="label mb-2">{t.projects.kinds[p.id]}</p>
                      <h3 className="font-display text-xl tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
                        {p.name}
                      </h3>
                    </div>
                    <span className="label flex shrink-0 items-center gap-1.5 tracking-normal">
                      <Star width={13} height={13} className="text-accent-bright" />
                      {num(p.stars)}
                    </span>
                  </div>

                  <p className="mt-4 flex-1 text-[0.9rem] leading-relaxed">
                    {t.projects.items[p.id]}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-x-2.5 gap-y-1">
                    {p.tech.map((tech) => (
                      <li key={tech} className="font-mono text-[0.7rem] text-muted">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </Out>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <Reveal delay={120}>
        <Out
          href={PROFILE.github}
          className="ul mt-10 inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-accent"
        >
          {fmt(t.projects.more, { count: num(STATS.repos) })}
          <ArrowOut width={14} height={14} />
        </Out>
      </Reveal>
    </Section>
  );
}
