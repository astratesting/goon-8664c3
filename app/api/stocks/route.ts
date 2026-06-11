import { NextRequest, NextResponse } from "next/server";
import { TICKERS } from "@/lib/predictions";
import { getPrediction } from "@/lib/predictions";
import { TICKER_DATA } from "@/lib/mock/tickers";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.toUpperCase().trim();

  if (!q) {
    return NextResponse.json(TICKERS.slice(0, 20));
  }

  const matches = TICKERS.filter(
    (t) =>
      t.ticker.toUpperCase().includes(q) ||
      t.company.toUpperCase().includes(q)
  ).slice(0, 10);

  const results = matches.map((m) => {
    const prediction = getPrediction(m.ticker);
    const tickerInfo = TICKER_DATA[m.ticker];
    return {
      ticker: m.ticker,
      company: m.company,
      basePrice: tickerInfo?.basePrice ?? 0,
      prediction: prediction
        ? {
            direction: prediction.direction,
            confidence: prediction.confidence,
            priceTarget: prediction.priceTarget,
            currentPrice: prediction.currentPrice,
          }
        : null,
    };
  });

  return NextResponse.json(results);
}
