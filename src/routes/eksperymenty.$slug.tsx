import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { experiments, type Experiment } from "@/data/experiments";
import { ChevronRight, Lightbulb, PlayCircle } from "lucide-react";
import { ExperimentCard } from "@/components/ExperimentCard";

export const Route = createFileRoute("/eksperymenty/$slug")({
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
          { property: "og:image", content: loaderData.exp.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Nie znaleziono eksperymentu</h1>
        <Link to="/eksperymenty" className="btn-rainbow mt-6 inline-block">Wróć do eksperymentów</Link>
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

        <div className="mt-4 rounded-3xl overflow-hidden border-2 border-border">
          <img src={exp.image} alt={`Plakat: ${exp.title}`} className="w-full aspect-[16/9] object-cover" width={1024} height={576} />
        </div>

        <div className="mt-8 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold">{exp.title} – eksperyment {exp.category.toLowerCase() === "chemia" ? "chemiczny" : exp.category.toLowerCase()}!</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">{exp.tagline}</p>
        </div>

        <h2 className="font-display text-2xl font-bold text-center mt-12">Składniki</h2>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {exp.ingredients.map((ing, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              <div className="h-20 w-20 rounded-2xl bg-secondary border-2 border-border flex items-center justify-center text-4xl">{ing.emoji}</div>
              <p className="text-sm font-semibold">{ing.name}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl font-bold text-center mt-12">Zobacz, jak to zrobić!</h2>
        <div className="mt-5 rounded-3xl border-4 border-accent bg-secondary aspect-video flex items-center justify-center">
          <button className="h-20 w-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform shadow-xl" aria-label="Odtwórz wideo">
            <PlayCircle className="h-12 w-12" />
          </button>
        </div>

        <h2 className="font-display text-2xl font-bold text-center mt-12">Kroki do eksperymentu</h2>
        <ol className="mt-5 grid sm:grid-cols-2 md:grid-cols-5 gap-5">
          {exp.steps.map((s, i) => (
            <li key={i} className="text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-primary text-primary-foreground font-display text-2xl font-bold flex items-center justify-center shadow-md">{i + 1}</div>
              <p className="mt-3 text-sm font-semibold leading-snug">{s}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 rounded-3xl border-2 border-accent bg-accent/20 p-6 flex gap-4 items-start">
          <div className="shrink-0 h-14 w-14 rounded-2xl bg-accent text-accent-foreground flex items-center justify-center"><Lightbulb className="h-7 w-7" /></div>
          <div>
            <h3 className="font-display text-xl font-bold">Dlaczego to działa?</h3>
            <p className="mt-2 text-sm md:text-base">{exp.why}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 mt-16">
        <h2 className="font-display text-2xl font-bold mb-5">Inne eksperymenty</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {others.map((e) => <ExperimentCard key={e.slug} exp={e} />)}
        </div>
      </section>
    </SiteLayout>
  );
}
