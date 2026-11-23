import { useId, useState } from "react";
import { ARTICLES, PROFILE, coverSrcSet, type Article } from "../data/profile";
import { useI18n } from "../i18n";
import { useSpotlight } from "../lib/hooks";
import { ArrowOut, Medium } from "./Icons";
import { Out, Section } from "./primitives";

const INITIAL = 6;
/** Rendered widths, so the browser can pick the 400px cover when it's enough. */
const LEAD_SIZES = "(min-width: 1280px) 26rem, (min-width: 1024px) 44rem, 100vw";
const CARD_SIZES = "(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw";

function Meta({ post }: { post: Article }) {
  const { t, date, fmt, num } = useI18n();
  return (
    <p className="meta">
      <time dateTime={post.date}>{date(post.date)}</time>
      <span className="mx-2 text-line-strong" aria-hidden="true">
        /
      </span>
      {fmt(t.writing.read, { minutes: num(post.minutes) })}
    </p>
  );
}

/** Titles and subtitles stay English in both languages, marked as such. */
function En({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span lang="en" dir="ltr" className={className}>
      {children}
    </span>
  );
}

function Lead({ post }: { post: Article }) {
  return (
    <Out href={post.href} className="spot group block">
      <article className="spot-in grid overflow-hidden xl:grid-cols-[1.3fr_1fr]">
        {post.image ? (
          <div className="relative aspect-[800/467] overflow-hidden bg-sunk xl:m-3 xl:self-center xl:rounded-[var(--radius-sm)]">
            <img
              src={post.image}
              srcSet={coverSrcSet(post)}
              sizes={LEAD_SIZES}
              alt=""
              width={800}
              height={467}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
            />
          </div>
        ) : null}
        <div className="flex flex-col p-6 sm:p-8 xl:ps-5">
          <Meta post={post} />
          <h3 className="h3 mt-3 text-[1.45rem] sm:text-[1.65rem]">
            <En>{post.title}</En>
          </h3>
          <p className="mt-3 text-muted">
            <En>{post.dek}</En>
          </p>
          <ArrowOut className="mt-auto self-end pt-6 text-faint transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent rtl:-scale-x-100" width={34} height={34} />
        </div>
      </article>
    </Out>
  );
}

function Card({ post }: { post: Article }) {
  return (
    <Out href={post.href} className="spot group block h-full">
      <article className="spot-in flex flex-col overflow-hidden">
        {post.image ? (
          <div className="aspect-[800/467] overflow-hidden bg-sunk">
            <img
              src={post.image}
              srcSet={coverSrcSet(post)}
              sizes={CARD_SIZES}
              alt=""
              width={800}
              height={467}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
            />
          </div>
        ) : null}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <Meta post={post} />
          <h3 className="h3 mt-2 text-[1.1rem]">
            <En>{post.title}</En>
          </h3>
          <p className="mt-2 line-clamp-3 text-[0.95rem] text-muted">
            <En>{post.dek}</En>
          </p>
        </div>
      </article>
    </Out>
  );
}

function Row({ post }: { post: Article }) {
  return (
    <li>
      <Out
        href={post.href}
        className="group -mx-3 grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 rounded-[var(--radius-sm)] px-3 py-4 transition-colors duration-200 hover:bg-raised sm:grid-cols-[9.5rem_1fr_auto]"
      >
        <span className="meta order-2 col-span-2 sm:order-none sm:col-span-1">
          <time dateTime={post.date}>
            <RowDate iso={post.date} />
          </time>
        </span>
        <span className="font-medium text-text">
          <En>{post.title}</En>
        </span>
        <ArrowOut
          width={18}
          height={18}
          className="text-faint transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent rtl:-scale-x-100"
        />
      </Out>
    </li>
  );
}

function RowDate({ iso }: { iso: string }) {
  const { date } = useI18n();
  return <>{date(iso)}</>;
}

export function Writing() {
  const { t, fmt, num } = useI18n();
  const [all, setAll] = useState(false);
  const spot = useSpotlight<HTMLDivElement>();
  const listId = useId();
  const [lead, second, third, ...rest] = ARTICLES;
  const visibleRest = all ? rest : rest.slice(0, Math.max(0, INITIAL - 3));
  const hidden = rest.length - visibleRest.length;

  return (
    <Section
      id="writing"
      title={t.writing.title}
      lede={t.writing.lede}
      aside={
        <Out href={PROFILE.medium} className="link inline-flex items-center gap-2 text-[0.95rem] font-medium">
          <Medium width={16} height={16} />
          {t.writing.all}
        </Out>
      }
    >
      <div ref={spot} className="flex flex-col gap-4">
        {lead ? <Lead post={lead} /> : null}
        <div className="grid gap-4 sm:grid-cols-2">
          {second ? <Card post={second} /> : null}
          {third ? <Card post={third} /> : null}
        </div>
      </div>
      {rest.length ? (
        <>
          <ul id={listId} className="mt-8 divide-y divide-line border-y border-line">
            {visibleRest.map((post) => (
              <Row key={post.href} post={post} />
            ))}
          </ul>
          {rest.length > INITIAL - 3 ? (
            <button
              type="button"
              aria-expanded={all}
              aria-controls={listId}
              onClick={() => setAll((v) => !v)}
              className="btn btn-ghost mt-6"
            >
              {all ? t.writing.less : fmt(t.writing.more, { count: num(hidden) })}
            </button>
          ) : null}
        </>
      ) : null}
    </Section>
  );
}
