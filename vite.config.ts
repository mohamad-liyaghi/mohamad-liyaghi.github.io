import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const sha = (() => {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "dev";
  }
})();

type Meta = Record<"en" | "fa", { title: string; description: string }>;

/**
 * GitHub Pages has no server-side routing, so a request for /en/ has to find a
 * real file or it answers 404 — which is what a crawler sees, whatever the
 * client-side redirect does afterwards. This writes a proper page per language
 * at build time: correct lang/dir, canonical and title in the markup before any
 * JavaScript runs.
 */
function languagePages(): Plugin {
  return {
    name: "language-pages",
    apply: "build",
    closeBundle() {
      const dist = resolve(import.meta.dirname, "dist");
      const meta: Meta = JSON.parse(
        readFileSync(resolve(import.meta.dirname, "src/i18n/meta.json"), "utf8"),
      );
      const source = readFileSync(resolve(dist, "index.html"), "utf8");

      // Every substitution is asserted: a silent miss here would ship a page
      // whose canonical URL points at the wrong language.
      const swap = (input: string, pattern: RegExp, replacement: string, what: string) => {
        if (!pattern.test(input)) throw new Error(`language-pages: no match for ${what}`);
        return input.replace(pattern, replacement);
      };

      for (const lang of ["en", "fa"] as const) {
        const { title, description } = meta[lang];
        const dir = lang === "fa" ? "rtl" : "ltr";
        let html = source;

        html = swap(html, /<html lang="en" dir="ltr"/, `<html lang="${lang}" dir="${dir}"`, "html tag");
        html = swap(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`, "title");
        html = swap(
          html,
          /(<link rel="canonical" href="https:\/\/mohamad-liyaghi\.ir\/)en\/(")/,
          `$1${lang}/$2`,
          "canonical",
        );
        html = swap(
          html,
          /(<meta property="og:url" content="https:\/\/mohamad-liyaghi\.ir\/)en\/(")/,
          `$1${lang}/$2`,
          "og:url",
        );
        html = swap(
          html,
          /(<meta\s+name="description"\s+content=")[^"]*(")/,
          `$1${description}$2`,
          "description",
        );
        html = swap(
          html,
          /(<meta property="og:title" content=")[^"]*(")/,
          `$1${title}$2`,
          "og:title",
        );
        html = swap(
          html,
          /<meta property="og:locale" content="en_US" \/>\s*<meta property="og:locale:alternate" content="fa_IR" \/>/,
          lang === "fa"
            ? '<meta property="og:locale" content="fa_IR" />\n    <meta property="og:locale:alternate" content="en_US" />'
            : '<meta property="og:locale" content="en_US" />\n    <meta property="og:locale:alternate" content="fa_IR" />',
          "og:locale",
        );

        mkdirSync(resolve(dist, lang), { recursive: true });
        writeFileSync(resolve(dist, lang, "index.html"), html);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), languagePages()],
  define: {
    __BUILD_SHA__: JSON.stringify(sha),
    __BUILD_YEAR__: JSON.stringify(String(new Date().getFullYear())),
  },
  build: { target: "es2022", cssMinify: "lightningcss" },
});
