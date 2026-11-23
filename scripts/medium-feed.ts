/**
 * Keeps the Writing section current without anyone touching the repo.
 *
 * On every production build this fetches the Medium RSS feed, parses the posts
 * and rewrites src/data/articles.json. That JSON is committed, so it is also
 * the fallback: if Medium is down, slow, or blocks the CI runner (it sometimes
 * does), the build logs a warning and ships the last good snapshot instead of
 * failing. A scheduled workflow rebuilds the site daily so new posts appear on
 * their own.
 *
 * No XML library: the feed is small and regular, and a dependency for it would
 * outweigh the code.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Plugin } from "vite";

export const FEED_URL = "https://medium.com/feed/@el_mohamad";

export type Article = {
  title: string;
  href: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  minutes: number;
  dek: string;
  /** Cover at 800px wide; a self-hosted /covers/ path once downloaded. */
  image: string | null;
  /** The same cover at 400px, for small slots. */
  thumb: string | null;
  tags: string[];
};

export type ArticleSnapshot = { fetchedAt: string; source: string; items: Article[] };

const WORDS_PER_MINUTE = 230;
const MAX_ITEMS = 10;

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)))
    .trim();

const stripTags = (html: string) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m?.[1] ? decode(m[1]) : "";
};

/** Medium appends ?source=rss-… to every link; the reader doesn't need it. */
export function cleanLink(raw: string): string {
  try {
    const url = new URL(raw);
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return raw.split("?")[0] ?? raw;
  }
}

/** The subtitle Medium shows under a title: a leading italic paragraph or h3/h4. */
function dekFrom(html: string): string {
  const lead = html.match(/^\s*(?:<figure>[\s\S]*?<\/figure>\s*)?<(p><em|h3|h4)>([\s\S]*?)<\/(?:em><\/p|h3|h4)>/);
  if (lead?.[2]) return stripTags(lead[2]);
  const first = html.match(/<p>([\s\S]*?)<\/p>/);
  const text = first?.[1] ? stripTags(first[1]) : "";
  return text.length > 180 ? `${text.slice(0, 177).replace(/\s+\S*$/, "")}…` : text;
}

function imageFrom(html: string): string | null {
  // The first real image; the feed also carries a 1×1 tracking pixel.
  for (const m of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    const src = m[1] ?? "";
    // cdn-images-1 only redirects to miro now; go straight there and ask for
    // a WebP at a sane width instead of the 1024px PNG in the feed.
    const id = src.match(/(?:cdn-images-1|miro)\.medium\.com\/(?:max\/\d+|v2\/[^/]+(?:\/[^/]+)?)\/([^/?#]+)$/)?.[1];
    if (id) return `https://miro.medium.com/v2/resize:fit:800/format:webp/${id}`;
  }
  return null;
}

export function parseFeed(xml: string): Article[] {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1] ?? "");
  return items
    .map((item): Article | null => {
      const title = tag(item, "title");
      const link = tag(item, "link");
      const pub = tag(item, "pubDate");
      const html = tag(item, "content:encoded");
      if (!title || !link || !pub) return null;
      const date = new Date(pub);
      if (Number.isNaN(date.getTime())) return null;
      const words = stripTags(html).split(" ").filter(Boolean).length;
      return {
        title,
        href: cleanLink(link),
        date: date.toISOString().slice(0, 10),
        minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
        dek: dekFrom(html),
        image: imageFrom(html),
        thumb: imageFrom(html),
        tags: [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map((c) => decode(c[1] ?? "")),
      };
    })
    .filter((a): a is Article => a !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, MAX_ITEMS);
}

const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

async function fetchBytes(url: string, timeoutMs: number): Promise<Buffer> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { "user-agent": UA } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Covers are served from this site, not Medium's CDN: it sets a third-party
 * cookie on every image, and the page shouldn't hand visitors to a tracker
 * just to show a thumbnail. Files are committed with the snapshot, so they
 * survive a build that can't reach Medium. Any cover that can't be fetched
 * keeps its remote URL rather than breaking the page.
 */
export async function localizeCovers(items: Article[], dir: string): Promise<void> {
  mkdirSync(dir, { recursive: true });
  const keep = new Set<string>();
  for (const item of items) {
    const id = item.image?.match(/^https:\/\/miro\.medium\.com\/v2\/[^/]+\/format:webp\/([^/?#]+)$/)?.[1];
    if (!id) continue;
    const name = id.replace(/[^A-Za-z0-9_-]/g, "_");
    const paths: Record<number, string> = {};
    try {
      for (const w of [400, 800]) {
        const file = `${name}-${w}.webp`;
        if (!existsSync(join(dir, file))) {
          const bytes = await fetchBytes(`https://miro.medium.com/v2/resize:fit:${w}/format:webp/${id}`, 10_000);
          writeFileSync(join(dir, file), bytes);
        }
        keep.add(file);
        paths[w] = `/covers/${file}`;
      }
      item.image = paths[800] ?? item.image;
      item.thumb = paths[400] ?? item.image;
    } catch {
      /* leave the remote URL in place */
    }
  }
  for (const file of readdirSync(dir)) {
    if (file.endsWith(".webp") && !keep.has(file)) unlinkSync(join(dir, file));
  }
}

async function fetchFeed(timeoutMs: number): Promise<string> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(FEED_URL, {
      signal: ctrl.signal,
      headers: {
        // Medium answers 403 to obviously scripted clients.
        "user-agent": UA,
        accept: "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Vite plugin. Runs before any module is loaded, so the app imports whichever
 * snapshot is on disk once it finishes. Set MEDIUM_OFFLINE=1 to skip the fetch.
 */
export function mediumFeed(snapshotPath: string, coversDir: string): Plugin {
  return {
    name: "medium-feed",
    apply: "build",
    async buildStart() {
      if (process.env.MEDIUM_OFFLINE === "1") {
        this.info("medium-feed: MEDIUM_OFFLINE=1, using the committed snapshot");
        return;
      }
      try {
        const items = parseFeed(await fetchFeed(10_000));
        if (items.length === 0) throw new Error("feed parsed to zero posts");
        await localizeCovers(items, coversDir);
        const prev = JSON.parse(readFileSync(snapshotPath, "utf8")) as ArticleSnapshot;
        if (JSON.stringify(prev.items) === JSON.stringify(items)) {
          this.info(`medium-feed: ${items.length} posts, unchanged`);
          return;
        }
        const next: ArticleSnapshot = {
          fetchedAt: new Date().toISOString(),
          source: FEED_URL,
          items,
        };
        writeFileSync(snapshotPath, `${JSON.stringify(next, null, 2)}\n`);
        this.info(`medium-feed: wrote ${items.length} posts, newest ${items[0]?.date}`);
      } catch (err) {
        // Never fail the build over this: the committed snapshot is good enough.
        this.warn(`medium-feed: kept the committed snapshot (${(err as Error).message})`);
      }
    },
  };
}
