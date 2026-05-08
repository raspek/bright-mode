import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Mail, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — Fabryka Eksperymentów Noego" },
      { name: "description", content: "Napisz do nas! Pytania, sugestie eksperymentów, współpraca." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold flex items-center justify-center gap-3"><MessageCircle className="h-9 w-9 text-primary" /> Napisz do Noego!</h1>
          <p className="text-muted-foreground mt-3">Masz pomysł na eksperyment? Pytanie? Pochwal się swoim odkryciem!</p>
        </div>

        {sent ? (
          <div className="mt-10 card-pop p-8 text-center">
            <p className="font-display text-2xl font-bold">Wiadomość wysłana! 🚀</p>
            <p className="text-muted-foreground mt-2">Odpowiemy najszybciej, jak to możliwe.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="mt-10 card-pop p-6 md:p-8 grid gap-4"
          >
            <label className="grid gap-1.5">
              <span className="text-sm font-bold">Twoje imię</span>
              <input required className="rounded-2xl border-2 border-border bg-background px-4 py-3 focus:outline-none focus:border-primary" />
            </label>
            <label className="grid gap-1.5">
              <span className="text-sm font-bold">E-mail</span>
              <input required type="email" className="rounded-2xl border-2 border-border bg-background px-4 py-3 focus:outline-none focus:border-primary" />
            </label>
            <label className="grid gap-1.5">
              <span className="text-sm font-bold">Wiadomość</span>
              <textarea required rows={5} className="rounded-2xl border-2 border-border bg-background px-4 py-3 focus:outline-none focus:border-primary resize-none" />
            </label>
            <button className="btn-rainbow inline-flex items-center justify-center gap-2 self-start">
              <Send className="h-4 w-4" /> Wyślij wiadomość
            </button>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Mail className="h-3 w-3" /> lub napisz na: kontakt@fabryka-noego.pl</p>
          </form>
        )}
      </section>
    </SiteLayout>
  );
}
