import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function getTickerSeed(ticker: string): number {
  return ticker.toUpperCase().split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
}

const BASE_PRICES: Record<string, number> = {
  AAPL: 195.32,
  TSLA: 244.88,
  MSFT: 424.51,
  GOOGL: 174.93,
  AMZN: 184.72,
  NVDA: 872.15,
  META: 504.23,
  NFLX: 648.91,
  SPY: 528.44,
  QQQ: 448.67,
};

const BULLISH_FACTORS = [
  'Strong institutional buying detected in the last 5 trading sessions',
  'Positive earnings momentum with upward analyst revisions',
  'Technical breakout above key resistance level with high volume',
  'Favorable sector rotation with increasing capital inflows',
  'Improving macroeconomic indicators supporting growth outlook',
  'Insider buying activity suggests confidence in near-term performance',
  'Options flow shows unusual call activity at higher strike prices',
];

const BEARISH_FACTORS = [
  'Distribution patterns detected with declining institutional support',
  'Negative divergence between price and momentum indicators',
  'Approaching key resistance level with weakening volume',
  'Sector headwinds from changing regulatory environment',
  'Deteriorating fundamentals relative to peer group',
  'Unusual put option activity suggests hedging against decline',
  'Supply chain signals indicate potential revenue headwinds',
];

export async function GET(
  request: NextRequest,
  { params }: { params: { ticker: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ticker = params.ticker.toUpperCase();
  const seed = getTickerSeed(ticker);
  const basePrice = BASE_PRICES[ticker] || 100 + (seed % 900);

  const rand1 = seededRandom(seed);
  const rand2 = seededRandom(seed + 1);
  const rand3 = seededRandom(seed + 2);

  const isBullish = rand1 > 0.35;
  const confidence = Math.floor(65 + rand2 * 27);
  const priceChange = (rand3 * 0.12) - 0.02;
  const priceTarget = Math.round(basePrice * (1 + (isBullish ? priceChange : -priceChange)) * 100) / 100;

  const riskLevel = confidence > 82 ? 'low' : confidence > 72 ? 'medium' : 'high';

  const factorPool = isBullish ? BULLISH_FACTORS : BEARISH_FACTORS;
  const factorStart = seed % factorPool.length;
  const keyFactors = [
    factorPool[factorStart % factorPool.length],
    factorPool[(factorStart + 1) % factorPool.length],
    factorPool[(factorStart + 2) % factorPool.length],
  ];

  await new Promise((resolve) => setTimeout(resolve, 200 + (seed % 600)));

  return NextResponse.json({
    ticker,
    currentPrice: basePrice,
    predictedDirection: isBullish ? 'bullish' : 'bearish',
    confidence,
    priceTarget,
    keyFactors,
    riskLevel,
    generatedAt: new Date().toISOString(),
  });
}
