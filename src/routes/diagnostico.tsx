import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Info, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/cyber/SiteHeader";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, QUESTIONS, RESULT_STORAGE_KEY, calculateResult, type Answers, type StoredResult } from "@/lib/quiz";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/diagnostico")({
  head: () => ({
    meta: [
      { title: "Diagnóstico de segurança digital — CyberCheck" },
      { name: "description", content: "Responda 10 perguntas simples sobre seus hábitos digitais e descubra sua pontuação de segurança." },
      { property: "og:title", content: "Faça o diagnóstico gratuito — CyberCheck" },
      { property: "og:description", content: "10 perguntas, 5 áreas, recomendações práticas para proteger seu negócio." },
    ],
  }),
  component: Diagnostico,
});

function Diagnostico() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);

  const category = CATEGORIES[step] ?? CATEGORIES[0]!;
  const questions = QUESTIONS.filter((q) => q.category === category.id);
  const isLast = step === CATEGORIES.length - 1;
  const progress = Math.round((Object.keys(answers).length / QUESTIONS.length) * 100);

  async function next() {
    if (questions.some((q) => !answers[q.id])) {
      setError(true);
      return;
    }
    setError(false);
    if (!isLast) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setSaving(true);
    const r = calculateResult(answers);
    const id = crypto.randomUUID();
    const { error: dbError } = await supabase.from("diagnostics").insert({
      id,
      total_score: r.total,
      score_senhas: r.categories.senhas,
      score_contas: r.categories.contas,
      score_dispositivos: r.categories.dispositivos,
      score_backup: r.categories.backup,
      score_golpes: r.categories.golpes,
      answers,
    });
    if (dbError) toast.error("Não foi possível registrar o diagnóstico, mas seu resultado está pronto.");
    const stored: StoredResult = { diagnosticId: dbError ? null : id, answers, createdAt: new Date().toISOString() };
    sessionStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(stored));
    navigate({ to: "/resultado" });
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-5 pb-20 pt-4">
        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Etapa {step + 1} de {CATEGORIES.length}</span>
            <span className="text-muted-foreground">{progress}% respondido</span>
          </div>
          <div className="flex gap-1.5" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={5} aria-label="Progresso do diagnóstico">
            {CATEGORIES.map((c, i) => (
              <div key={c.id} className={cn("h-1.5 flex-1 rounded-full transition-colors", i <= step ? "bg-primary" : "bg-muted")} />
            ))}
          </div>
        </div>

        <div key={category.id} className="animate-rise space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">{category.short}</p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{category.title}</h1>
          </div>

          {questions.map((q, qi) => {
            const missing = error && !answers[q.id];
            return (
              <fieldset key={q.id} className={cn("rounded-2xl border bg-card p-5 shadow-card sm:p-6", missing && "border-danger")}>
                <legend className="sr-only">{q.text}</legend>
                <p className="font-display text-lg font-semibold leading-snug" aria-hidden>{qi + 1}. {q.text}</p>
                <p className="mt-1.5 flex items-start gap-1.5 text-sm text-muted-foreground"><Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />{q.help}</p>
                <div className="mt-4 grid gap-2.5">
                  {q.options.map((o) => {
                    const selected = answers[q.id] === o.id;
                    return (
                      <label key={o.id} className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-sm transition-all hover:border-primary/50",
                        selected && "border-primary bg-accent ring-1 ring-primary",
                      )}>
                        <input type="radio" name={q.id} value={o.id} checked={selected} className="size-4 accent-[var(--primary)]"
                          onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.id }))} />
                        <span className="font-medium">{o.label}</span>
                      </label>
                    );
                  })}
                </div>
                {missing && <p className="mt-3 text-sm font-medium text-danger" role="alert">Escolha uma opção para continuar.</p>}
              </fieldset>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          {step === 0 ? (
            <Button asChild variant="ghost"><Link to="/"><ArrowLeft /> Início</Link></Button>
          ) : (
            <Button variant="outline" onClick={() => { setError(false); setStep(step - 1); }} disabled={saving}><ArrowLeft /> Voltar</Button>
          )}
          <Button variant="hero" size="xl" onClick={next} disabled={saving}>
            {saving ? <><Loader2 className="animate-spin" /> Calculando...</> : isLast ? <>Ver resultado <ArrowRight /></> : <>Avançar <ArrowRight /></>}
          </Button>
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">Não pedimos senhas, códigos de verificação, documentos ou dados de clientes.</p>
      </main>
    </div>
  );
}
