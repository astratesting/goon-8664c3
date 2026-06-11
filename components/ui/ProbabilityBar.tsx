import { clsx } from "clsx";

interface ProbabilityBarProps {
  value: number;
  className?: string;
}

export default function ProbabilityBar({ value, className }: ProbabilityBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#1A1A2E]/[0.06]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#7EC8E3] to-[#A8E6CF] transition-all duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="text-sm font-medium text-[#1A1A2E] tabular-nums">{clamped}%</span>
    </div>
  );
}
