# Résumé

`cv-en.tex` and `cv-fa.tex` are the source of truth. Everything else is built
from them.

```bash
./build.sh          # both languages
./build.sh en       # just one
```

Output lands in `../public/`, which the site serves and links to:

| Language | Source | PDF | HTML |
| --- | --- | --- | --- |
| English | `cv-en.tex` | `public/Mohamad_Liyaghi_CV.pdf` | `public/cv.html` |
| فارسی | `cv-fa.tex` | `public/Mohamad_Liyaghi_CV_FA.pdf` | `public/cv-fa.html` |

Both fit on one A4 page. If an edit pushes either onto a second page, tighten
the copy rather than shrinking the type — there is an `\enlargethispage` at the
last section already doing the final bit of work.

## Requirements

XeLaTeX with bidi/xepersian. On Debian or Ubuntu:

```bash
apt-get install texlive-xetex texlive-latex-extra texlive-lang-arabic
```

Fonts are vendored in `fonts/` (Instrument Serif, Archivo, JetBrains Mono,
Vazirmatn — all SIL Open Font License), so a build does not depend on what is
installed on the machine.

## The Persian file

`xepersian` must be the **last** package loaded, since it pulls in `bidi`.

Two things that look like typos but are not:

- `\lr{…}` wraps Latin runs (technology names, URLs) so they render
  left-to-right inside Persian text.
- The display and heading fonts are declared with `Script=Arabic`. Without it,
  `fontspec` skips Arabic shaping and the letters do not join.

## Keeping the HTML in step

`public/cv.html` and `public/cv-fa.html` mirror these documents by hand — same
copy, same palette, so a reader gets the same résumé whether they open the page
or the PDF. When you change a `.tex`, change its HTML twin in the same commit.
