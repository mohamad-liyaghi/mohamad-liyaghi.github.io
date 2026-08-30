# mohamad-liyaghi.ir

My personal site — a bilingual (English / فارسی) portfolio.

**Live:** [mohamad-liyaghi.ir](https://mohamad-liyaghi.ir)

## Stack

Vite, React 19, TypeScript and Tailwind CSS v4. No UI kit, no animation
library, no i18n framework — the design system is about 350 lines of CSS and
the translation layer is a typed dictionary behind a context, which is all a
site this size needs.

```bash
npm install
npm run dev        # local dev server
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + production build → dist/
```

## Both languages are real URLs

`/en/` and `/fa/` are pre-rendered at build time by a small Vite plugin
(`languagePages` in `vite.config.ts`), each with its own `lang`, `dir`,
`<title>`, description and canonical URL in the markup before any JavaScript
runs. GitHub Pages has no server-side routing, so without this a crawler
asking for `/fa/` would get a 404 no matter what the client did afterwards.

Persian is written as Persian rather than translated line by line, laid out
right-to-left with CSS logical properties, and shown with Persian numerals and
the Persian calendar via `Intl`.

## Motion

One idea, applied consistently: things are *printed* onto the page rather than
faded in. Display lines are uncovered from the reading edge with a `clip-path`
wipe, hairlines draw themselves the same direction, and an amber stroke is
inked under the name once on arrival. Because everything keys off the reading
edge, it all reverses in Persian with no extra code.

All of it is CSS transitions driven by one `IntersectionObserver` hook, and all
of it collapses to nothing under `prefers-reduced-motion`.

## Résumé

`cv/` holds the LaTeX sources for both résumés and the script that builds them.
See [cv/README.md](cv/README.md).

## Layout

```
src/
  components/    one file per section, plus shared primitives
  data/profile.ts   language-neutral facts — links, roles, projects, stats
  i18n/          en.ts, fa.ts and the provider that swaps them
  lib/hooks.ts   reveal, scroll spy, theme, Tehran clock
  styles.css     design tokens and the motion primitives
cv/              LaTeX résumés (source of truth) + build.sh
public/          favicon, social card, résumé PDFs and HTML
```

© Mohamad Liyaghi
