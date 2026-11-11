import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, ClipboardList, FileText, ListChecks, Loader2, RotateCcw, Target, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SiteHeader } from "@/components/cyber/SiteHeader";
import { SiteFooter } from "@/components/cyber/SiteFooter";
import { ScoreBar, ScoreRing, levelSoft } from "@/components/cyber/ScoreRing";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, RESULT_STORAGE_KEY, calculateResult, classify, type Result, type StoredResult } from "@/lib/quiz";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resultado")({
  head: () => ({
    meta: [
      { title: "Seu resultado — CyberCheck" },
      { name: "description", content: "Veja sua pontuação de segurança digital, o resultado por área e recomendações práticas." },
      { property: "og:title", content: "Resultado do diagnóstico — CyberCheck" },
      { property: "og:description", content: "Pontuação de 0 a 100 e recomendações práticas para o seu negócio." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Resultado,
});

function Resultado() {
  const [data, setData] = useState<{ stored: StoredResult; result: Result } | null | undefined>(undefined);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(RESULT_STORAGE_KEY);
      if (!raw) return setData(null);
      const stored = JSON.parse(raw) as StoredResult;
      setData({ stored, result: calculateResult(stored.answers) });
    } catch {
      setData(null);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 pb-20 pt-4">
        {data === undefined && <div className="grid place-items-center py-32"><Loader2 className="size-6 animate-spin text-primary" /></div>}
        {data === null && <EmptyResult />}
        {data && <ResultView result={data.result} diagnosticId={data.stored.diagnosticId} />}
      </main>
      <SiteFooter />
    </div>
  );
}

function EmptyResult() {
  return (
    <div className="mx-auto max-w-md rounded-3xl border bg-card p-10 text-center shadow-card">
      <ClipboardList className="mx-auto size-10 text-primary" />
      <h1 className="mt-4 text-2xl font-bold">Nenhum resultado por aqui</h1>
      <p className="mt-2 text-muted-foreground">Faça o diagnóstico para ver sua pontuação e recomendações.</p>
      <Button asChild variant="hero" size="xl" className="mt-6"><Link to="/diagnostico">Fazer diagnóstico</Link></Button>
    </div>
  );
}

function ResultView({ result, diagnosticId }: { result: Result; diagnosticId: string | null }) {
  const cls = classify(result.total);
  return (
    <div className="animate-rise space-y-8">
      <section className="grid items-center gap-8 rounded-3xl border bg-card p-6 shadow-card sm:p-10 md:grid-cols-[auto_1fr]">
        <div className="mx-auto"><ScoreRing score={result.total} /></div>
        <div className="space-y-3 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Seu resultado</p>
          <span className={cn("inline-block rounded-full px-3 py-1 text-sm font-semibold", levelSoft[cls.level])}>{cls.label}</span>
          <h1 className="text-2xl font-bold sm:text-3xl">
            {cls.level === "boa" ? "Você já adota bons hábitos de segurança." : cls.level === "intermediaria" ? "Você está no caminho, mas há pontos a reforçar." : "Seu negócio precisa de atenção à segurança digital."}
          </h1>
          <p className="text-muted-foreground">Veja abaixo seu resultado em cada área e as recomendações práticas baseadas nas suas respostas.</p>
        </div>
      </section>

      <section className="rounded-3xl border bg-card p-6 shadow-card sm:p-8">
        <h2 className="text-xl font-bold">Resultado por área</h2>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2">
          {CATEGORIES.map((c) => {
            const s = result.categories[c.id];
            return (
              <li key={c.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm"><span className="font-medium">{c.title}</span><span className="font-semibold">{s}</span></div>
                <ScoreBar score={s} />
              </li>
            );
          })}
        </ul>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-3xl border bg-card p-6 shadow-card">
          <h2 className="flex items-center gap-2 text-xl font-bold"><CheckCircle2 className="size-5 text-success" /> Pontos positivos</h2>
          {result.positives.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Ainda não identificamos práticas completas. Tudo bem — as recomendações ao lado ajudam você a começar.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {result.positives.map((p) => (
                <li key={p} className="flex gap-2.5 rounded-xl bg-success-soft p-3 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />{p}</li>
              ))}
            </ul>
          )}
        </section>
        <section className="rounded-3xl border bg-card p-6 shadow-card">
          <h2 className="flex items-center gap-2 text-xl font-bold"><AlertTriangle className="size-5 text-warning" /> O que melhorar</h2>
          {result.improvements.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Nenhum ponto crítico encontrado. Continue revisando suas contas periodicamente.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {result.improvements.map((i) => (
                <li key={i.text} className={cn("rounded-xl p-3 text-sm", i.priority === "alta" ? "bg-danger-soft" : "bg-warning-soft")}>
                  <span className={cn("mb-1 block text-xs font-semibold uppercase", i.priority === "alta" ? "text-danger" : "text-warning")}>
                    {i.priority === "alta" ? "Prioridade alta" : "Recomendado"} · {CATEGORIES.find((c) => c.id === i.category)?.short}
                  </span>
                  {i.text}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <AdvancedReport diagnosticId={diagnosticId} score={result.total} />

      <p className="rounded-2xl border border-dashed p-4 text-center text-sm text-muted-foreground">
        Este diagnóstico possui finalidade exclusivamente educativa. Não representa auditoria técnica, teste de invasão, certificação ou garantia de segurança.
      </p>
      <div className="text-center">
        <Button asChild variant="outline"><Link to="/diagnostico"><RotateCcw /> Refazer diagnóstico</Link></Button>
      </div>
    </div>
  );
}

function AdvancedReport({ diagnosticId, score }: { diagnosticId: string | null; score: number }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot: invisível para pessoas
  const openedAt = useRef(0);
  const features = [
    { icon: FileText, t: "Análise organizada dos resultados" },
    { icon: Target, t: "Recomendações prioritárias" },
    { icon: ListChecks, t: "Checklist de boas práticas" },
    { icon: TrendingUp, t: "Plano de ação sugerido" },
  ];

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (saving || done) return undefined;
    // Robôs costumam preencher o campo oculto ou enviar instantaneamente.
    if (website.trim() !== "" || Date.now() - openedAt.current < 1500) {
      setDone(true);
      return undefined;
    }
    const digits = phone.replace(/\D/g, "");
    const errs: typeof errors = {};
    if (name.trim().length < 2) errs.name = "Informe seu nome.";
    if (digits.length < 10 || digits.length > 11) errs.phone = "Informe um WhatsApp com DDD (10 ou 11 dígitos).";
    setErrors(errs);
    if (Object.keys(errs).length) return undefined;
    setSaving(true);
    const { error } = await supabase.from("interest_requests").insert({
      name: name.trim().slice(0, 80), whatsapp: digits, diagnostic_id: diagnosticId, total_score: score,
    });
    setSaving(false);
    if (error) { toast.error("Não foi possível registrar seu interesse. Tente novamente."); return; }
    setDone(true);
    toast.success("Interesse registrado!");
  }

  return (
    <section className="relative overflow-hidden rounded-3xl bg-hero p-6 text-navy-foreground sm:p-10">
      <div className="pointer-events-none absolute inset-0 grid-lines" aria-hidden />
      <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div className="space-y-4">
          <span className="inline-block rounded-full bg-warning/20 px-3 py-1 text-xs font-semibold text-warning">Oferta experimental</span>
          <h2 className="text-2xl font-bold sm:text-3xl">Relatório CyberCheck Avançado</h2>
          <p className="font-display text-3xl font-bold text-electric">R$ 29,90</p>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {features.map((f) => <li key={f.t} className="flex items-center gap-2 text-sm"><f.icon className="size-4 text-electric" />{f.t}</li>)}
          </ul>
        </div>
        <div className="space-y-3 rounded-2xl border border-navy-foreground/10 bg-navy-foreground/5 p-5">
          <p className="text-sm text-navy-muted">Esta é uma oferta em teste. Nenhum pagamento é feito agora: ao demonstrar interesse, nossa equipe entra em contato pelo WhatsApp.</p>
          <Button variant="hero" size="xl" className="w-full" onClick={() => { openedAt.current = Date.now(); setOpen(true); }} disabled={done}>
            {done ? <><CheckCircle2 /> Interesse registrado</> : "Tenho interesse"}
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          {done ? (
            <div className="space-y-3 py-4 text-center">
              <CheckCircle2 className="mx-auto size-12 text-success" />
              <DialogTitle className="text-xl">Recebemos seu interesse!</DialogTitle>
              <DialogDescription>Entraremos em contato pelo WhatsApp informado. Fique atento: nunca pediremos senhas ou códigos.</DialogDescription>
              <Button onClick={() => setOpen(false)} className="mt-2">Fechar</Button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4" noValidate>
              <DialogHeader>
                <DialogTitle>Tenho interesse no Relatório Avançado</DialogTitle>
                <DialogDescription>Informe como podemos falar com você. Oferta experimental, sem cobrança automática.</DialogDescription>
              </DialogHeader>
              <div className="space-y-1.5">
                <Label htmlFor="name">Seu nome</Label>
                <Input id="name" value={name} maxLength={80} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} />
                {errors.name && <p className="text-sm text-danger">{errors.name}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">WhatsApp com DDD</Label>
                <Input id="phone" inputMode="tel" placeholder="(92) 99999-9999" value={phone} maxLength={20} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!errors.phone} />
                {errors.phone && <p className="text-sm text-danger">{errors.phone}</p>}
              </div>
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="cc_website">Não preencha este campo</label>
                <input id="cc_website" name="cc_website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>
              <p className="text-xs text-muted-foreground">Usaremos esses dados apenas para entrar em contato sobre o relatório.</p>
              <Button type="submit" className="w-full" size="lg" disabled={saving}>
                {saving ? <><Loader2 className="animate-spin" /> Enviando...</> : "Enviar"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
