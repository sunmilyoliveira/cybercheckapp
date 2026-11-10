import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ClipboardCheck, KeyRound, Lightbulb, LockKeyhole, ScanSearch, ShieldAlert, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/cyber/SiteHeader";
import { SiteFooter } from "@/components/cyber/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CyberCheck — Diagnóstico de segurança digital para MEIs" },
      { name: "description", content: "Diagnóstico gratuito e educativo de segurança digital para MEIs e pequenos empreendedores que usam WhatsApp, Instagram e e-mail." },
      { property: "og:title", content: "CyberCheck — Seu negócio também precisa de proteção digital" },
      { property: "og:description", content: "Descubra hábitos digitais de risco e receba recomendações práticas em poucos minutos." },
    ],
  }),
  component: Home,
});

const benefits = [
  { icon: ScanSearch, title: "Identifique hábitos digitais de risco", text: "Descubra quais costumes do dia a dia podem deixar suas contas vulneráveis." },
  { icon: Lightbulb, title: "Receba recomendações práticas", text: "Dicas simples e diretas, sem termos complicados, para aplicar hoje." },
  { icon: LockKeyhole, title: "Aprenda a proteger suas contas", text: "Proteja WhatsApp, Instagram, e-mail e as informações dos seus clientes." },
];
const steps = [
  { n: "1", title: "Responda 10 perguntas", text: "Perguntas de múltipla escolha sobre seus hábitos. Leva cerca de 3 minutos." },
  { n: "2", title: "Veja sua pontuação", text: "Receba uma nota de 0 a 100 e o resultado em cada uma das 5 áreas." },
  { n: "3", title: "Aplique as recomendações", text: "Siga as dicas priorizadas para fortalecer a segurança do seu negócio." },
];

function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-hero text-navy-foreground">
        <div className="pointer-events-none absolute inset-0 grid-lines" aria-hidden />
        <div className="relative">
          <SiteHeader tone="light" />
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-10 md:grid-cols-[1.15fr_1fr] md:pb-28 md:pt-16">
            <div className="animate-rise space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/15 bg-navy-foreground/5 px-3 py-1 text-xs font-medium text-navy-muted">
                <span className="size-1.5 rounded-full bg-electric" /> Gratuito · Sem cadastro · Educativo
              </span>
              <h1 className="text-4xl font-bold leading-[1.08] sm:text-5xl md:text-6xl">
                Seu negócio também precisa de <span className="text-electric">proteção digital.</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-navy-muted">
                O CyberCheck ajuda MEIs, autônomos e pequenos empreendedores a identificar riscos no uso do WhatsApp, Instagram e e-mail — e mostra como se proteger.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="hero" size="xl">
                  <Link to="/diagnostico">Fazer diagnóstico gratuito <ArrowRight /></Link>
                </Button>
                <Button asChild variant="navyOutline" size="xl">
                  <a href="#como-funciona">Como funciona</a>
                </Button>
              </div>
            </div>
            <HeroCard />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Por que proteger seu negócio?</p>
          <h2 className="text-3xl font-bold sm:text-4xl">Golpes digitais atingem quem vende pelo celular todos os dias.</h2>
          <p className="text-muted-foreground">Uma conta invadida pode significar clientes enganados, vendas perdidas e prejuízo à sua reputação. Pequenos cuidados fazem muita diferença.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {benefits.map((b) => (
            <article key={b.title} className="rounded-2xl border bg-card p-6 shadow-card transition-transform hover:-translate-y-1">
              <span className="grid size-11 place-items-center rounded-xl bg-accent text-primary"><b.icon className="size-5" aria-hidden /></span>
              <h3 className="mt-4 text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="como-funciona" className="scroll-mt-6 border-y bg-card">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Como funciona</p>
            <h2 className="text-3xl font-bold sm:text-4xl">Diagnóstico em três etapas</h2>
          </div>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} className="relative rounded-2xl border bg-background p-6">
                <span className="font-display text-5xl font-bold text-primary/15">{s.n}</span>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-hero px-6 py-14 text-center text-navy-foreground sm:px-12">
          <div className="pointer-events-none absolute inset-0 grid-lines" aria-hidden />
          <div className="relative mx-auto max-w-2xl space-y-5">
            <ClipboardCheck className="mx-auto size-10 text-electric" aria-hidden />
            <h2 className="text-3xl font-bold sm:text-4xl">Quanto o seu negócio está protegido?</h2>
            <p className="text-navy-muted">Descubra em poucos minutos. Não pedimos senhas, códigos ou dados de clientes.</p>
            <Button asChild variant="hero" size="xl"><Link to="/diagnostico">Começar agora <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function HeroCard() {
  const items = [
    { icon: KeyRound, label: "Senhas e autenticação" },
    { icon: ShieldAlert, label: "Prevenção contra golpes" },
    { icon: Smartphone, label: "Dispositivos" },
  ];
  return (
    <div className="animate-rise rounded-3xl border border-navy-foreground/10 bg-navy-foreground/5 p-6 backdrop-blur [animation-delay:120ms]">
      <p className="text-sm text-navy-muted">O diagnóstico avalia</p>
      <ul className="mt-4 space-y-3">
        {items.map((i) => (
          <li key={i.label} className="flex items-center gap-3 rounded-xl bg-navy-foreground/5 p-3">
            <span className="grid size-9 place-items-center rounded-lg bg-primary/25 text-electric"><i.icon className="size-4" aria-hidden /></span>
            <span className="text-sm font-medium">{i.label}</span>
          </li>
        ))}
        <li className="px-3 text-xs text-navy-muted">+ Proteção de contas e Backup</li>
      </ul>
    </div>
  );
}
