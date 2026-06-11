import { mulberry32, hashString, generateSeries } from "./seed";
import { TICKER_DATA } from "./tickers";
import type { WatchlistItem } from "@/types/watchlist";

export function generateWatchlistItem(ticker: string): WatchlistItem {
  const upper = ticker.toUpperCase();
  const seed = hashString(upper + "watchlist");
  const rng = mulberry32(seed);
  const info = TICKER_DATA[upper];
  const companyName = info?.name ?? `${upper} Corp.`;
  const basePrice = info?.basePrice ?? 10 + rng() * 490;
  const dailyChange = (rng() - 0.45) * 0.06;
  const predRoll = rng();
  const prediction: "bullish" | "bearish" | "neutral" =
    predRoll < 0.5 ? "bullish" : predRoll < 0.8 ? "bearish" : "neutral";
  const sparkline = generateSeries(seed + 50, 7, basePrice * 0.97, basePrice * 0.008);

  return {
    ticker: upper,
    companyName,
    currentPrice: Math.round(basePrice * 100) / 100,
    dailyChange,
    prediction,
    sparkline,
    addedAt: new Date().toISOString(),
  };
}
