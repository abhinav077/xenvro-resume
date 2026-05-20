import { AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "~/lib/utils";

const ATS = ({
  score,
  suggestions,
}: {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
  const isStrong = score > 69;
  const isMid = score > 49;

  return (
    <div
      className={cn(
        "w-full rounded-2xl border p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur",
        isStrong
          ? "border-emerald-200 bg-[linear-gradient(180deg,rgba(236,253,245,0.95),rgba(255,255,255,0.98))]"
          : isMid
          ? "border-amber-200 bg-[linear-gradient(180deg,rgba(255,251,235,0.95),rgba(255,255,255,0.98))]"
          : "border-rose-200 bg-[linear-gradient(180deg,rgba(255,241,242,0.95),rgba(255,255,255,0.98))]"
      )}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-2xl border",
                isStrong
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : isMid
                  ? "border-amber-200 bg-amber-50 text-amber-700"
                  : "border-rose-200 bg-rose-50 text-rose-700"
              )}
            >
              {isStrong ? <CheckCircle2 className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                ATS Compatibility
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-950">ATS Score</p>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
              Current Score
            </p>
            <p className="mt-1 text-3xl font-semibold text-slate-950">
              {score}
              <span className="ml-1 text-base font-medium text-slate-400">/100</span>
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div>
            <p className="text-lg font-semibold text-slate-950">
              How well does your resume pass through Applicant Tracking Systems?
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Your resume was scanned like an employer would. Here is how it performed and what should be improved next.
            </p>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/80">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  isStrong ? "bg-emerald-500" : isMid ? "bg-amber-500" : "bg-rose-500"
                )}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-white/70 p-4">
            <div className="flex items-center gap-2 text-slate-950">
              <Sparkles className="h-4 w-4 text-slate-400" />
              <p className="text-sm font-semibold">Next step</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Improve the weaker areas below to raise keyword matching, formatting reliability, and parser readability.
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          {suggestions.map((suggestion, index) => (
            <div
              className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white/80 p-4"
              key={index}
            >
              <div
                className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  suggestion.type === "good"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                )}
              >
                {suggestion.type === "good" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  {suggestion.type === "good" ? "Working well" : "Needs attention"}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">{suggestion.tip}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm leading-6 text-slate-500">
          Want a better score? Improve your resume by applying the suggestions listed below.
        </p>
      </div>
    </div>
  );
};

export default ATS;
