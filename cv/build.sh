#!/usr/bin/env bash
# Build both résumés and drop the PDFs where the site serves them.
#
#   ./cv/build.sh            # build both
#   ./cv/build.sh en         # build one
#
# Needs XeLaTeX with bidi/xepersian (Debian: texlive-xetex texlive-lang-arabic
# texlive-latex-extra). Fonts are vendored in cv/fonts, so the build does not
# depend on what happens to be installed on the machine.

set -euo pipefail
cd "$(dirname "$0")"

OUT=../public
declare -A PDF=( [en]=Mohamad_Liyaghi_CV.pdf [fa]=Mohamad_Liyaghi_CV_FA.pdf )

build () {
  local lang=$1
  echo "→ cv-$lang.tex"
  # Twice: hyperref needs a second pass to settle its bookmarks.
  for _ in 1 2; do
    xelatex -interaction=nonstopmode -halt-on-error "cv-$lang.tex" > /dev/null
  done
  mkdir -p "$OUT"
  mv "cv-$lang.pdf" "$OUT/${PDF[$lang]}"
  echo "  → $OUT/${PDF[$lang]}  ($(du -h "$OUT/${PDF[$lang]}" | cut -f1))"
}

langs=("$@")
[ ${#langs[@]} -eq 0 ] && langs=(en fa)
for lang in "${langs[@]}"; do build "$lang"; done

rm -f ./*.aux ./*.log ./*.out
echo "done."
