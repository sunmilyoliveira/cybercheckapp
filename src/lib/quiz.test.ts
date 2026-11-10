import { describe, expect, it } from "vitest";
import { QUESTIONS, calculateResult, classify, type Answers } from "./quiz";

const all = (pick: (i: number) => number): Answers =>
  Object.fromEntries(QUESTIONS.map((q) => [q.id, q.options[pick(0)]!.id]));

describe("pontuação", () => {
  it("todas as melhores respostas = 100", () => {
    expect(calculateResult(all(() => 0)).total).toBe(100);
  });
  it("todas as piores respostas = 0", () => {
    expect(calculateResult(all(() => 2)).total).toBe(0);
  });
  it("respostas intermediárias = 50", () => {
    expect(calculateResult(all(() => 1)).total).toBe(50);
  });
  it("categoria é média das suas perguntas", () => {
    const a = all(() => 0);
    a["dois_fatores"] = "nao";
    const r = calculateResult(a);
    expect(r.categories.senhas).toBe(50);
    expect(r.total).toBe(90);
    expect(r.improvements).toHaveLength(1);
    expect(r.improvements[0]?.priority).toBe("alta");
  });
  it("lança erro com resposta faltando", () => {
    expect(() => calculateResult({})).toThrow();
  });
});

describe("classificação", () => {
  it("faixas 0–39, 40–69, 70–100", () => {
    expect(classify(39).level).toBe("atencao");
    expect(classify(40).level).toBe("intermediaria");
    expect(classify(69).level).toBe("intermediaria");
    expect(classify(70).level).toBe("boa");
  });
});
