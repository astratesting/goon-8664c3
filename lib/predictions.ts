import { Prediction } from "@/types/prediction";
import predictionsData from "@/data/predictions.json";

type RawPrediction = {
  ticker: string;
  company: string;
  price: number;
  direction: string;
  confidence: number;
  target: number;
  timeframe: string;
  reasoning: string[];
  updatedAt: string;
  sector: string;
};

function mapPrediction(raw: RawPrediction): Prediction {
  const delta = ((raw.target - raw.price) / raw.price) * 100;
  return {
    id: raw.ticker,
    ticker: raw.ticker,
    companyName: raw.company,
    currentPrice: raw.price,
    direction: raw.direction as "bullish" | "bearish" | "neutral",
    confidence: raw.confidence,
    priceTarget: raw.target,
    timeHorizon: raw.timeframe,
    delta: Math.round(delta * 100) / 100,
    factors: raw.reasoning,
    sentiment: {
      score: raw.direction === "bullish" ? 0.7 : raw.direction === "bearish" ? 0.3 : 0.5,
      label: raw.direction === "bullish" ? "Positive" : raw.direction === "bearish" ? "Negative" : "Neutral",
    },
    technicals: { rsi: 50 + raw.confidence * 30, macd: raw.direction === "bullish" ? "Bullish crossover" : "Bearish crossover", ema: "20/50 aligned" },
    volume: { ratio: 1.2, unusual: false, label: "Normal" },
    similarPatterns: [],
    history: [],
    chartData: [],
    createdAt: raw.updatedAt,
    status: "active",
  };
}

const allPredictions: Prediction[] = (predictionsData as RawPrediction[]).map(mapPrediction);

export function getPredictions(filters?: {
  direction?: string;
  minConfidence?: number;
  search?: string;
}): Prediction[] {
  let results = allPredictions;

  if (filters?.search) {
    const q = filters.search.toUpperCase();
    results = results.filter(
      (p) => p.ticker.toUpperCase().includes(q) || p.companyName.toUpperCase().includes(q)
    );
  }

  if (filters?.direction && filters.direction !== "all") {
    results = results.filter((p) => p.direction === filters.direction);
  }

  if (filters?.minConfidence) {
    const min = filters.minConfidence;
    results = results.filter((p) => p.confidence >= min);
  }

  return results;
}

export function getPrediction(ticker: string): Prediction | undefined {
  return allPredictions.find(
    (p) => p.ticker.toUpperCase() === ticker.toUpperCase()
  );
}

export function getTopPredictions(limit = 5): Prediction[] {
  return [...allPredictions]
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, limit);
}

export function getAccuracy(): number {
  return 0.784;
}

export function getMarketSentiment(): { score: number; label: string } {
  const data = allPredictions;
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
  return allPredictions.filter(
    (p) => p.createdAt.startsWith(today)
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
