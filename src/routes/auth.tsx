import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/cyber/Logo";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acesso administrativo — CyberCheck" },
      { name: "description", content: "Entrada restrita à equipe administrativa do CyberCheck." },
      { property: "og:title", content: "Acesso administrativo — CyberCheck" },
      { property: "og:description", content: "Área restrita da equipe CyberCheck." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (error) return setError("E-mail ou senha incorretos.");
    toast.success("Bem-vindo(a) de volta!");
    navigate({ to: "/admin" });
  }

  return (
    <div className="grid min-h-screen place-items-center bg-hero px-5 py-10">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex justify-center"><Logo tone="light" /></div>
        <form onSubmit={submit} className="space-y-4 rounded-3xl border bg-card p-7 shadow-card">
          <div className="space-y-1 text-center">
            <LockKeyhole className="mx-auto size-8 text-primary" />
            <h1 className="text-xl font-bold">Área administrativa</h1>
            <p className="text-sm text-muted-foreground">Acesso restrito à equipe CyberCheck.</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-sm font-medium text-danger" role="alert">{error}</p>}
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? <><Loader2 className="animate-spin" /> Entrando...</> : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
