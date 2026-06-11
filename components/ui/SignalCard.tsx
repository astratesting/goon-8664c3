import Badge from "./Badge";
import ProbabilityBar from "./ProbabilityBar";

interface SignalCardProps {
  ticker: string;
  direction: "Up" | "Down" | "Sideways";
  probability: number;
  horizon: string;
  risk: "Low" | "Medium" | "High";
  why: string;
}

export default function SignalCard({
  ticker,
  direction,
  probability,
  horizon,
  risk,
  why,
}: SignalCardProps) {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-[#1A1A2E]/[0.06] bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-[#1A1A2E]">{ticker}</span>
          <span
            className={
              direction === "Up"
                ? "text-sm font-medium text-emerald-600"
                : direction === "Down"
                ? "text-sm font-medium text-amber-600"
                : "text-sm font-medium text-[#1A1A2E]/50"
            }
          >
            {direction === "Up" ? "↑" : direction === "Down" ? "↓" : "→"} {direction}
          </span>
        </div>
        <Badge variant={risk === "Low" ? "mint" : risk === "Medium" ? "amber" : "sky"}>
          {risk} risk
        </Badge>
      </div>

      <ProbabilityBar value={probability} className="mb-3" />

      <div className="mb-3 flex items-center gap-4 text-xs text-[#1A1A2E]/50">
        <span>Horizon: {horizon}</span>
        <span>·</span>
        <span>Probability: {probability}%</span>
      </div>

      <p className="text-sm leading-relaxed text-[#1A1A2E]/70">{why}</p>

      <p className="mt-3 text-[10px] text-[#1A1A2E]/40">Sample signal</p>
    </div>
  );
}
