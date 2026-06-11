import { cn } from "@/lib/utils";

interface StatTileProps {
  value: string | number;
  label: string;
  delta?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatTile({ value, label, delta, icon, className }: StatTileProps) {
  const isPositive = delta?.startsWith("+");
  const isNegative = delta?.startsWith("-") || delta?.startsWith("\u2212");

  return (
    <div
      className={cn(
        "bg-[#EEF2F6] rounded-2xl p-6 border border-[#E5E7EB] shadow-[0_1px_2px_rgba(31,41,55,.04),0_8px_24px_rgba(31,41,55,.04)]",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="font-serif text-sm text-[#6B7280]">{label}</span>
        {icon && <span className="text-[#6B7280]">{icon}</span>}
      </div>
      <div className="flex items-end gap-3">
        <span className="text-3xl font-semibold text-[#1F2937] font-sans tabular-nums">
          {value}
        </span>
        {delta && (
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
              isPositive && "bg-[#98D8C8]/20 text-emerald-800",
              isNegative && "bg-[#E8D5B7]/30 text-amber-800",
              !isPositive && !isNegative && "bg-[#EEF2F6] text-[#6B7280]"
            )}
          >
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}
