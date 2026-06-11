import { mulberry32, generateSeries } from "./seed";
import type { MarketIndex, Mover, Sector } from "@/types/market";

const TICKER_DATA: Record<string, { name: string; basePrice: number }> = {
  AAPL: { name: "Apple Inc.", basePrice: 189.84 },
  MSFT: { name: "Microsoft Corp.", basePrice: 378.91 },
  GOOGL: { name: "Alphabet Inc.", basePrice: 141.8 },
  AMZN: { name: "Amazon.com Inc.", basePrice: 178.25 },
  NVDA: { name: "NVIDIA Corp.", basePrice: 131.88 },
  META: { name: "Meta Platforms Inc.", basePrice: 505.75 },
  TSLA: { name: "Tesla Inc.", basePrice: 248.42 },
  BRK_B: { name: "Berkshire Hathaway", basePrice: 408.52 },
  JPM: { name: "JPMorgan Chase", basePrice: 198.47 },
  V: { name: "Visa Inc.", basePrice: 279.32 },
  JNJ: { name: "Johnson & Johnson", basePrice: 156.12 },
  WMT: { name: "Walmart Inc.", basePrice: 165.23 },
  PG: { name: "Procter & Gamble", basePrice: 162.48 },
  MA: { name: "Mastercard Inc.", basePrice: 452.79 },
  UNH: { name: "UnitedHealth Group", basePrice: 527.15 },
  HD: { name: "Home Depot Inc.", basePrice: 345.28 },
  DIS: { name: "Walt Disney Co.", basePrice: 111.93 },
  BAC: { name: "Bank of America", basePrice: 37.42 },
  XOM: { name: "Exxon Mobil Corp.", basePrice: 104.59 },
  PFE: { name: "Pfizer Inc.", basePrice: 28.15 },
  NFLX: { name: "Netflix Inc.", basePrice: 628.35 },
  AMD: { name: "Advanced Micro Devices", basePrice: 164.22 },
  INTC: { name: "Intel Corp.", basePrice: 43.78 },
  CRM: { name: "Salesforce Inc.", basePrice: 272.15 },
  ORCL: { name: "Oracle Corp.", basePrice: 125.68 },
  ADBE: { name: "Adobe Inc.", basePrice: 498.62 },
  PYPL: { name: "PayPal Holdings", basePrice: 63.45 },
  CSCO: { name: "Cisco Systems", basePrice: 49.82 },
  AVGO: { name: "Broadcom Inc.", basePrice: 168.25 },
  QCOM: { name: "Qualcomm Inc.", basePrice: 168.92 },
};

export function getMarketData(): {
  indices: MarketIndex[];
  gainers: Mover[];
  losers: Mover[];
  sectors: Sector[];
} {
  const today = new Date().toISOString().slice(0, 10);
  const daySeed = today.split("-").reduce((a, b) => a * 31 + parseInt(b, 10), 0);
  const rng = mulberry32(daySeed);

  const indices: MarketIndex[] = [
    {
      name: "S&P 500",
      symbol: "SPX",
      value: Math.round((5200 + rng() * 300) * 100) / 100,
      change: (rng() - 0.45) * 0.02,
      sparkline: generateSeries(daySeed + 1, 24, 5200, 30),
    },
    {
      name: "NASDAQ",
      symbol: "IXIC",
      value: Math.round((16400 + rng() * 600) * 100) / 100,
      change: (rng() - 0.43) * 0.025,
      sparkline: generateSeries(daySeed + 2, 24, 16400, 80),
    },
    {
      name: "Dow Jones",
      symbol: "DJI",
      value: Math.round((39000 + rng() * 1000) * 100) / 100,
      change: (rng() - 0.46) * 0.015,
      sparkline: generateSeries(daySeed + 3, 24, 39000, 200),
    },
  ];

  const allTickers = Object.keys(TICKER_DATA);
  const shuffled = [...allTickers].sort(() => rng() - 0.5);

  const gainers: Mover[] = shuffled.slice(0, 5).map((ticker, i) => ({
    ticker,
    companyName: TICKER_DATA[ticker].name,
    price: TICKER_DATA[ticker].basePrice,
    change: 0.02 + rng() * 0.08 + i * 0.005,
  }));

  const losers: Mover[] = shuffled.slice(5, 10).map((ticker, i) => ({
    ticker,
    companyName: TICKER_DATA[ticker].name,
    price: TICKER_DATA[ticker].basePrice * (1 - 0.02 - rng() * 0.04),
    change: -(0.015 + rng() * 0.05 + i * 0.003),
  }));

  const sectorNames = [
    "Technology",
    "Financials",
    "Healthcare",
    "Energy",
    "Consumer Discretionary",
    "Consumer Staples",
    "Industrials",
    "Materials",
    "Utilities",
    "Real Estate",
    "Communication Services",
  ];

  const sectors: Sector[] = sectorNames.map((name) => ({
    name,
    change: (rng() - 0.48) * 0.04,
  }));

  return { indices, gainers, losers, sectors };
}
