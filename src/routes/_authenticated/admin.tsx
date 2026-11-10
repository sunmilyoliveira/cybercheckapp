import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Activity, Inbox, Loader2, LogOut, MessageCircle, ShieldOff, Users } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/cyber/Logo";
import { ScoreBar, levelSoft } from "@/components/cyber/ScoreRing";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, classify, type CategoryId } from "@/lib/quiz";
import { cn } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";

type Status = Database["public"]["Enums"]["interest_status"];
const STATUS: Record<Status, string> = { novo: "Novo", em_contato: "Em contato", concluido: "Concluído" };
const statusCls: Record<Status, string> = { novo: "bg-accent text-primary", em_contato: "bg-warning-soft text-warning", concluido: "bg-success-soft text-success" };

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Painel administrativo — CyberCheck" },
      { name: "description", content: "Painel interno de diagnósticos e solicitações do CyberCheck." },
      { property: "og:title", content: "Painel administrativo — CyberCheck" },
      { property: "og:description", content: "Painel interno do CyberCheck." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const fmt = (d: string) => new Date(d).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });

function AdminPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const role = useQuery({
    queryKey: ["is-admin", user.id],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      if (error) throw error;
      return !!data;
    },
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-navy">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Logo tone="light" />
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-navy-muted sm:inline">{user.email}</span>
            <Button variant="navyOutline" size="sm" onClick={signOut}><LogOut /> Sair</Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">
        {role.isLoading && <Loading />}
        {role.isError && <p className="text-danger">Não foi possível verificar suas permissões.</p>}
        {role.data === false && (
          <div className="mx-auto max-w-md rounded-3xl border bg-card p-10 text-center shadow-card">
            <ShieldOff className="mx-auto size-10 text-danger" />
            <h1 className="mt-4 text-xl font-bold">Acesso não autorizado</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sua conta não tem permissão de administrador.</p>
          </div>
        )}
        {role.data === true && <Dashboard />}
      </main>
    </div>
  );
}

function Loading() {
  return <div className="grid place-items-center py-24"><Loader2 className="size-6 animate-spin text-primary" /></div>;
}

function Dashboard() {
  const qc = useQueryClient();
  const diags = useQuery({
    queryKey: ["admin-diagnostics"],
    queryFn: async () => {
      const { data, error } = await supabase.from("diagnostics")
        .select("id,total_score,score_senhas,score_contas,score_dispositivos,score_backup,score_golpes,created_at")
        .order("created_at", { ascending: false }).limit(1000);
      if (error) throw error;
      return data;
    },
  });
  const leads = useQuery({
    queryKey: ["admin-interest"],
    queryFn: async () => {
      const { data, error } = await supabase.from("interest_requests").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  async function setStatus(id: string, status: Status) {
    const { error } = await supabase.from("interest_requests").update({ status }).eq("id", id);
    if (error) return toast.error("Não foi possível atualizar o status.");
    toast.success("Status atualizado.");
    qc.invalidateQueries({ queryKey: ["admin-interest"] });
  }

  if (diags.isLoading || leads.isLoading) return <Loading />;
  if (diags.isError || leads.isError) return <p className="text-danger">Erro ao carregar os dados.</p>;
  const d = diags.data ?? [];
  const l = leads.data ?? [];
  const avg = (k: keyof (typeof d)[number]) => (d.length ? Math.round(d.reduce((a, r) => a + (r[k] as number), 0) / d.length) : 0);
  const catKey: Record<CategoryId, keyof (typeof d)[number]> = { senhas: "score_senhas", contas: "score_contas", dispositivos: "score_dispositivos", backup: "score_backup", golpes: "score_golpes" };
  const totalAvg = avg("total_score");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Painel administrativo</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat icon={Activity} label="Diagnósticos realizados" value={d.length} />
        <Stat icon={Users} label="Pontuação média" value={d.length ? totalAvg : "—"} sub={d.length ? classify(totalAvg).label : "Sem dados"} />
        <Stat icon={Inbox} label="Interessados no relatório" value={l.length} sub={`${l.filter((x) => x.status === "novo").length} novos`} />
      </div>

      <section className="rounded-2xl border bg-card p-6 shadow-card">
        <h2 className="text-lg font-bold">Média por categoria</h2>
        {d.length === 0 ? <Empty text="Nenhum diagnóstico realizado ainda." /> : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES.map((c) => {
              const s = avg(catKey[c.id]);
              return <li key={c.id} className="space-y-2"><div className="flex justify-between text-sm"><span>{c.short}</span><b>{s}</b></div><ScoreBar score={s} /></li>;
            })}
          </ul>
        )}
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-card">
        <h2 className="text-lg font-bold">Solicitações do Relatório Avançado</h2>
        {l.length === 0 ? <Empty text="Nenhuma solicitação de interesse ainda." /> : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="text-left text-muted-foreground"><tr className="border-b"><th className="py-2 pr-3">Data</th><th className="pr-3">Nome</th><th className="pr-3">WhatsApp</th><th className="pr-3">Pontuação</th><th className="pr-3">Status</th><th /></tr></thead>
              <tbody>
                {l.map((r) => (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="py-3 pr-3 whitespace-nowrap">{fmt(r.created_at)}</td>
                    <td className="pr-3 font-medium">{r.name}</td>
                    <td className="pr-3 whitespace-nowrap">{r.whatsapp}</td>
                    <td className="pr-3">{r.total_score ?? "—"}</td>
                    <td className="pr-3">
                      <select value={r.status} onChange={(e) => setStatus(r.id, e.target.value as Status)} aria-label={`Status de ${r.name}`}
                        className={cn("rounded-lg border-0 px-2 py-1 text-xs font-semibold", statusCls[r.status])}>
                        {Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                      </select>
                    </td>
                    <td className="text-right">
                      <Button asChild size="sm" variant="outline">
                        <a href={`https://wa.me/55${r.whatsapp}`} target="_blank" rel="noopener noreferrer"><MessageCircle /> WhatsApp</a>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-card">
        <h2 className="text-lg font-bold">Diagnósticos recentes</h2>
        {d.length === 0 ? <Empty text="Os diagnósticos aparecerão aqui assim que forem realizados." /> : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="text-left text-muted-foreground"><tr className="border-b"><th className="py-2 pr-3">Data</th><th className="pr-3">Total</th><th className="pr-3">Classificação</th>{CATEGORIES.map((c) => <th key={c.id} className="pr-3">{c.short}</th>)}</tr></thead>
              <tbody>
                {d.slice(0, 50).map((r) => {
                  const cl = classify(r.total_score);
                  return (
                    <tr key={r.id} className="border-b last:border-0">
                      <td className="py-3 pr-3 whitespace-nowrap">{fmt(r.created_at)}</td>
                      <td className="pr-3 font-bold">{r.total_score}</td>
                      <td className="pr-3"><span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap", levelSoft[cl.level])}>{cl.label}</span></td>
                      {CATEGORIES.map((c) => <td key={c.id} className="pr-3">{r[catKey[c.id]] as number}</td>)}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ icon: Icon, label, value, sub }: { icon: typeof Activity; label: string; value: number | string; sub?: string }) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-card">
      <div className="flex items-center gap-2 text-sm text-muted-foreground"><Icon className="size-4 text-primary" />{label}</div>
      <div className="mt-2 font-display text-3xl font-bold">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <div className="mt-4 rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">{text}</div>;
}
