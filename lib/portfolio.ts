import { mulberry32, hashString, generateSeries } from "./rng";

export interface PortfolioHolding {
  ticker: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
}

const SEED_HOLDINGS: Omit<PortfolioHolding, "currentPrice">[] = [
  { ticker: "NVDA", shares: 15, avgCost: 412 },
  { ticker: "AAPL", shares: 30, avgCost: 178 },
  { ticker: "TSLA", shares: 8, avgCost: 245 },
  { ticker: "MSFT", shares: 20, avgCost: 410 },
  { ticker: "GOOGL", shares: 12, avgCost: 165 },
  { ticker: "AMZN", shares: 10, avgCost: 185 },
  { ticker: "META", shares: 14, avgCost: 485 },
  { ticker: "SPY", shares: 25, avgCost: 520 },
];

const CURRENT_PRICES: Record<string, number> = {
  NVDA: 438.5,
  AAPL: 192.3,
  TSLA: 238.1,
  MSFT: 422.8,
  GOOGL: 176.4,
  AMZN: 198.2,
  META: 502.1,
  SPY: 534.6,
};

export function getHoldings(): PortfolioHolding[] {
  return SEED_HOLDINGS.map((h) => ({
    ...h,
    currentPrice: CURRENT_PRICES[h.ticker] || h.avgCost,
  }));
}

export function getPortfolioValue(holdings: PortfolioHolding[]): number {
  return holdings.reduce((sum, h) => sum + h.shares * h.currentPrice, 0);
}

export function getPortfolioCost(holdings: PortfolioHolding[]): number {
  return holdings.reduce((sum, h) => sum + h.shares * h.avgCost, 0);
}

export function getDailyPnL(): number {
  return 312.4;
}

export function getTotalReturn(holdings: PortfolioHolding[]): number {
  const cost = getPortfolioCost(holdings);
  const value = getPortfolioValue(holdings);
  return ((value - cost) / cost) * 100;
}

export function generatePortfolioSeries(userId: string): { date: string; value: number }[] {
  const seed = hashString(userId + "portfolio-series");
  const rng = mulberry32(seed);
  const baseValue = 43000;
  const series = generateSeries(rng, 30, baseValue, 800);
  const today = new Date();
  return series.map((value, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (29 - i));
    return {
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.round(value * 100) / 100,
    };
  });
}
