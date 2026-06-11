export interface MarketIndex {
  name: string;
  symbol: string;
  value: number;
  change: number;
  sparkline: number[];
}

export interface Mover {
  ticker: string;
  companyName: string;
  price: number;
  change: number;
}

export interface Sector {
  name: string;
  change: number;
}
