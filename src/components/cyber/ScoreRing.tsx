import { classify } from "@/lib/quiz";
import { cn } from "@/lib/utils";

export const levelText = { atencao: "text-danger", intermediaria: "text-warning", boa: "text-success" } as const;
export const levelBg = { atencao: "bg-danger", intermediaria: "bg-warning", boa: "bg-success" } as const;
export const levelSoft = { atencao: "bg-danger-soft text-danger", intermediaria: "bg-warning-soft text-warning", boa: "bg-success-soft text-success" } as const;

export function ScoreRing({ score, size = 180 }: { score: number; size?: number }) {
  const { level } = classify(score);
  const r = 44;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }} role="img" aria-label={`Pontuação ${score} de 100`}>
      <svg viewBox="0 0 100 100" className="size-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="9" className="stroke-muted" />
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="9" strokeLinecap="round"
          className={cn("transition-all duration-1000", levelText[level])} stroke="currentColor"
          strokeDasharray={c} strokeDashoffset={c - (score / 100) * c} />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-display text-5xl font-bold">{score}</div>
          <div className="text-xs text-muted-foreground">de 100</div>
        </div>
      </div>
    </div>
  );
}

export function ScoreBar({ score }: { score: number }) {
  const { level } = classify(score);
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div className={cn("h-full rounded-full transition-all duration-700", levelBg[level])} style={{ width: `${score}%` }} />
    </div>
  );
}
