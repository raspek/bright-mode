import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ExperimentsCarousel3D } from "@/components/ExperimentsCarousel3D";
import { experiments } from "@/data/experiments";
import heroLight from "@/assets/head-light.png";
import heroDark from "@/assets/head-dark.png";
import { Lock, Beaker, Cog, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fabryka Eksperymentów Noego — najnowsze eksperymenty" },
      { name: "description", content: "Odkryj najnowsze eksperymenty naukowe dla dzieci. Zdobywaj odznaki i baw się nauką w Fabryce Eksperymentów Noego." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pt-8 pb-12">
          <div className="rounded-3xl overflow-hidden" style={{ backgroundImage: "var(--gradient-hero)" }}>
            <div className="relative w-full">
              <img
                src={heroLight}
                alt="Mały naukowiec z robotem w laboratorium"
                className="w-full h-auto block dark:hidden"
                width={1536}
                height={1024}
              />
              <img
                src={heroDark}
                alt="Mały naukowiec z robotem w neonowym laboratorium"
                className="w-full h-auto hidden dark:block"
                width={1536}
                height={1024}
              />
            </div>
            <div className="px-6 md:px-10 pb-8 md:pb-10 -mt-6 md:-mt-10 relative z-10 text-center max-w-3xl mx-auto">
              <p className="inline-flex items-center gap-1 rounded-full bg-background/80 backdrop-blur px-3 py-1 text-xs font-bold border-2 border-border">
                <Sparkles className="h-3 w-3 text-accent" /> Nauka przez zabawę
              </p>
              <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-tight">
                Witaj w <span className="text-primary">Fabryce</span> małego naukowca!
              </h1>
              <p className="mt-3 text-base md:text-lg text-muted-foreground">
                Odkryj kolorowe eksperymenty, zdobywaj odznaki i baw się chemią, fizyką oraz przyrodą razem z Noego i jego robotem.
              </p>
              <div className="mt-5 flex flex-wrap gap-3 justify-center">
                <Link to="/eksperymenty" className="btn-rainbow">Zobacz eksperymenty</Link>
                <Link to="/baza-wiedzy" className="inline-flex items-center gap-2 rounded-full bg-background border-2 border-border px-5 py-3 font-bold hover:bg-secondary">Baza Wiedzy</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiments */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between mb-5">
          <h2 className="font-display text-2xl md:text-3xl font-bold flex items-center gap-2"><Beaker className="h-7 w-7 text-primary" /> Najnowsze eksperymenty</h2>
          <Link to="/eksperymenty" className="text-sm font-bold text-primary hover:underline">Zobacz wszystkie →</Link>
        </div>
        <ExperimentsCarousel3D items={experiments} />
      </section>

      {/* Badges */}
      <section className="mx-auto max-w-7xl px-4 mt-16 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold">Twoje Odznaki</h2>
        <p className="text-muted-foreground mt-1">Zdobywaj odznaki za ukończone eksperymenty!</p>
        <div className="mt-6 flex justify-center gap-8 flex-wrap">
          <Badge icon={<Beaker className="h-10 w-10" />} label="Młody Chemik" color="bg-leaf" unlocked />
          <Badge icon={<Cog className="h-10 w-10" />} label="Inżynier Noego" color="bg-sky" unlocked />
          <Badge icon={<Lock className="h-10 w-10" />} label="???" color="bg-muted" />
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 mt-16">
        <form
          onSubmit={(e) => { e.preventDefault(); alert("Dzięki! Zapraszamy do drużyny!"); }}
          className="rounded-3xl p-6 md:p-8 text-white shadow-lg"
          style={{ backgroundImage: "var(--gradient-cta)" }}
        >
          <p className="font-display text-xl md:text-2xl font-bold text-center">
            Dołącz do naszej Naukowej Załogi! 🧪 Odbierz darmowy eksperyment!
          </p>
          <div className="mt-4 grid sm:grid-cols-[1fr_1fr_auto] gap-3">
            <input required type="text" placeholder="Twoje imię" className="rounded-full px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground border-2 border-transparent focus:outline-none focus:border-foreground" />
            <input required type="email" placeholder="Twój e-mail" className="rounded-full px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground border-2 border-transparent focus:outline-none focus:border-foreground" />
            <button className="rounded-full px-6 py-3 bg-foreground text-background font-bold hover:scale-105 transition-transform">Dołączam ✨</button>
          </div>
        </form>
      </section>
    </SiteLayout>
  );
}

function Badge({ icon, label, color, unlocked }: { icon: React.ReactNode; label: string; color: string; unlocked?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`h-20 w-20 rounded-full ${color} flex items-center justify-center text-white border-4 border-background shadow-lg ${unlocked ? "" : "opacity-60"}`}>
        {icon}
      </div>
      <p className="text-sm font-bold">{label}</p>
    </div>
  );
}
