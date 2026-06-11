export const TICKER_DATA: Record<string, { name: string; basePrice: number }> = {
  AAPL: { name: "Apple Inc.", basePrice: 198.45 },
  TSLA: { name: "Tesla, Inc.", basePrice: 245.8 },
  NVDA: { name: "NVIDIA Corporation", basePrice: 875.3 },
  MSFT: { name: "Microsoft Corporation", basePrice: 420.15 },
  AMZN: { name: "Amazon.com, Inc.", basePrice: 186.5 },
  META: { name: "Meta Platforms, Inc.", basePrice: 505.75 },
  GOOGL: { name: "Alphabet Inc.", basePrice: 175.2 },
  AMD: { name: "Advanced Micro Devices, Inc.", basePrice: 164.9 },
  NFLX: { name: "Netflix, Inc.", basePrice: 628.4 },
  CRM: { name: "Salesforce, Inc.", basePrice: 272.6 },
  JPM: { name: "JPMorgan Chase & Co.", basePrice: 198.3 },
  V: { name: "Visa Inc.", basePrice: 278.95 },
  WMT: { name: "Walmart Inc.", basePrice: 168.25 },
  DIS: { name: "The Walt Disney Company", basePrice: 112.8 },
  PYPL: { name: "PayPal Holdings, Inc.", basePrice: 68.45 },
  SQ: { name: "Block, Inc.", basePrice: 78.6 },
  UBER: { name: "Uber Technologies, Inc.", basePrice: 76.3 },
  SHOP: { name: "Shopify Inc.", basePrice: 78.95 },
  SPOT: { name: "Spotify Technology S.A.", basePrice: 312.4 },
  COIN: { name: "Coinbase Global, Inc.", basePrice: 225.8 },
  PLTR: { name: "Palantir Technologies Inc.", basePrice: 24.6 },
  SOFI: { name: "SoFi Technologies, Inc.", basePrice: 8.95 },
  RIVN: { name: "Rivian Automotive, Inc.", basePrice: 17.3 },
  LCID: { name: "Lucid Group, Inc.", basePrice: 3.85 },
  BAC: { name: "Bank of America Corporation", basePrice: 38.2 },
  GS: { name: "The Goldman Sachs Group, Inc.", basePrice: 465.7 },
  INTC: { name: "Intel Corporation", basePrice: 31.45 },
  MU: { name: "Micron Technology, Inc.", basePrice: 98.6 },
  BA: { name: "The Boeing Company", basePrice: 178.3 },
  GE: { name: "GE Aerospace", basePrice: 162.8 },
};

export function getTickerInfo(ticker: string) {
  return TICKER_DATA[ticker.toUpperCase()] ?? null;
}

export function isValidTicker(ticker: string): boolean {
  return /^[A-Z]{1,5}$/.test(ticker.toUpperCase());
}
