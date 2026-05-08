import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { experiments, type Experiment } from "@/data/experiments";
import { ChevronRight, Lightbulb, PlayCircle, Sparkles } from "lucide-react";
import { ExperimentCard } from "@/components/ExperimentCard";
import { Reveal } from "@/components/Reveal";
import { Comments } from "@/components/Comments";

export const Route = createFileRoute("/eksperymenty/")({
  loader: ({ params }): { exp: Experiment } => {
    const exp = experiments.find((e) => e.slug === params.slug);
    if (!exp) throw notFound();
    return { exp };
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.exp
      ? [
          { title: `${loaderData.exp.title} — Fabryka Eksperymentów Noego` },
          { name: "description", content: loaderData.exp.tagline },
          { property: "og:title", content: loaderData.exp.title },
          { property: "og:description", content: loaderData.exp.tagline },
          { property: "og:image", content: loaderData.exp.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Nie znaleziono eksperymentu</h1>
        <Link to="/eksperymenty" className="btn-rainbow mt-6 inline-block">
          Wróć do eksperymentów
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-destructive">{error.message}</p>
      </div>
    </SiteLayout>
  ),
  component: ExperimentDetail,
});

const accentBg: Record<Experiment["accent"], string> = {
  sun: "bg-sun",
  sky: "bg-sky",
  leaf: "bg-leaf",
  fire: "bg-fire",
  grape: "bg-grape",
};

function ExperimentDetail() {
  const { exp } = Route.useLoaderData() as { exp: Experiment };
  const others = experiments.filter((e) => e.slug !== exp.slug).slice(0, 3);

  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-4 pt-6">
        <nav className="text-sm flex items-center gap-1 text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/eksperymenty" className="hover:text-primary">Eksperymenty</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold">{exp.title}</span>
        </nav>

        {/* HERO BANNER */}
        <Reveal variant="pop">
          <div className={`mt-4 relative rounded-3xl overflow-hidden border-4 border-border ${accentBg[exp.accent]}`}>
            <img
              src={exp.image}
              alt={`Plakat eksperymentu: ${exp.title}`}
              className="w-full aspect-[16/7] object-cover"
              width={1600}
              height={700}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur px-3 py-1.5 text-xs font-bold">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Eksperyment #{exp.number} · {exp.category}
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                {exp.title}
              </h1>
              <p className="mt-1 text-white/95 text-sm md:text-base drop-shadow">{exp.tagline}</p>
            </div>
          </div>
        </Reveal>

        {/* INGREDIENTS */}
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mt-12">Składniki</h2>
        </Reveal>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {exp.ingredients.map((ing, i) => (
            <Reveal key={i} variant="pop" delay={i * 80} className="flex flex-col items-center text-center gap-2">
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-3xl bg-secondary border-2 border-border flex items-center justify-center text-4xl md:text-5xl shadow-md float-y">
                {ing.emoji}
              </div>
              <p className="text-sm font-semibold">{ing.name}</p>
            </Reveal>
          ))}
        </div>

        {/* VIDEO */}
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mt-14">
            Zobacz, jak to zrobić!
          </h2>
        </Reveal>
        <Reveal variant="pop">
          <div className="mt-6 rounded-3xl border-4 border-accent bg-secondary aspect-video overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-sky/30 via-transparent to-grape/30" />
            <img
              src={exp.image}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition"
            />
            <div className="relative h-full w-full flex flex-col items-center justify-center gap-3">
              <button
                className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-2xl"
                aria-label="Odtwórz wideo"
              >
                <PlayCircle className="h-12 w-12 md:h-14 md:w-14" />
              </button>
              <p className="text-sm font-bold text-foreground/90 bg-background/80 backdrop-blur px-3 py-1 rounded-full">
                Wideo wkrótce 🎬
              </p>
            </div>
          </div>
        </Reveal>

        {/* STEPS */}
        <Reveal>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center mt-14">
            Kroki do eksperymentu
          </h2>
        </Reveal>
        <ol className="mt-6 grid sm:grid-cols-2 md:grid-cols-5 gap-5">
          {exp.steps.map((s, i) => (
            <Reveal key={i} variant="pop" delay={i * 100} as="li" className="text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-primary text-primary-foreground font-display text-2xl font-bold flex items-center justify-center shadow-md">
                {i + 1}
              </div>
              <p className="mt-3 text-sm font-semibold leading-snug">{s}</p>
            </Reveal>
          ))}
        </ol>

        {/* WHY */}
        <Reveal variant="left">
          <div className="mt-14 rounded-3xl border-2 border-accent bg-accent/20 p-6 flex gap-4 items-start">
            <div className="shrink-0 h-14 w-14 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center float-y">
              <Lightbulb className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold">Dlaczego to działa?</h3>
              <p className="mt-2 text-sm md:text-base">{exp.why}</p>
            </div>
          </div>
        </Reveal>

        {/* COMMENTS */}
        <Comments slug={exp.slug} />
      </section>

      <section className="mx-auto max-w-7xl px-4 mt-16 pb-12">
        <Reveal>
          <h2 className="font-display text-2xl font-bold mb-5">Inne eksperymenty</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {others.map((e, i) => (
            <Reveal key={e.slug} variant="pop" delay={i * 120}>
              <ExperimentCard exp={e} />
            </Reveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
