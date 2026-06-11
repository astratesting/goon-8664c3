export function formatPrice(price: number): string {
  return "$" + price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatPercent(value: number, includeSign = true): string {
  const sign = value > 0 ? "+" : "";
  return `${includeSign ? sign : ""}${(value * 100).toFixed(2)}%`;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatCompactDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatNumber(n: number): string {
  return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatLargeNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toFixed(2);
}
