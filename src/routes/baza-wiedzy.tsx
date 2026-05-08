import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { knowledgeCards } from "@/data/experiments";
import { useState } from "react";
import { Beaker, Droplet, Wind, Rocket, FlaskConical } from "lucide-react";

export const Route = createFileRoute("/baza-wiedzy")({
  head: () => ({
    meta: [
      { title: "Baza Wiedzy Małego Naukowca — Fabryka Eksperymentów Noego" },
      { name: "description", content: "Przeglądaj eksperymenty według kategorii: woda, powietrze, kosmos, chemia." },
    ],
  }),
  component: KnowledgePage,
});

const categories = [
  { key: "Wszystko", icon: Beaker, color: "bg-primary" },
  { key: "Woda", icon: Droplet, color: "bg-sky" },
  { key: "Powietrze", icon: Wind, color: "bg-bubble" },
  { key: "Kosmos", icon: Rocket, color: "bg-grape" },
  { key: "Chemia", icon: FlaskConical, color: "bg-fire" },
] as const;

const colorMap: Record<string, string> = {
  sun: "bg-sun", sky: "bg-sky", leaf: "bg-leaf", fire: "bg-fire", grape: "bg-grape",
};

function KnowledgePage() {
  const [active, setActive] = useState<string>("Wszystko");
  const filtered = active === "Wszystko" ? knowledgeCards : knowledgeCards.filter((c) => c.category === active);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-10 text-center">
        <h1 className="font-display text-3xl md:text-5xl font-bold">
          <span className="text-primary">Baza Wiedzy</span><br />
          <span className="text-accent">Małego Naukowca</span>
        </h1>

        <div className="mt-8 inline-flex flex-wrap justify-center gap-2 p-2 rounded-full bg-card border-2 border-border shadow-md">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-bold text-sm transition ${active === c.key ? `${c.color} text-white shadow-md` : "hover:bg-secondary"}`}
            >
              <c.icon className="h-4 w-4" /> {c.key}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {filtered.map((card) => (
            <div key={card.title} className="card-pop overflow-hidden">
              <div className={`aspect-square ${colorMap[card.color]} flex items-center justify-center text-6xl`}>
                {card.category === "Woda" && "💧"}
                {card.category === "Powietrze" && "🎈"}
                {card.category === "Chemia" && "🧪"}
                {card.category === "Kosmos" && "🌌"}
              </div>
              <div className="p-3 text-left">
                <h3 className="font-display font-bold text-sm leading-tight">{card.title}</h3>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  Trudność:
                  {Array.from({ length: 3 }).map((_, i) => (
                    <span key={i} className={`inline-block w-2 h-4 rounded-sm ${i < card.difficulty ? "bg-primary" : "bg-muted"}`} />
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
