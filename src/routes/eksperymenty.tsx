import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ExperimentCard } from "@/components/ExperimentCard";
import { experiments } from "@/data/experiments";

export const Route = createFileRoute("/eksperymenty")({
  head: () => ({
    meta: [
      { title: "Eksperymenty — Fabryka Eksperymentów Noego" },
      { name: "description", content: "Wszystkie domowe eksperymenty naukowe dla dzieci: chemia, fizyka, woda, kosmos i więcej." },
    ],
  }),
  component: ExperimentsPage,
});

function ExperimentsPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold">Wszystkie eksperymenty</h1>
        <p className="text-muted-foreground mt-2">Wybierz swój naukowy quest na dziś!</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {experiments.map((e) => <ExperimentCard key={e.slug} exp={e} />)}
        </div>
      </section>
    </SiteLayout>
  );
}
