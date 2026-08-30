import type { ComponentType, SVGProps } from "react";
import { PROFILE, SECTIONS, SOCIALS, type SocialId } from "../data/profile";
import { useI18n } from "../i18n";
import { ArrowOut, GitHub, LinkedIn, Mail, Medium, Telegram } from "./Icons";
import { Out, Reveal, Section, SectionHead } from "./primitives";

const N = SECTIONS.find((s) => s.id === "contact")!.n;

const MARKS: Record<SocialId, ComponentType<SVGProps<SVGSVGElement>>> = {
  email: Mail,
  github: GitHub,
  linkedin: LinkedIn,
  medium: Medium,
  telegram: Telegram,
};

export function Contact() {
  const { t } = useI18n();
  const elsewhere = SOCIALS.filter((s) => s.id !== "email");

  return (
    <Section id="contact">
      <SectionHead id="contact" n={N} title={t.contact.title} lede={t.contact.lede} />

      <Reveal>
        <a
          href={`mailto:${PROFILE.email}`}
          className="ul inline-block font-display text-[clamp(1.5rem,5.5vw,3rem)] leading-tight text-ink transition-colors duration-300 hover:text-accent"
          dir="ltr"
        >
          {PROFILE.email}
        </a>
      </Reveal>

      <div className="mt-16">
        <Reveal>
          <p className="label">{t.contact.elsewhere}</p>
        </Reveal>

        <ul className="mt-5 grid border-t border-hairline sm:grid-cols-2">
          {elsewhere.map((s, i) => {
            const Mark = MARKS[s.id];
            return (
              <li key={s.id} className="border-b border-hairline">
                <Reveal delay={i * 60}>
                  <Out
                    href={s.href}
                    className="group flex items-center gap-4 py-4 pe-2 transition-colors duration-300 hover:text-accent"
                  >
                    <Mark className="shrink-0 text-muted transition-colors duration-300 group-hover:text-accent" />
                    <span className="w-20 shrink-0 text-[0.95rem] font-medium text-ink transition-colors duration-300 group-hover:text-accent">
                      {t.contact.socials[s.id]}
                    </span>
                    <span className="flex-1 truncate font-mono text-[0.8rem] text-muted" dir="ltr">
                      {s.handle}
                    </span>
                    <ArrowOut
                      width={14}
                      height={14}
                      className="shrink-0 text-rule transition-colors duration-300 group-hover:text-accent"
                    />
                  </Out>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
