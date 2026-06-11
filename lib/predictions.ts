import { Prediction } from "@/types/prediction";
import predictionsData from "@/data/predictions.json";

export function getPredictions(filters?: {
  direction?: string;
  minConfidence?: number;
  search?: string;
}): Prediction[] {
  let results = predictionsData as Prediction[];

  if (filters?.search) {
    const q = filters.search.toUpperCase();
    results = results.filter(
      (p) => p.ticker.toUpperCase().includes(q) || p.company.toUpperCase().includes(q)
    );
  }

  if (filters?.direction && filters.direction !== "all") {
    results = results.filter((p) => p.direction === filters.direction);
  }

  if (filters?.minConfidence) {
    results = results.filter((p) => p.confidence >= filters.minConfidence);
  }

  return results;
}

export function getPrediction(ticker: string): Prediction | undefined {
  return (predictionsData as Prediction[]).find(
    (p) => p.ticker.toUpperCase() === ticker.toUpperCase()
  );
}

export function getTopPredictions(limit = 5): Prediction[] {
  return (predictionsData as Prediction[])
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, limit);
}

export function getAccuracy(): number {
  return 0.784;
}

export function getMarketSentiment(): { score: number; label: string } {
  const data = predictionsData as Prediction[];
  const bullish = data.filter((p) => p.direction === "bullish").length;
  const bearish = data.filter((p) => p.direction === "bearish").length;
  const total = data.length;
  const score = Math.round(((bullish - bearish) / total) * 50 + 50);
  let label = "Neutral";
  if (score >= 65) label = "Bullish";
  else if (score >= 55) label = "Cautiously bullish";
  else if (score >= 45) label = "Neutral";
  else if (score >= 35) label = "Cautiously bearish";
  else label = "Bearish";
  return { score, label };
}

export function getSignalsTodayCount(): number {
  const today = new Date().toISOString().split("T")[0];
  return (predictionsData as Prediction[]).filter(
    (p) => p.updatedAt.startsWith(today)
  ).length;
}

export const TICKERS = [
  { ticker: "AAPL", company: "Apple Inc." },
  { ticker: "MSFT", company: "Microsoft Corp." },
  { ticker: "GOOGL", company: "Alphabet Inc." },
  { ticker: "AMZN", company: "Amazon.com Inc." },
  { ticker: "NVDA", company: "NVIDIA Corp." },
  { ticker: "META", company: "Meta Platforms Inc." },
  { ticker: "TSLA", company: "Tesla Inc." },
  { ticker: "BRK.B", company: "Berkshire Hathaway" },
  { ticker: "JPM", company: "JPMorgan Chase" },
  { ticker: "V", company: "Visa Inc." },
  { ticker: "UNH", company: "UnitedHealth Group" },
  { ticker: "JNJ", company: "Johnson & Johnson" },
  { ticker: "WMT", company: "Walmart Inc." },
  { ticker: "PG", company: "Procter & Gamble" },
  { ticker: "MA", company: "Mastercard Inc." },
  { ticker: "HD", company: "Home Depot Inc." },
  { ticker: "DIS", company: "Walt Disney Co." },
  { ticker: "BAC", company: "Bank of America" },
  { ticker: "XOM", company: "Exxon Mobil" },
  { ticker: "NFLX", company: "Netflix Inc." },
  { ticker: "ADBE", company: "Adobe Inc." },
  { ticker: "CRM", company: "Salesforce Inc." },
  { ticker: "AMD", company: "Advanced Micro Devices" },
  { ticker: "INTC", company: "Intel Corp." },
  { ticker: "PYPL", company: "PayPal Holdings" },
  { ticker: "COST", company: "Costco Wholesale" },
  { ticker: "PEP", company: "PepsiCo Inc." },
  { ticker: "KO", company: "Coca-Cola Co." },
  { ticker: "NKE", company: "Nike Inc." },
  { ticker: "MRK", company: "Merck & Co." },
  { ticker: "PFE", company: "Pfizer Inc." },
  { ticker: "ABBV", company: "AbbVie Inc." },
  { ticker: "LLY", company: "Eli Lilly" },
  { ticker: "ORCL", company: "Oracle Corp." },
  { ticker: "CSCO", company: "Cisco Systems" },
  { ticker: "T", company: "AT&T Inc." },
  { ticker: "VZ", company: "Verizon Communications" },
  { ticker: "BA", company: "Boeing Co." },
  { ticker: "GS", company: "Goldman Sachs" },
  { ticker: "SPY", company: "S&P 500 ETF" },
  { ticker: "QQQ", company: "Nasdaq 100 ETF" },
  { ticker: "UBER", company: "Uber Technologies" },
  { ticker: "SHOP", company: "Shopify Inc." },
  { ticker: "SQ", company: "Block Inc." },
  { ticker: "PLTR", company: "Palantir Technologies" },
  { ticker: "SOFI", company: "SoFi Technologies" },
  { ticker: "COIN", company: "Coinbase Global" },
  { ticker: "RIVN", company: "Rivian Automotive" },
  { ticker: "LCID", company: "Lucid Group" },
  { ticker: "MU", company: "Micron Technology" },
];
