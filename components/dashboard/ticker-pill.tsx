export function TickerPill({
  ticker,
  size = "md",
}: {
  ticker: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };
  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full bg-sky/10 text-sky border border-sky/20 font-sans ${sizeClasses[size]}`}
    >
      {ticker}
    </span>
  );
}
