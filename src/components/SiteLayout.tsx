import { Link } from "@tanstack/react-router";
import { Beaker, Rocket, Mail, Menu, Moon, Sun, BookOpen, Sparkles, Facebook, Instagram, Youtube } from "lucide-react";
import { type ReactNode, useState } from "react";
import logo from "@/assets/logo.png";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { to: "/eksperymenty", label: "Eksperymenty", icon: Beaker },
  { to: "/baza-wiedzy", label: "Baza Wiedzy", icon: BookOpen },
  { to: "/zasil", label: "Zasil Laboratorium", icon: Rocket },
  { to: "/kontakt", label: "Kontakt", icon: Mail },
] as const;

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Przełącz motyw"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground border-2 border-border hover:scale-110 transition-transform"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b-2 border-border">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo Fabryka Eksperymentów Noego" className="h-12 w-12 rounded-xl object-contain" width={48} height={48} />
            <span className="font-display text-base sm:text-lg font-bold leading-tight">
              Fabryka<br />Eksperymentów <span className="text-primary">Noego</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                activeProps={{ className: "bg-primary text-primary-foreground" }}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold hover:bg-secondary transition-colors"
              >
                <Icon className="h-4 w-4" /> {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setOpen((o) => !o)} className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary border-2 border-border" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        {open && (
          <nav className="md:hidden border-t-2 border-border bg-background px-4 py-3 flex flex-col gap-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} onClick={() => setOpen(false)} className="inline-flex items-center gap-2 rounded-xl px-3 py-2 font-semibold hover:bg-secondary">
                <Icon className="h-4 w-4" /> {label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-16 border-t-2 border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 grid gap-8 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <img src={logo} alt="" className="h-14 w-14 rounded-xl object-contain" width={56} height={56} />
            <div>
              <p className="font-display font-bold">Fabryka Eksperymentów Noego</p>
              <p className="text-sm text-muted-foreground mt-1">Nauka przez zabawę dla małych odkrywców.</p>
            </div>
          </div>
          <div>
            <p className="font-display font-bold mb-2 flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent" /> Odkrywaj</p>
            <ul className="space-y-1 text-sm">
              {navItems.map((i) => (
                <li key={i.to}><Link to={i.to} className="hover:text-primary">{i.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-display font-bold mb-2">Znajdź nas</p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-secondary border-2 border-border hover:bg-primary hover:text-primary-foreground transition"><Facebook className="h-5 w-5" /></a>
              <a href="#" aria-label="Instagram" className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-secondary border-2 border-border hover:bg-primary hover:text-primary-foreground transition"><Instagram className="h-5 w-5" /></a>
              <a href="#" aria-label="YouTube" className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-secondary border-2 border-border hover:bg-primary hover:text-primary-foreground transition"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground pb-6">© 2026 Fabryka Eksperymentów Noego. Nauka przez zabawę! ❤️</p>
      </footer>
    </div>
  );
}