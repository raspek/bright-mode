import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { Tilt3D } from "@/components/Tilt3D";
import { Boxes, Sparkles, Wand2, Cpu } from "lucide-react";
import printer from "@/assets/printer-3d.png";

export const Route = createFileRoute("/swiat-3d")({
  head: () => ({
    meta: [
      { title: "Świat 3D — drukarka 3D dla dzieci | Fabryka Eksperymentów Noego" },
      { name: "description", content: "Poznaj świat druku 3D! Czym jest drukarka 3D Bambu Lab A1 Mini i jak tworzy zabawki warstwa po warstwie — wytłumaczone dla dzieci." },
    ],
  }),
  component: Swiat3D,
});

function Swiat3D() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 pt-8 pb-12">
        <div className="rounded-3xl p-6 md:p-10 relative overflow-hidden" style={{ backgroundImage: "var(--gradient-hero)" }}>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <Reveal>
              <p className="inline-flex items-center gap-1 rounded-full bg-background/70 px-3 py-1 text-xs font-bold border-2 border-border">
                <Sparkles className="h-3 w-3 text-accent" /> Nowa sekcja
              </p>
              <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
                Witaj w <span className="text-primary">Świecie 3D</span>!
              </h1>
              <p className="mt-3 text-base md:text-lg text-muted-foreground">
                Tutaj zamieniamy pomysły z głowy w prawdziwe zabawki, figurki i części — wszystko dzięki magicznej maszynie zwanej drukarką 3D!
              </p>
            </Reveal>
            <Reveal delay={150}>
              <Tilt3D>
                <img src={printer} alt="Drukarka 3D Bambu Lab A1 Mini cartoon" className="w-full max-w-md mx-auto float-y" width={1024} height={1024} />
              </Tilt3D>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4">
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Boxes className="h-7 w-7 text-primary" /> Co to jest drukarka 3D?
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5 mt-5">
          <Reveal delay={100}>
            <Tilt3D>
              <article className="card-pop p-5 h-full bg-sun/30">
                <Wand2 className="h-8 w-8 text-fire mb-2" />
                <h3 className="font-display text-lg font-bold">Magiczny pisak 3D</h3>
                <p className="text-sm mt-2">Wyobraź sobie pisak, który zamiast rysować na kartce — buduje przedmioty w powietrzu! Kładzie cieniutkie nitki kolorowego plastiku jedna na drugiej.</p>
              </article>
            </Tilt3D>
          </Reveal>
          <Reveal delay={200}>
            <Tilt3D>
              <article className="card-pop p-5 h-full bg-sky/30">
                <Boxes className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-display text-lg font-bold">Warstwa po warstwie</h3>
                <p className="text-sm mt-2">Drukarka buduje zabawkę jak tort — układa setki cieniutkich warstw, jedna na drugiej, aż powstanie cały kształt!</p>
              </article>
            </Tilt3D>
          </Reveal>
          <Reveal delay={300}>
            <Tilt3D>
              <article className="card-pop p-5 h-full bg-leaf/30">
                <Cpu className="h-8 w-8 text-leaf mb-2" />
                <h3 className="font-display text-lg font-bold">Bambu Lab A1 Mini</h3>
                <p className="text-sm mt-2">To nasza mała, szybka i mądra drukarka. Sama wie, jak gorący ma być plastik i gdzie go położyć. Drukuje kolorowo i precyzyjnie!</p>
              </article>
            </Tilt3D>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 mt-12">
        <Reveal>
          <div className="rounded-3xl p-6 md:p-8 bg-card border-2 border-border">
            <h2 className="font-display text-2xl font-bold">Jak powstaje zabawka? 🎨</h2>
            <ol className="mt-4 grid md:grid-cols-4 gap-4">
              {[
                { n: 1, t: "Pomysł", d: "Wymyślamy, co chcemy wydrukować — np. dinozaura!" },
                { n: 2, t: "Model 3D", d: "Rysujemy go w komputerze albo pobieramy gotowy." },
                { n: 3, t: "Drukowanie", d: "Drukarka grzeje plastik i układa warstwy." },
                { n: 4, t: "Gotowe!", d: "Po kilku godzinach mamy nową zabawkę." },
              ].map((s, i) => (
                <Reveal key={s.n} delay={i * 100}>
                  <li className="rounded-2xl p-4 bg-background border-2 border-border h-full">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">{s.n}</span>
                    <h3 className="font-display font-bold mt-2">{s.t}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 mt-12 text-center">
        <Reveal>
          <p className="font-display text-xl">Wkrótce więcej projektów 3D do wydruku! 🦖🚀🦄</p>
          <Link to="/eksperymenty" className="btn-rainbow mt-4 inline-flex">Wróć do eksperymentów</Link>
        </Reveal>
      </section>
    </SiteLayout>
  );
}