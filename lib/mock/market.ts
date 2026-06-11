import { mulberry32, generateSeries } from "./seed";
import type { MarketIndex, Mover, Sector } from "@/types/market";

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
