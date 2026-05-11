import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Experiment } from "@/data/experiments";

const accentBg: Record<Experiment["accent"], string> = {
  sun: "bg-sun",
  sky: "bg-sky",
  leaf: "bg-leaf",
  fire: "bg-fire",
  grape: "bg-grape",
};

export function ExperimentsCarousel3D({ items }: { items: Experiment[] }) {
  const [active, setActive] = useState(0);
  const n = items.length;

  const go = (dir: number) => setActive((a) => (a + dir + n) % n);

  return (
    <div className="relative">
      <div
        className="relative mx-auto h-[460px] md:h-[560px] w-full"
        style={{ perspective: "1400px" }}
      >
        {items.map((exp, i) => {
          let offset = i - active;
          if (offset > n / 2) offset -= n;
          if (offset < -n / 2) offset += n;

          const abs = Math.abs(offset);
          const isActive = offset === 0;
          const translateX = offset * 180;
          const translateZ = -abs * 220;
          const rotateY = offset * -22;
          const opacity = abs > 2 ? 0 : 1 - abs * 0.15;
          const scale = isActive ? 1 : 0.85;

          return (
            <button
              key={exp.slug}
              type="button"
              onClick={() => (isActive ? null : setActive(i))}
              aria-label={exp.title}
              className="absolute left-1/2 top-1/2 w-[280px] md:w-[380px] -ml-[140px] md:-ml-[190px] -mt-[200px] md:-mt-[260px] transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
              style={{
                transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex: 100 - abs,
                opacity,
                pointerEvents: abs > 2 ? "none" : "auto",
              }}
            >
              <article className="card-pop overflow-hidden text-left">
                <div className={`relative ${accentBg[exp.accent]}`}>
                  <img
                    src={exp.image}
                    alt={`Plakat eksperymentu: ${exp.title}`}
                    className="w-full aspect-square object-cover"
                    loading="lazy"
                    width={760}
                    height={760}
                  />
                </div>
                <div className="p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Eksperyment #{exp.number}
                    </p>
                    <h3 className="font-display text-lg font-bold leading-tight">
                      {exp.shortTitle}
                    </h3>
                  </div>
                  {isActive && (
                    <Link
                      to="/eksperymenty/$slug"
                      params={{ slug: exp.slug }}
                      className="shrink-0 inline-flex items-center gap-1 rounded-full border-2 border-border bg-background px-3 py-1.5 text-xs font-bold hover:bg-primary hover:text-primary-foreground hover:border-primary transition"
                    >
                      ZOBACZ <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </article>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={() => go(-1)}
          aria-label="Poprzedni"
          className="h-11 w-11 rounded-full bg-background border-2 border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Przejdź do ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${i === active ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground"}`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Następny"
          className="h-11 w-11 rounded-full bg-background border-2 border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}