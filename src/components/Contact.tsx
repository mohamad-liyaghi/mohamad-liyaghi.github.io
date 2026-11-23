import { PROFILE, SOCIALS } from "../data/profile";
import { useI18n } from "../i18n";
import { copyEmail } from "../lib/actions";
import { useSpotlight } from "../lib/hooks";
import { ArrowOut, Copy, GitHub, LinkedIn, Mail, Medium, Telegram } from "./Icons";
import { Out, Section } from "./primitives";

const MARK = { github: GitHub, linkedin: LinkedIn, medium: Medium, telegram: Telegram } as const;

export function Contact() {
  const { t } = useI18n();
  const spot = useSpotlight<HTMLDivElement>();
  return (
    <Section id="contact" title={t.contact.title} lede={t.contact.lede}>
      <div ref={spot}>
        <div className="spot">
          <div className="spot-in flex flex-col gap-6 p-6 sm:p-8">
            <p
              className="text-[clamp(1.3rem,4.6vw,2.6rem)] leading-tight font-semibold tracking-tight break-all text-text [font-stretch:112%] sm:break-normal"
              dir="ltr"
              style={{ textAlign: "start" }}
            >
              {PROFILE.email}
            </p>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn btn-primary" onClick={() => copyEmail(t.toast)}>
                <Copy />
                {t.contact.copy}
              </button>
              <a href={`mailto:${PROFILE.email}`} className="btn btn-ghost">
                <Mail />
                {t.contact.write}
              </a>
            </div>
          </div>
        </div>
      </div>

      <h3 className="meta mt-12 text-[0.95rem]">{t.contact.elsewhere}</h3>
      <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
        {SOCIALS.map((s) => {
          const Icon = MARK[s.id];
          return (
            <li key={s.id} className="border-b border-line">
              <Out href={s.href} className="group flex items-center gap-3 py-4">
                <Icon className="text-muted transition-colors group-hover:text-accent" />
                <span className="font-medium">{t.contact.socials[s.id]}</span>
                <span className="meta ms-auto" dir="ltr">
                  {s.handle}
                </span>
                <ArrowOut
                  width={16}
                  height={16}
                  className="text-faint transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent rtl:-scale-x-100"
                />
              </Out>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
