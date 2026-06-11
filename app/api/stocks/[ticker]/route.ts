import { NextRequest, NextResponse } from "next/server";
import { getPrediction } from "@/lib/predictions";
import { TICKER_DATA } from "@/lib/mock/tickers";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ ticker: string }> }
) {
  const { ticker } = await params;
  const upper = ticker.toUpperCase();
  const tickerInfo = TICKER_DATA[upper];
  const prediction = getPrediction(upper);

  if (!tickerInfo && !prediction) {
    return NextResponse.json({ error: "Ticker not found" }, { status: 404 });
  }

  return NextResponse.json({
    ticker: upper,
    company: tickerInfo?.name ?? prediction?.companyName ?? upper,
    basePrice: tickerInfo?.basePrice ?? prediction?.currentPrice ?? 0,
    prediction: prediction ?? null,
  });
}
