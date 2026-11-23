/**
 * Small app-wide actions that several components trigger: the command
 * palette, toasts, and copying the email address. Plain DOM events keep them
 * free of context plumbing.
 */
import { PROFILE } from "../data/profile";

export function openPalette() {
  window.dispatchEvent(new Event("palette:open"));
}

export type ToastDetail = { message: string };

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent<ToastDetail>("toast", { detail: { message } }));
}

/** Copy the email; the toast says what happened either way. */
export async function copyEmail(messages: { copied: string; failed: string }) {
  try {
    await navigator.clipboard.writeText(PROFILE.email);
    toast(messages.copied);
  } catch {
    toast(messages.failed.replace("{email}", PROFILE.email));
  }
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(history.state, "", `#${id}`);
  // Move focus for keyboard and screen-reader users without a second jump.
  const heading = el.querySelector<HTMLElement>("h2");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}
