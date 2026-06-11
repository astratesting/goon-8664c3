import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getPredictions } from "@/lib/predictions";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { tickers } = await request.json();

    if (!Array.isArray(tickers) || tickers.length === 0) {
      return NextResponse.json(
        { error: "Provide at least one ticker" },
        { status: 400 }
      );
    }

    const predictions = tickers
      .map((t: string) => {
        const results = getPredictions({ search: t.toUpperCase() });
        return results[0] ?? null;
      })
      .filter(Boolean);

    return NextResponse.json({ predictions });
  } catch (err) {
    console.error("Prediction generate error:", err);
    return NextResponse.json(
      { error: "Failed to generate predictions" },
      { status: 500 }
    );
  }
}
