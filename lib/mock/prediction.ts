import { mulberry32, hashString, generateSeries } from "./seed";
import { TICKER_DATA } from "./tickers";
import type { Prediction } from "@/types/prediction";

const DIRECTIONS: Array<"bullish" | "bearish" | "neutral"> = [
  "bullish",
  "bearish",
  "neutral",
];

const BULLISH_FACTORS = [
  "Social sentiment is up significantly this week based on Reddit and Twitter volume",
  "RSI indicates room to run before overbought territory",
  "Insider buying detected in the last 5 trading days",
  "Strong institutional accumulation pattern over the past 2 weeks",
  "EMA crossover signal just triggered bullish on the daily chart",
  "Options flow shows heavy call buying ahead of catalyst",
  "Earnings revision momentum trending positive",
  "Breaking out of a multi-week consolidation pattern on above-average volume",
];

const BEARISH_FACTORS = [
  "Social sentiment has declined sharply this week across major platforms",
  "RSI approaching overbought levels, historically precedes pullbacks",
  "Insider selling activity increased over the past 5 trading days",
  "Heavy put buying detected in options flow",
  "EMA bearish crossover forming on the daily chart",
  "Volume declining on up days suggests weakening momentum",
  "Sector rotation showing money flowing out of this segment",
  "Approaching historical resistance level with rejection pattern",
];

const NEUTRAL_FACTORS = [
  "Mixed signals across social sentiment indicators",
  "RSI hovering near neutral zone at 50",
  "Low volatility environment with no clear directional catalyst",
  "Consolidating near key moving averages",
  "Options flow is balanced between calls and puts",
  "Waiting for upcoming catalyst to determine direction",
];

const PATTERN_TEMPLATES = [
  {
    description:
      "Last time RSI was near {rsi} and sentiment shifted {sentimentDir}, the stock moved {outcome} over 7 days",
    outcomeRanges: { bullish: [2, 6], bearish: [-5, -2], neutral: [-1, 1] },
  },
  {
    description:
      "Similar volume pattern in {month} preceded a {outcome} move over 5 trading days",
    outcomeRanges: { bullish: [3, 8], bearish: [-7, -3], neutral: [-2, 2] },
  },
  {
    description:
      "When MACD showed {macd} divergence and EMA was {ema}, the stock moved {outcome} in the following week",
    outcomeRanges: { bullish: [1, 5], bearish: [-4, -1], neutral: [-1, 2] },
  },
];

const MONTHS = [
  "Jan 2024",
  "Feb 2024",
  "Mar 2024",
  "Apr 2024",
  "May 2024",
  "Jun 2024",
  "Jul 2024",
  "Aug 2024",
  "Sep 2024",
  "Oct 2024",
  "Nov 2024",
  "Dec 2024",
];

function generateFactors(
  seed: number,
  direction: "bullish" | "bearish" | "neutral"
): string[] {
  const pool =
    direction === "bullish"
      ? BULLISH_FACTORS
      : direction === "bearish"
        ? BEARISH_FACTORS
        : NEUTRAL_FACTORS;
  const rng = mulberry32(seed + 999);
  const shuffled = [...pool].sort(() => rng() - 0.5);
  return shuffled.slice(0, 3);
}

function generateHistory(seed: number, ticker: string, basePrice: number) {
  const rng = mulberry32(seed + 5000);
  const history = [];
  for (let i = 0; i < 5; i++) {
    const dir =
      DIRECTIONS[Math.floor(rng() * 3)];
    const daysAgo = (i + 1) * 5;
    const date = new Date(Date.now() - daysAgo * 86400000).toISOString();
    const targetOffset = (rng() - 0.4) * 0.06;
    const target = basePrice * (1 + targetOffset);
    const isResolved = i > 1;
    let outcome: number | undefined;
    if (isResolved) {
      outcome = (rng() - 0.45) * 0.08;
    }
    history.push({
      date,
      direction: dir,
      target: Math.round(target * 100) / 100,
      outcome,
      status: isResolved ? ("resolved" as const) : ("pending" as const),
    });
  }
  return history;
}

function generateSimilarPatterns(
  seed: number,
  direction: "bullish" | "bearish" | "neutral"
) {
  const rng = mulberry32(seed + 7000);
  return PATTERN_TEMPLATES.map((tpl, i) => {
    const rsi = Math.floor(rng() * 30) + 40;
    const sentimentDir = direction === "bullish" ? "positive" : direction === "bearish" ? "negative" : "mixed";
    const macd = direction;
    const ema = direction === "bullish" ? "above" : direction === "bearish" ? "below" : "near";
    const range = tpl.outcomeRanges[direction];
    const outcomeVal =
      Math.round((range[0] + rng() * (range[1] - range[0])) * 100) / 100;
    const description = tpl.description
      .replace("{rsi}", String(rsi))
      .replace("{sentimentDir}", sentimentDir)
      .replace("{outcome}", `${outcomeVal > 0 ? "+" : ""}${outcomeVal.toFixed(1)}%`)
      .replace("{month}", MONTHS[Math.floor(rng() * 12)])
      .replace("{macd}", macd)
      .replace("{ema}", ema);

    const sparkline = generateSeries(
      seed + i * 100,
      30,
      50 + rng() * 50,
      3
    );

    return {
      description,
      outcome: `${outcomeVal > 0 ? "+" : ""}${outcomeVal.toFixed(1)}%`,
      sparkline,
    };
  });
}

export function generatePrediction(ticker: string): Prediction {
  const upperTicker = ticker.toUpperCase();
  const seed = hashString(upperTicker);
  const rng = mulberry32(seed);

  const info = TICKER_DATA[upperTicker];
  const companyName = info?.name ?? `${upperTicker} Corp.`;
  const basePrice = info?.basePrice ?? 10 + rng() * 490;

  const directionRoll = rng();
  const direction: "bullish" | "bearish" | "neutral" =
    directionRoll < 0.55
      ? "bullish"
      : directionRoll < 0.85
        ? "bearish"
        : "neutral";

  const confidence = Math.floor(45 + rng() * 47);
  const targetOffset =
    direction === "neutral"
      ? (rng() - 0.5) * 0.02
      : direction === "bullish"
        ? 0.005 + rng() * 0.075
        : -(0.005 + rng() * 0.075);

  const priceTarget =
    Math.round(basePrice * (1 + targetOffset) * 100) / 100;
  const delta = targetOffset;

  const sentimentScore =
    direction === "bullish"
      ? 55 + Math.floor(rng() * 40)
      : direction === "bearish"
        ? 10 + Math.floor(rng() * 35)
        : 35 + Math.floor(rng() * 30);

  const sentimentLabel =
    sentimentScore >= 70
      ? "Very Positive"
      : sentimentScore >= 55
        ? "Positive"
        : sentimentScore >= 40
          ? "Neutral"
          : sentimentScore >= 25
            ? "Negative"
            : "Very Negative";

  const rsi =
    direction === "bullish"
      ? 50 + Math.floor(rng() * 20)
      : direction === "bearish"
        ? 30 + Math.floor(rng() * 20)
        : 40 + Math.floor(rng() * 20);

  const volumeRatio = Math.round((0.5 + rng() * 2) * 100) / 100;

  const chartData = generateSeries(seed + 100, 90, basePrice * 0.9, basePrice * 0.02);

  return {
    id: `pred-${seed}`,
    ticker: upperTicker,
    companyName,
    currentPrice: Math.round(basePrice * 100) / 100,
    direction,
    confidence,
    priceTarget,
    timeHorizon: "Next 5 trading days",
    delta,
    factors: generateFactors(seed, direction),
    sentiment: { score: sentimentScore, label: sentimentLabel },
    technicals: {
      rsi,
      macd: direction === "bullish" ? "bullish" : direction === "bearish" ? "bearish" : "neutral",
      ema: direction === "bullish" ? "above" : direction === "bearish" ? "below" : "crossing",
    },
    volume: {
      ratio: volumeRatio,
      unusual: volumeRatio > 1.8 || volumeRatio < 0.6,
      label:
        volumeRatio > 1.8
          ? "Unusually high volume"
          : volumeRatio < 0.6
            ? "Below average volume"
            : "Normal volume",
    },
    similarPatterns: generateSimilarPatterns(seed, direction),
    history: generateHistory(seed, upperTicker, basePrice),
    chartData,
    createdAt: new Date().toISOString(),
    status: "pending",
  };
}
