import { auth } from "@/lib/auth";
import { getPrediction, getTopPredictions } from "@/lib/predictions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const ticker = req.nextUrl.searchParams.get("ticker");
  if (ticker) {
    const prediction = getPrediction(ticker);
    if (!prediction) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(prediction);
  }

  return NextResponse.json(getTopPredictions(20));
}
