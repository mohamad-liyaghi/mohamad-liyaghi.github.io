import { useScrollProgress } from "../lib/hooks";

export function Progress() {
  const value = useScrollProgress();
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-0.5 origin-left bg-accent-bright"
      style={{ transform: `scaleX(${value})` }}
      aria-hidden
    />
  );
}
