export type CategoryId = "senhas" | "contas" | "dispositivos" | "backup" | "golpes";

export interface Option { id: string; label: string; points: 0 | 50 | 100 }
export interface Question {
  id: string;
  category: CategoryId;
  text: string;
  help: string;
  options: Option[];
  /** Positive feedback when answered with full points */
  positive: string;
  /** Recommendation when not answered with full points */
  recommendation: string;
}
export interface Category { id: CategoryId; title: string; short: string }

export const CATEGORIES: Category[] = [
  { id: "senhas", title: "Senhas e autenticação", short: "Senhas" },
  { id: "contas", title: "Proteção de contas", short: "Contas" },
  { id: "dispositivos", title: "Dispositivos", short: "Dispositivos" },
  { id: "backup", title: "Backup e informações", short: "Backup" },
  { id: "golpes", title: "Prevenção contra golpes", short: "Golpes" },
];

export const QUESTIONS: Question[] = [
  {
    id: "senhas_diferentes", category: "senhas",
    text: "Você utiliza senhas diferentes para suas contas?",
    help: "Ex.: WhatsApp, Instagram, e-mail e banco com senhas distintas.",
    options: [
      { id: "sim", label: "Sim, cada conta tem uma senha diferente", points: 100 },
      { id: "algumas", label: "Em algumas contas repito a mesma senha", points: 50 },
      { id: "nao", label: "Não, uso a mesma senha em quase tudo", points: 0 },
    ],
    positive: "Você usa senhas diferentes, o que impede que um vazamento afete todas as contas.",
    recommendation: "Crie senhas diferentes para cada conta importante. Um gerenciador de senhas (aplicativo que guarda senhas com segurança) facilita isso.",
  },
  {
    id: "dois_fatores", category: "senhas",
    text: "Ativou a autenticação em dois fatores nas contas importantes?",
    help: "É a confirmação extra, como um código no celular, além da senha.",
    options: [
      { id: "todas", label: "Sim, em todas as contas importantes", points: 100 },
      { id: "algumas", label: "Em algumas contas", points: 50 },
      { id: "nao", label: "Não ativei / não sei o que é", points: 0 },
    ],
    positive: "A verificação em duas etapas está ativa nas suas contas importantes.",
    recommendation: "Ative a verificação em duas etapas no WhatsApp (Configurações > Conta), Instagram e e-mail. Ela bloqueia invasores mesmo que descubram sua senha.",
  },
  {
    id: "recuperacao", category: "contas",
    text: "Suas contas comerciais possuem métodos de recuperação atualizados?",
    help: "E-mail e telefone de recuperação que você ainda usa.",
    options: [
      { id: "sim", label: "Sim, estão atualizados", points: 100 },
      { id: "nao_sei", label: "Não tenho certeza", points: 50 },
      { id: "nao", label: "Não, estão desatualizados", points: 0 },
    ],
    positive: "Seus métodos de recuperação estão atualizados, facilitando recuperar o acesso.",
    recommendation: "Revise o e-mail e o telefone de recuperação das contas do negócio. Sem eles, recuperar uma conta invadida fica muito mais difícil.",
  },
  {
    id: "controle_acesso", category: "contas",
    text: "Você controla quem tem acesso às contas do negócio?",
    help: "Funcionários, parceiros ou ex-colaboradores com login.",
    options: [
      { id: "sim", label: "Sim, sei exatamente quem tem acesso", points: 100 },
      { id: "parcial", label: "Mais ou menos, nunca revisei", points: 50 },
      { id: "nao", label: "Não, várias pessoas usam a mesma senha", points: 0 },
    ],
    positive: "Você mantém controle sobre quem acessa as contas do negócio.",
    recommendation: "Liste quem tem acesso às contas e remova quem não precisa mais. Prefira dar acessos individuais (como colaboradores no Instagram) em vez de compartilhar a senha.",
  },
  {
    id: "bloqueio_celular", category: "dispositivos",
    text: "Seu celular possui bloqueio por senha, biometria ou outro método seguro?",
    help: "Senha, digital, reconhecimento facial ou padrão.",
    options: [
      { id: "sim", label: "Sim, com senha forte ou biometria", points: 100 },
      { id: "simples", label: "Sim, mas com padrão ou senha simples", points: 50 },
      { id: "nao", label: "Não uso bloqueio", points: 0 },
    ],
    positive: "Seu celular está protegido com bloqueio seguro.",
    recommendation: "Ative o bloqueio de tela com biometria ou uma senha de 6 dígitos ou mais. Em caso de perda ou roubo, isso protege suas conversas e clientes.",
  },
  {
    id: "atualizacoes", category: "dispositivos",
    text: "Você mantém o sistema e os aplicativos atualizados?",
    help: "Atualizações corrigem falhas de segurança.",
    options: [
      { id: "sempre", label: "Sim, atualizo sempre ou automaticamente", points: 100 },
      { id: "as_vezes", label: "Às vezes, quando lembro", points: 50 },
      { id: "nunca", label: "Raramente ou nunca", points: 0 },
    ],
    positive: "Você mantém sistema e aplicativos atualizados.",
    recommendation: "Ative as atualizações automáticas do celular e da loja de aplicativos. Elas corrigem falhas usadas por golpistas.",
  },
  {
    id: "copias", category: "backup",
    text: "Você possui cópias de segurança das informações importantes do negócio?",
    help: "Backup de conversas, fotos de produtos, planilhas e contatos.",
    options: [
      { id: "automatico", label: "Sim, com backup automático", points: 100 },
      { id: "manual", label: "Faço de vez em quando, manualmente", points: 50 },
      { id: "nao", label: "Não faço backup", points: 0 },
    ],
    positive: "Você faz cópias de segurança das informações do negócio.",
    recommendation: "Ative o backup automático do WhatsApp (Google Drive ou iCloud) e guarde arquivos importantes na nuvem. Assim você não perde tudo se o celular quebrar.",
  },
  {
    id: "armazenamento", category: "backup",
    text: "Como costuma armazenar informações comerciais e de clientes?",
    help: "Pedidos, endereços, contatos e valores.",
    options: [
      { id: "organizado", label: "Em sistema ou nuvem com senha e acesso restrito", points: 100 },
      { id: "celular", label: "Só no celular ou em papel", points: 50 },
      { id: "espalhado", label: "Espalhado em conversas, prints e grupos", points: 0 },
    ],
    positive: "Você guarda as informações de clientes de forma organizada e protegida.",
    recommendation: "Centralize os dados de clientes em uma planilha ou sistema protegido por senha, compartilhando apenas com quem precisa. Evite deixar dados em prints e grupos.",
  },
  {
    id: "phishing", category: "golpes",
    text: "Você sabe identificar mensagens suspeitas e tentativas de phishing?",
    help: "Phishing é quando golpistas se passam por empresas ou pessoas para roubar dados.",
    options: [
      { id: "sim", label: "Sim, sei reconhecer os sinais", points: 100 },
      { id: "mais_ou_menos", label: "Às vezes tenho dúvida", points: 50 },
      { id: "nao", label: "Não sei identificar", points: 0 },
    ],
    positive: "Você reconhece mensagens suspeitas e tentativas de golpe.",
    recommendation: "Desconfie de mensagens com urgência, links encurtados, prêmios ou pedidos de código. Nunca informe o código de verificação do WhatsApp a ninguém.",
  },
  {
    id: "confere_identidade", category: "golpes",
    text: "Confere a identidade de pessoas antes de realizar transferências ou compartilhar informações?",
    help: "Ex.: ligar para confirmar um pedido de Pix de um \"parente\" ou fornecedor.",
    options: [
      { id: "sempre", label: "Sempre confirmo por outro canal", points: 100 },
      { id: "as_vezes", label: "Às vezes", points: 50 },
      { id: "nunca", label: "Raramente confiro", points: 0 },
    ],
    positive: "Você confirma a identidade antes de transferir ou compartilhar dados.",
    recommendation: "Antes de fazer Pix ou enviar dados, confirme por ligação ou outro canal. Golpistas usam fotos e nomes de conhecidos em números novos.",
  },
];

export type Answers = Record<string, string>;

export interface Result {
  total: number;
  categories: Record<CategoryId, number>;
  positives: string[];
  improvements: { text: string; category: CategoryId; priority: "alta" | "media" }[];
}

export function pointsFor(q: Question, answer: string | undefined): number {
  const opt = q.options.find((o) => o.id === answer);
  if (!opt) throw new Error(`Resposta ausente para ${q.id}`);
  return opt.points;
}

export function calculateResult(answers: Answers): Result {
  const categories = {} as Record<CategoryId, number>;
  for (const c of CATEGORIES) {
    const qs = QUESTIONS.filter((q) => q.category === c.id);
    const sum = qs.reduce((acc, q) => acc + pointsFor(q, answers[q.id]), 0);
    categories[c.id] = Math.round(sum / qs.length);
  }
  const total = Math.round(
    CATEGORIES.reduce((acc, c) => acc + categories[c.id], 0) / CATEGORIES.length,
  );
  const positives: string[] = [];
  const improvements: Result["improvements"] = [];
  for (const q of QUESTIONS) {
    const p = pointsFor(q, answers[q.id]);
    if (p === 100) positives.push(q.positive);
    else improvements.push({ text: q.recommendation, category: q.category, priority: p === 0 ? "alta" : "media" });
  }
  improvements.sort((a, b) => (a.priority === b.priority ? 0 : a.priority === "alta" ? -1 : 1));
  return { total, categories, positives, improvements };
}

export type Level = "atencao" | "intermediaria" | "boa";
export function classify(score: number): { level: Level; label: string } {
  if (score < 40) return { level: "atencao", label: "Precisa de atenção" };
  if (score < 70) return { level: "intermediaria", label: "Proteção intermediária" };
  return { level: "boa", label: "Boas práticas identificadas" };
}

export const RESULT_STORAGE_KEY = "cybercheck:last-result";
export interface StoredResult { diagnosticId: string | null; answers: Answers; createdAt: string }
