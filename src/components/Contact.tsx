import { useTranslation } from "react-i18next";
import { PROFILE, SOCIALS } from "../data/site";
import { useCopy } from "../lib/hooks";
import { Icon, type IconName } from "./Icons";
import { Reveal, SectionHeader } from "./ui";

const SOCIAL_ICON: Record<string, IconName> = {
  github: "github",
  linkedin: "linkedin",
  medium: "medium",
  telegram: "telegram",
  email: "mail",
};

export function Contact() {
  const { t } = useTranslation();
  const [copied, copy] = useCopy();
  const socials = SOCIALS.filter((s) => s.id !== "email");

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="wrap">
        <SectionHeader
          index={t("contact.index")}
          label={t("contact.label")}
          title={t("contact.title")}
          intro={t("contact.intro")}
        />

        <Reveal>
          <div className="card p-6 sm:p-8">
            <p className="keep-mono text-xs text-accent2" dir="ltr">
              $ echo $EMAIL
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${PROFILE.email}`}
                className="ulink text-xl font-semibold sm:text-2xl"
                dir="ltr"
              >
                {PROFILE.email}
              </a>
              <button
                onClick={() => copy(PROFILE.email)}
                className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 keep-mono text-xs text-dim transition-colors hover:border-accent/50 hover:text-text"
              >
                <Icon name={copied ? "check" : "copy"} size={14} />
                {copied ? t("contact.copied") : t("contact.copy")}
              </button>
            </div>

            <p className="mt-7 kbd keep-mono text-faint" dir="auto">
              // {t("contact.or")}
            </p>
            <div className="mt-3 grid gap-2 xs:grid-cols-2">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-line p-3 transition-colors hover:border-accent/50 hover:bg-bg-elev/40"
                >
                  <span className="text-dim transition-colors group-hover:text-accent">
                    <Icon name={SOCIAL_ICON[s.id]} size={18} />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-sm">{s.label}</span>
                    <span className="keep-mono text-xs text-faint" dir="ltr">
                      {s.handle}
                    </span>
                  </span>
                  <Icon
                    name="arrow-up-right"
                    size={15}
                    className="ms-auto text-faint transition-colors group-hover:text-accent"
                  />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
