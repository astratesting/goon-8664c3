import { NextResponse } from "next/server";
import { generatePrediction } from "@/lib/mock/prediction";
import { isValidTicker } from "@/lib/mock/tickers";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ticker: string }> }
) {
  const { ticker } = await params;
  const upper = ticker.toUpperCase();

  if (!isValidTicker(upper)) {
    return NextResponse.json(
      { error: "Ticker not found. Try AAPL, TSLA, NVDA…" },
      { status: 404 }
    );
  }

  const prediction = generatePrediction(upper);
  return NextResponse.json(prediction);
}
