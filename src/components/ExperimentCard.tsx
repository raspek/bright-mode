import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Experiment } from "@/data/experiments";

const accentBg: Record<Experiment["accent"], string> = {
  sun: "bg-sun",
  sky: "bg-sky",
  leaf: "bg-leaf",
  fire: "bg-fire",
  grape: "bg-grape",
};

export function ExperimentCard({ exp, large = false }: { exp: Experiment; large?: boolean }) {
  return (
    <article className={`card-pop overflow-hidden flex flex-col ${large ? "" : ""}`}>
      <Link to="/eksperymenty/$slug" params={{ slug: exp.slug }} className={`relative block ${accentBg[exp.accent]}`}>
        <img
          src={exp.image}
          alt={`Plakat eksperymentu: ${exp.title}`}
          className={`w-full object-cover ${large ? "aspect-[4/3]" : "aspect-square"}`}
          loading="lazy"
          width={1024}
          height={1024}
        />
      </Link>
      <div className="p-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Eksperyment #{exp.number}</p>
          <h3 className="font-display text-lg font-bold leading-tight">{exp.shortTitle}</h3>
        </div>
        <Link
          to="/eksperymenty/$slug"
          params={{ slug: exp.slug }}
          className="shrink-0 inline-flex items-center gap-1 rounded-full border-2 border-border bg-background px-3 py-1.5 text-xs font-bold hover:bg-primary hover:text-primary-foreground hover:border-primary transition"
        >
          ZOBACZ <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </article>
  );
}