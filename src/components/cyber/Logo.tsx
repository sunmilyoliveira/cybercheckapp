import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="CyberCheck — página inicial">
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow">
        <ShieldCheck className="size-5" aria-hidden />
      </span>
      <span className={cn("font-display text-lg font-bold tracking-tight", tone === "light" ? "text-navy-foreground" : "text-foreground")}>
        Cyber<span className="text-electric">Check</span>
      </span>
    </Link>
  );
}
