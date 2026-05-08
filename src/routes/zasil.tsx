import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Droplet, Flame, Zap, Rocket } from "lucide-react";

export const Route = createFileRoute("/zasil")({
  head: () => ({
    meta: [
      { title: "Zasil laboratorium Noego — wsparcie" },
      { name: "description", content: "Pomóż nam doładować energię do nowych, fascynujących eksperymentów!" },
    ],
  }),
  component: SupportPage,
});

const tiers = [
  { name: "Mała Dawka Energii", icon: Droplet, price: "10 - 50 zł", desc: "Wsparcie na drobne materiały i odczynniki. Każda kropla się liczy!", cta: "Zasil małą dawką", color: "bg-sky" },
  { name: "Pełna Moc Patronite", icon: Flame, price: "Regularne wsparcie", desc: "Stałe wsparcie na wielkie projekty i sprzęt! Zostań Patronem i dołącz do elitarnej drużyny!", cta: "Zostań Patronem Noego", color: "bg-fire", featured: true },
  { name: "Szybkie Doładowanie Suppi", icon: Zap, price: "Jednorazowa wpłata", desc: "Chcesz szybko dorzucić cegiełkę? Zrób to przez Suppi i zobacz efekty!", cta: "Wesprzyj jednorazowo", color: "bg-leaf" },
];

function SupportPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-4 py-12 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold flex items-center justify-center gap-3 flex-wrap">
          <Rocket className="h-10 w-10 text-primary" /> Zasil laboratorium Noego
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Pomóż nam doładować energię do nowych, fascynujących eksperymentów! ⚡✨
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((t) => (
            <div key={t.name} className={`card-pop p-6 flex flex-col items-center text-center ${t.featured ? "md:-translate-y-4 ring-4 ring-accent" : ""}`}>
              <div className={`h-24 w-24 rounded-3xl ${t.color} flex items-center justify-center text-white shadow-xl`}>
                <t.icon className="h-12 w-12" />
              </div>
              <h2 className="font-display text-xl font-bold mt-5">{t.name}</h2>
              <p className="text-primary font-bold mt-1">{t.price}</p>
              <p className="text-sm text-muted-foreground mt-3 flex-1">{t.desc}</p>
              <button className="btn-rainbow mt-5 w-full">{t.cta}</button>
            </div>
          ))}
        </div>

        <p className="mt-12 font-display text-lg">Dziękujemy za każdą jednostkę energii! ❤️🧪</p>
        <p className="text-muted-foreground text-sm mt-1">Wasze wsparcie napędza nasze naukowe przygody!</p>
      </section>
    </SiteLayout>
  );
}
