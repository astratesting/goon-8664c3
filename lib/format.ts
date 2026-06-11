export function formatPrice(n: number): string {
  return "$" + n.toFixed(2);
}

export function formatPercent(n: number): string {
  const sign = n >= 0 ? "+" : "";
  return sign + n.toFixed(2) + "%";
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function formatLargeNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}
