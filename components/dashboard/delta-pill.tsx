export function DeltaPill({
  value,
  size = "md",
}: {
  value: number;
  size?: "sm" | "md";
}) {
  const isPositive = value > 0;
  const isNegative = value < 0;
  const color = isPositive
    ? "text-emerald-600"
    : isNegative
      ? "text-rose-500"
      : "text-gray-500";
  const arrow = isPositive ? "▲" : isNegative ? "▼" : "—";
  const sizeClasses = size === "sm" ? "text-xs px-1.5 py-0.5" : "text-sm px-2 py-0.5";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium tabular-nums ${color} ${sizeClasses}`}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {arrow} {Math.abs(value * 100).toFixed(2)}%
    </span>
  );
}
