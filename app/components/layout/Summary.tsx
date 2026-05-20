import ScoreGauge from "../ui/ScoreGauge";
import { cn } from "~/lib/utils";

const ScoreBadge = ({ score }: { score: number }) => {
  const badgeColor =
    score > 69
      ? "border-emerald-200 bg-emerald-50"
      : score > 49
      ? "border-amber-200 bg-amber-50"
      : "border-rose-200 bg-rose-50";
  const textColor =
    score > 69
      ? "text-emerald-700"
      : score > 49
      ? "text-amber-700"
      : "text-rose-700";
  const badgeText =
    score > 69 ? "Strong" : score > 49 ? "Good Start" : "Needs Work";

  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-1", badgeColor)}>
      <p className={cn("text-[11px] font-semibold uppercase tracking-[0.14em]", textColor)}>
        {badgeText}
      </p>
    </div>
  );
};

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 69
      ? "text-emerald-600"
      : score > 49
      ? "text-amber-600"
      : "text-rose-600";
  const barColor =
    score > 69 ? "bg-emerald-500" : score > 49 ? "bg-amber-500" : "bg-rose-500";

  return (
    <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-base font-semibold text-slate-950">{title}</p>
            <ScoreBadge score={score} />
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className={cn("h-full rounded-full transition-all duration-500", barColor)}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
        <div className="flex items-end gap-1 self-start sm:self-auto">
          <p className={cn("text-3xl font-semibold leading-none", textColor)}>{score}</p>
          <p className="pb-0.5 text-sm font-medium text-slate-400">/100</p>
        </div>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="w-full rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-col gap-6 border-b border-slate-200/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-5">
            <ScoreGauge score={feedback.overallScore} />
          </div>
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Overall Analysis
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Your Resume Score</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              This score is derived from tone, content quality, structure, and skill alignment.
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
            Total
          </p>
          <p className="mt-1 text-3xl font-semibold text-slate-950">
            {feedback.overallScore}
            <span className="ml-1 text-base font-medium text-slate-400">/100</span>
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
        <Category title="Content" score={feedback.content.score} />
        <Category title="Structure" score={feedback.structure.score} />
        <Category title="Skills" score={feedback.skills.score} />
      </div>
    </div>
  );
};

export default Summary;
