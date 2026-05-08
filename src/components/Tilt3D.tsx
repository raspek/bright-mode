import { useRef, type ReactNode, type MouseEvent } from "react";

export function Tilt3D({ children, className = "", max = 1 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2 * max;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2 * max;
    el.style.setProperty("--tx", String(x));
    el.style.setProperty("--ty", String(y));
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tx", "0");
    el.style.setProperty("--ty", "0");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-3d ${className}`}
    >
      {children}
    </div>
  );
}