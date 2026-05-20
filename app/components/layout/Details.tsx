import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  FileText,
  LayoutTemplate,
  PenTool,
  Wrench,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "../ui/Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1",
        score > 69
          ? "border-emerald-200 bg-emerald-50"
          : score > 39
          ? "border-amber-200 bg-amber-50"
          : "border-rose-200 bg-rose-50"
      )}
    >
      {score > 69 ? (
        <CheckCircle2 className="size-3.5 text-emerald-700" />
      ) : (
        <AlertTriangle
          className={cn(
            "size-3.5",
            score > 39 ? "text-amber-700" : "text-rose-700"
          )}
        />
      )}
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.14em]",
          score > 69
            ? "text-emerald-700"
            : score > 39
            ? "text-amber-700"
            : "text-rose-700"
        )}
      >
        {score}/100
      </p>
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
  icon,
}: {
  title: string;
  categoryScore: number;
  icon: ReactNode;
}) => {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3 py-1">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50 text-slate-600">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-lg font-semibold text-slate-950 sm:text-xl">{title}</p>
          <ScoreBadge score={categoryScore} />
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Review the detailed observations for this category.
        </p>
      </div>
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid gap-2 rounded-xl border border-slate-200/80 bg-slate-50/80 p-4 sm:grid-cols-2">
        {tips.map((tip, index) => (
          <div className="flex items-start gap-2 rounded-lg bg-white/80 px-3 py-2" key={index}>
            {tip.type === "good" ? (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />
            )}
            <p className="text-sm font-medium leading-6 text-slate-600">{tip.tip}</p>
          </div>
        ))}
      </div>
      <div className="flex w-full flex-col gap-3">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={cn(
              "flex flex-col gap-2 rounded-xl border p-4",
              tip.type === "good"
                ? "border-emerald-200 bg-emerald-50/70 text-emerald-800"
                : "border-amber-200 bg-amber-50/70 text-amber-800"
            )}
          >
            <div className="flex items-start gap-2">
              {tip.type === "good" ? (
                <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
              ) : (
                <AlertTriangle className="mt-0.5 size-5 shrink-0" />
              )}
              <div>
                <p className="text-base font-semibold">{tip.tip}</p>
                <p className="mt-1 text-sm leading-6 opacity-85">{tip.explanation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  const categories = [
    {
      id: "tone-style",
      title: "Tone & Style",
      score: feedback.toneAndStyle.score,
      tips: feedback.toneAndStyle.tips,
      icon: <PenTool className="size-5" />,
    },
    {
      id: "content",
      title: "Content",
      score: feedback.content.score,
      tips: feedback.content.tips,
      icon: <FileText className="size-5" />,
    },
    {
      id: "structure",
      title: "Structure",
      score: feedback.structure.score,
      tips: feedback.structure.tips,
      icon: <LayoutTemplate className="size-5" />,
    },
    {
      id: "skills",
      title: "Skills",
      score: feedback.skills.score,
      tips: feedback.skills.tips,
      icon: <Wrench className="size-5" />,
    },
  ];

  return (
    <div className="flex w-full flex-col gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Detailed Breakdown
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-950">
          Section-by-section feedback
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Expand each category to see both the positive signals and the specific improvements detected in your resume.
        </p>
      </div>

      <Accordion className="space-y-3">
        {categories.map((category) => (
          <AccordionItem
            id={category.id}
            key={category.id}
            className="rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_12px_36px_rgba(15,23,42,0.05)]"
          >
            <AccordionHeader
              itemId={category.id}
              className="px-5 py-4 hover:bg-slate-50/80"
              icon={<ChevronDown className="h-5 w-5 text-slate-400 transition-transform duration-200" />}
            >
              <CategoryHeader
                title={category.title}
                categoryScore={category.score}
                icon={category.icon}
              />
            </AccordionHeader>
            <AccordionContent itemId={category.id} className="px-5 pb-5">
              <CategoryContent tips={category.tips} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Details;
