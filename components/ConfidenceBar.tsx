import { cn } from "@/lib/utils";

interface ConfidenceBarProps {
  confidence: number;
  className?: string;
}

export function ConfidenceBar({ confidence, className }: ConfidenceBarProps) {
  const clamped = Math.max(0, Math.min(1, confidence));
  const percent = clamped * 100;

  return (
    <div
      className={cn("h-1 w-full overflow-hidden rounded-full bg-[#6B7280]/20", className)}
      role="progressbar"
      aria-valuenow={Math.round(percent)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Confidence"
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#7CB9E8] to-[#98D8C8] transition-[width] duration-500 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
