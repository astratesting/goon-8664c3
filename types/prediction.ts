export interface Prediction {
  id: string;
  ticker: string;
  companyName: string;
  currentPrice: number;
  direction: "bullish" | "bearish" | "neutral";
  confidence: number;
  priceTarget: number;
  timeHorizon: string;
  delta: number;
  factors: string[];
  sentiment: {
    score: number;
    label: string;
  };
  technicals: {
    rsi: number;
    macd: string;
    ema: string;
  };
  volume: {
    ratio: number;
    unusual: boolean;
    label: string;
  };
  similarPatterns: {
    description: string;
    outcome: string;
    sparkline: number[];
  }[];
  history: {
    date: string;
    direction: "bullish" | "bearish" | "neutral";
    target: number;
    outcome?: number;
    status: "pending" | "resolved";
  }[];
  chartData: number[];
  createdAt: string;
  status: string;
}
