# mohamad-liyaghi.ir

My personal site, in English and Persian. Dark spruce, one lime accent, and a
field of dots that leans toward your cursor.

**Live:** [mohamad-liyaghi.ir](https://mohamad-liyaghi.ir)

## Stack

Vite, React 19, TypeScript and Tailwind CSS v4. Runtime dependencies are React
and React DOM, nothing else: no UI kit, no animation library, no i18n
framework, no XML parser.

```bash
npm ci
npm run dev        # local dev server
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + production build → dist/
```

## Design

- **Dark first.** Dark is the flagship theme and the default when the OS has no
  preference; light is a cool mist with spruce ink. The page follows the OS
  until you pick, then remembers. The theme is settled by an inline script
  before first paint, so nothing flashes, and switching grows the new theme
  out of the toggle with the View Transitions API (an instant swap where that
  isn't supported or motion is reduced).
- **One family.** Mona Sans across its width axis: expanded and heavy for the
  name, normal width for reading. Persian is Vazirmatn. Both are self-hosted
  and split by `unicode-range`, so the Persian font only downloads on pages
  with Persian text.
- **Interaction that earns its place.** The hero field is one canvas, paused
  off screen and in background tabs, still under `prefers-reduced-motion`.
  Cards light their border under the cursor. `⌘K` / `Ctrl+K` (or `/`) opens a
  command palette over sections, essays, projects, both résumés, theme,
  language and copy-email. The scroll progress line and the work timeline are
  CSS scroll timelines, no JavaScript.

Design tokens live at the top of `src/styles.css`.

## Writing stays current on its own

`scripts/medium-feed.ts` is a Vite plugin that fetches the Medium RSS feed at
build time, strips tracking parameters, works out reading time, downloads each
cover into `public/covers/` (Medium's image CDN sets a third-party cookie, so
covers are served from this site), and rewrites `src/data/articles.json`. The JSON and covers are committed
and are also the fallback: if Medium is down or blocks the runner, the build warns and
ships the last snapshot instead of failing. The Pages workflow runs daily, so
new posts appear without a commit. `MEDIUM_OFFLINE=1` skips the fetch.

## Both languages are real URLs

`/en/` and `/fa/` are written at build time by a small Vite plugin
(`languagePages` in `vite.config.ts`), each with its own `lang`, `dir`,
`<title>`, description and canonical URL before any JavaScript runs. GitHub
Pages has no server-side routing, so without this a crawler asking for `/fa/`
would get a 404. The same plugin writes `sitemap.xml` with the build date.

Persian is written as Persian rather than translated line by line, laid out
right-to-left with CSS logical properties, with Persian numerals and the
Persian calendar via `Intl`.

## Résumé

`cv/` holds the LaTeX sources for both résumés and the script that builds them.
See [cv/README.md](cv/README.md).

## Social card

`public/og-cover.png` and `public/apple-touch-icon.png` are rendered from
`scripts/og/og.html` (instructions at the top of that file).

## Layout

```
src/
  components/    one file per section, plus the palette, toaster, hero field
  data/          profile.ts (facts) and articles.json (Medium snapshot)
  i18n/          en.ts, fa.ts and the provider that swaps them
  lib/           theme, hooks, small shared actions
  styles.css     design tokens, fonts, motion
scripts/         build-time Medium fetch, social card source
cv/              LaTeX résumés (source of truth) + build.sh
public/          fonts, favicon, social card, résumé PDFs and HTML
```

© Mohamad Liyaghi
