import { useEffect, useState } from "react";
import { MessageSquare, Send, User } from "lucide-react";

type Comment = { id: string; name: string; text: string; date: string };

export function Comments({ slug }: { slug: string }) {
  const key = `comments:${slug}`;
  const [items, setItems] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, [key]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const next: Comment[] = [
      { id: crypto.randomUUID(), name: name.trim(), text: text.trim(), date: new Date().toISOString() },
      ...items,
    ];
    setItems(next);
    localStorage.setItem(key, JSON.stringify(next));
    setText("");
  };

  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl font-bold flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-primary" />
        Komentarze małych naukowców ({items.length})
      </h2>

      <form onSubmit={submit} className="mt-5 card-pop p-5 grid gap-3">
        <label className="grid gap-1.5">
          <span className="text-sm font-bold">Twoje imię</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="np. Noe"
            className="rounded-2xl border-2 border-border bg-background px-4 py-2.5 focus:outline-none focus:border-primary"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-sm font-bold">Twój komentarz</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows={3}
            placeholder="Powiedz, jak Ci poszło! 🧪"
            className="rounded-2xl border-2 border-border bg-background px-4 py-2.5 focus:outline-none focus:border-primary resize-none"
          />
        </label>
        <button className="btn-rainbow inline-flex items-center justify-center gap-2 self-start">
          <Send className="h-4 w-4" /> Dodaj komentarz
        </button>
      </form>

      <ul className="mt-6 space-y-3">
        {items.length === 0 && (
          <li className="text-center text-muted-foreground py-6">
            Bądź pierwszą osobą, która podzieli się eksperymentem! ✨
          </li>
        )}
        {items.map((c) => (
          <li key={c.id} className="card-pop p-4 flex gap-3 items-start">
            <div className="h-10 w-10 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <p className="font-display font-bold">{c.name}</p>
                <span className="text-xs text-muted-foreground">
                  {new Date(c.date).toLocaleDateString("pl-PL", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
              <p className="mt-1 text-sm whitespace-pre-wrap break-words">{c.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
