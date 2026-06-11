export interface WatchlistItem {
  ticker: string;
  companyName: string;
  currentPrice: number;
  dailyChange: number;
  prediction: "bullish" | "bearish" | "neutral";
  sparkline: number[];
  addedAt: string;
}
