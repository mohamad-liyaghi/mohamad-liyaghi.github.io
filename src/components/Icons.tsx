import type { SVGProps } from "react";

/**
 * Drawn here rather than pulled from an icon set, so the whole page shares one
 * stroke weight and one corner radius. 24px grid, 1.6 stroke, round joins.
 */
type IconProps = SVGProps<SVGSVGElement>;

function Stroke({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Sun = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
  </Stroke>
);

export const Moon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
  </Stroke>
);

export const ArrowOut = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </Stroke>
);

export const ArrowDown = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </Stroke>
);

export const ArrowUp = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Stroke>
);

export const Chevron = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m6 9 6 6 6-6" />
  </Stroke>
);

export const Menu = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Stroke>
);

export const Close = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Stroke>
);

export const Star = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m12 4 2.4 5 5.6.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.6-.8Z" />
  </Stroke>
);

export const Doc = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5Z" />
    <path d="M14 3v4.5h4.5M9 13h6M9 16.5h4" />
  </Stroke>
);

export const Mail = (p: IconProps) => (
  <Stroke {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
    <path d="m3.8 6.8 8.2 6 8.2-6" />
  </Stroke>
);

/* Brand marks are filled, not stroked — they are drawn from each brand's own
   glyph and would not read correctly as outlines. */
function Brand({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const GitHub = (p: IconProps) => (
  <Brand {...p}>
    <path d="M12 1.8a10.2 10.2 0 0 0-3.2 19.9c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.5 2.3 1.1 2.9.9.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.1-4.7-5 0-1.1.4-2 1-2.8-.1-.2-.4-1.2.1-2.6 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.6.6.8 1 1.7 1 2.8 0 3.9-2.4 4.7-4.7 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A10.2 10.2 0 0 0 12 1.8Z" />
  </Brand>
);

export const LinkedIn = (p: IconProps) => (
  <Brand {...p}>
    <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 21h4V9.5H3V21Zm7 0h4v-6.2c0-1.7.9-2.5 2-2.5s1.9.8 1.9 2.5V21h4v-6.9c0-3.4-1.8-4.9-4.2-4.9-1.9 0-2.9 1.1-3.4 1.9h-.1V9.5h-4c.1 1.1 0 11.5 0 11.5Z" />
  </Brand>
);

export const Medium = (p: IconProps) => (
  <Brand {...p}>
    <ellipse cx="6.5" cy="12" rx="6.1" ry="6.8" />
    <ellipse cx="16.4" cy="12" rx="2.9" ry="6.3" />
    <ellipse cx="22" cy="12" rx="1.4" ry="5.6" />
  </Brand>
);

export const Telegram = (p: IconProps) => (
  <Brand {...p}>
    <path d="M21.7 4.3 2.9 11.5c-.9.4-.9 1 0 1.3l4.7 1.5 1.8 5.5c.2.6.5.7 1 .3l2.6-2.1 4.7 3.5c.9.5 1.4.2 1.6-.8l3-13.7c.2-1-.4-1.5-1.6-.7Zm-4 3-7.6 6.9-.3 3.3-1.5-4.7 9-5.9c.4-.3.8-.1.4.4Z" />
  </Brand>
);

/** The mark. An M whose last stem carries on into an L. */
export const Monogram = (p: IconProps) => (
  <svg
    viewBox="0 0 32 32"
    width="28"
    height="28"
    fill="none"
    aria-hidden="true"
    focusable="false"
    {...p}
  >
    <path
      d="M6.5 24V8.6L13.4 18l6.9-9.4V24h5.2"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
