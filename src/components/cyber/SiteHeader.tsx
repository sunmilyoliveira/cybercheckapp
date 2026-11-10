import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

export function SiteHeader({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const linkCls = tone === "light" ? "text-navy-muted hover:text-navy-foreground" : "text-muted-foreground hover:text-foreground";
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-5">
      <Logo tone={tone} />
      <nav className="flex items-center gap-5 text-sm font-medium">
        <a href="/#como-funciona" className={`hidden sm:inline ${linkCls}`}>Como funciona</a>
        <Button asChild size="sm" variant={tone === "light" ? "navyOutline" : "outline"} className="rounded-lg">
          <Link to="/diagnostico">Diagnóstico</Link>
        </Button>
      </nav>
    </header>
  );
}
