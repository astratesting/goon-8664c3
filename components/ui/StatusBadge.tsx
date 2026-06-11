type BadgeVariant = "bullish" | "bearish" | "neutral";

const variantStyles: Record<BadgeVariant, string> = {
  bullish: "bg-emerald-50 text-emerald-700 border-emerald-200",
  bearish: "bg-rose-50 text-rose-700 border-rose-200",
  neutral: "bg-gray-50 text-gray-600 border-gray-200",
};

const dotStyles: Record<BadgeVariant, string> = {
  bullish: "bg-emerald-500",
  bearish: "bg-rose-400",
  neutral: "bg-gray-400",
};

const labels: Record<BadgeVariant, string> = {
  bullish: "Bullish",
  bearish: "Bearish",
  neutral: "Neutral",
};

export function StatusBadge({
  variant,
  label,
}: {
  variant: BadgeVariant;
  label?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${variantStyles[variant]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[variant]}`} />
      {label ?? labels[variant]}
    </span>
  );
}
