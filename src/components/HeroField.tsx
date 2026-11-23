import { useEffect, useRef } from "react";

/**
 * A lattice of dots behind the hero that behaves like a loupe: dots near the
 * pointer swell, push outward and take the accent colour; a click or tap sends
 * a ring through the field. With no pointer, a slow diagonal swell keeps it
 * breathing.
 *
 * Cost control: one canvas, dots bucketed into a few colour steps so each
 * frame is a handful of fills; the loop stops entirely when the hero is off
 * screen or the tab is hidden; device pixel ratio is capped at 2. Under
 * prefers-reduced-motion it draws once and stays still.
 */

const GAP = 24;
const BASE_R = 1.05;
const LENS_R = 150;
const STEPS = 8;

type Ring = { x: number; y: number; t0: number };

function cssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function parseColor(c: string): [number, number, number] {
  const m = c.match(/^#([0-9a-f]{6})$/i);
  if (!m?.[1]) return [128, 128, 128];
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let w = 0;
    let h = 0;
    let dpr = 1;
    let palette: string[] = [];
    let visible = true;
    let raf = 0;
    let running = false;
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, strength: 0, target: 0 };
    const rings: Ring[] = [];

    const buildPalette = () => {
      const from = parseColor(cssVar("--line-strong"));
      const to = parseColor(cssVar("--accent"));
      palette = Array.from({ length: STEPS }, (_, i) => {
        const k = i / (STEPS - 1);
        const mix = from.map((v, j) => Math.round(v + ((to[j] ?? v) - v) * k));
        return `rgb(${mix[0]} ${mix[1]} ${mix[2]})`;
      });
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      // Ease the lens toward the pointer, and fade it in and out.
      pointer.x += (pointer.tx - pointer.x) * 0.16;
      pointer.y += (pointer.ty - pointer.y) * 0.16;
      pointer.strength += (pointer.target - pointer.strength) * 0.08;

      for (let i = rings.length - 1; i >= 0; i--) {
        if (now - (rings[i]?.t0 ?? 0) > 1600) rings.splice(i, 1);
      }

      const paths = palette.map(() => new Path2D());
      const t = reduced.matches ? 0 : now * 0.00045;
      const cols = Math.ceil(w / GAP) + 1;
      const rows = Math.ceil(h / GAP) + 1;
      const ox = (w - (cols - 1) * GAP) / 2;
      const oy = (h - (rows - 1) * GAP) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let x = ox + c * GAP;
          let y = oy + r * GAP;
          // Fade toward the bottom so the field settles into the page.
          const fall = Math.min(1, Math.max(0, (h - y) / (h * 0.45)));
          if (fall <= 0.02) continue;

          const swell = reduced.matches ? 0 : (Math.sin(t * 2 + (x + y) * 0.006) + 1) * 0.5;
          let k = 0;

          if (pointer.strength > 0.01) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const d2 = dx * dx + dy * dy;
            // Full strength behind the name, fading out over the text below it
            // so lit dots never sit under a paragraph.
            const zone = Math.min(1, Math.max(0.12, (h * 0.78 - y) / (h * 0.22)));
            const lens = Math.exp(-d2 / (2 * LENS_R * LENS_R * 0.35)) * pointer.strength * zone;
            if (lens > 0.002) {
              const d = Math.sqrt(d2) || 1;
              x += (dx / d) * lens * 12;
              y += (dy / d) * lens * 12;
              k = Math.max(k, lens);
            }
          }

          for (const ring of rings) {
            const age = (now - ring.t0) / 1600;
            const radius = age * Math.max(w, h) * 0.75;
            const d = Math.hypot(x - ring.x, y - ring.y);
            const band = Math.exp(-((d - radius) ** 2) / 900) * (1 - age);
            k = Math.max(k, band);
          }

          const radius = (BASE_R + swell * 0.55 + k * 2.6) * (0.55 + 0.45 * fall);
          const step = Math.min(STEPS - 1, Math.round(k * (STEPS - 1) + swell * 0.6));
          const p = paths[step];
          if (!p) continue;
          p.moveTo(x + radius, y);
          p.arc(x, y, radius, 0, Math.PI * 2);
        }
      }
      paths.forEach((p, i) => {
        ctx.fillStyle = palette[i] ?? "#888";
        ctx.globalAlpha = 0.55 + (i / (STEPS - 1)) * 0.45;
        ctx.fill(p);
      });
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced.matches || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const redrawStill = () => {
      if (!running) draw(performance.now());
    };

    const local = (e: PointerEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const p = local(e);
      if (pointer.target === 0) {
        pointer.x = p.x;
        pointer.y = p.y;
      }
      pointer.tx = p.x;
      pointer.ty = p.y;
      pointer.target = 1;
    };
    const onLeave = () => {
      pointer.target = 0;
    };
    const onDown = (e: PointerEvent) => {
      if (reduced.matches) return;
      // Clicks on links and buttons are for the links and buttons.
      if ((e.target as Element).closest("a, button, input, [role='button']")) return;
      const p = local(e);
      rings.push({ x: p.x, y: p.y, t0: performance.now() });
      if (rings.length > 4) rings.shift();
    };

    buildPalette();
    resize();
    draw(performance.now());

    const ro = new ResizeObserver(() => {
      resize();
      redrawStill();
    });
    ro.observe(host);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) start();
      else stop();
    });
    io.observe(host);

    const onVisibility = () => (document.hidden ? stop() : start());
    const onMotion = () => {
      if (reduced.matches) {
        stop();
        draw(performance.now());
      } else start();
    };
    const themeObserver = new MutationObserver(() => {
      buildPalette();
      redrawStill();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown);
    document.addEventListener("visibilitychange", onVisibility);
    reduced.addEventListener("change", onMotion);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", onMotion);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}
