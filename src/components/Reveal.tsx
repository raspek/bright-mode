import { useEffect, useRef, type ReactNode } from "react";

type Variant = "up" | "pop" | "left";

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  as: As = "div",
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  as?: any;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const cls = variant === "pop" ? "reveal-pop" : variant === "left" ? "reveal-left" : "reveal";
  return (
    <As
      ref={ref}
      className={`${cls} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </As>
  );
}
