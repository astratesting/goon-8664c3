export interface Prediction {
  ticker: string;
  company: string;
  price: number;
  direction: "bullish" | "bearish" | "neutral";
  confidence: number;
  target: number;
  timeframe: string;
  reasoning: string[];
  updatedAt: string;
  sector: string;
}
