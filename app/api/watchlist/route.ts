import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getPrediction } from "@/lib/predictions";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = await prisma.watchlistItem.findMany({
    where: { userId: session.user.id },
    orderBy: { addedAt: "desc" },
  });

  const enriched = items.map((item) => {
    const prediction = getPrediction(item.ticker);
    return {
      ...item,
      company: prediction?.company || item.ticker,
      price: prediction?.price || 0,
      direction: prediction?.direction || "neutral",
      change: prediction ? ((prediction.target - prediction.price) / prediction.price * 100) : 0,
    };
  });

  return NextResponse.json(enriched);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { ticker } = await req.json();
  if (!ticker) return NextResponse.json({ error: "Ticker required" }, { status: 400 });

  const item = await prisma.watchlistItem.create({
    data: { userId: session.user.id, ticker: ticker.toUpperCase() },
  });

  return NextResponse.json(item);
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  await prisma.watchlistItem.delete({ where: { id, userId: session.user.id } });

  return NextResponse.json({ ok: true });
}
