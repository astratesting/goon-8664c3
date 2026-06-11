import { cn } from "@/lib/utils";

interface SignalChipProps {
  direction: "bullish" | "bearish" | "neutral";
  className?: string;
}

const config = {
  bullish: {
    classes: "bg-[#98D8C8] text-emerald-900",
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
        <path d="M6 10V2m0 0L2.5 5.5M6 2l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Bullish",
  },
  bearish: {
    classes: "bg-[#E8D5B7] text-amber-900",
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
        <path d="M6 2v8m0 0l3.5-3.5M6 10L2.5 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Bearish",
  },
  neutral: {
    classes: "bg-[#EEF2F6] text-gray-600",
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
        <path d="M2.5 6h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Neutral",
  },
} as const;

export function SignalChip({ direction, className }: SignalChipProps) {
  const { classes, icon, label } = config[direction];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        classes,
        className
      )}
    >
      {icon}
      {label}
    </span>
  );
}
