import { auth } from "@/lib/auth";
import { getWatchlistItems, addWatchlistItem, removeWatchlistItem } from "@/lib/db";
import { getPrediction } from "@/lib/predictions";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = getWatchlistItems(session.user.id);

  const enriched = items.map((item) => {
    const prediction = getPrediction(item.ticker);
    return {
      ...item,
      company: prediction?.companyName || item.ticker,
      price: prediction?.currentPrice || 0,
      direction: prediction?.direction || "neutral",
      change: prediction ? ((prediction.priceTarget - prediction.currentPrice) / prediction.currentPrice * 100) : 0,
    };
  });

  return NextResponse.json(enriched);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { ticker } = await req.json();
  if (!ticker) return NextResponse.json({ error: "Ticker required" }, { status: 400 });

  const item = addWatchlistItem(session.user.id, ticker.toUpperCase());

  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  removeWatchlistItem(id, session.user.id);

  return NextResponse.json({ ok: true });
}
