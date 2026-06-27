import { useEffect } from "react";

const SITE = "https://mohamad-liyaghi.ir";

// captured from index.html on first run so the home route can restore it
let initialDescription: string | null = null;

/** Set document.title (and meta description) for the current route. */
export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    const meta = document.querySelector('meta[name="description"]');
    if (initialDescription === null) {
      initialDescription = meta?.getAttribute("content") ?? "";
    }
    document.title = title;
    meta?.setAttribute("content", description ?? initialDescription ?? "");
  }, [title, description]);
}

/** Keep <link rel="canonical"> in sync with the current path. */
export function useCanonical(pathname: string) {
  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = `${SITE}${pathname}`;
  }, [pathname]);
}
