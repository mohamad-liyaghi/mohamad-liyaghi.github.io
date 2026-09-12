import { useI18n } from "../i18n";
import { Reveal } from "./primitives";

export function Intro() {
  const { t } = useI18n();
  return (
    <section id="top" className="pt-6 pb-4 lg:pt-20">
      <Reveal>
        <p className="hero-statement max-w-xl font-display text-[clamp(1.2rem,2.2vw,1.55rem)] leading-[1.45] text-ink">
          {t.hero.statement}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <p className="mt-5 max-w-xl text-[0.95rem] text-muted">{t.hero.lede}</p>
      </Reveal>
    </section>
  );
}
