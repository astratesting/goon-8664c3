import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { updateUser, addWatchlistItem, findWatchlistItem } from "@/lib/db";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, experience, interests, watchlist, riskTolerance, sectors, investmentStyle } = body;

    // Update user profile
    const updates: Record<string, unknown> = { onboardingComplete: true };
    if (name && typeof name === "string") {
      updates.name = name.trim();
    }

    // Support both old format (experience/interests) and new format (riskTolerance/sectors/investmentStyle)
    if (riskTolerance || sectors || investmentStyle) {
      updates.preferences = JSON.stringify({ riskTolerance, sectors, investmentStyle });
    } else if (experience || interests) {
      updates.preferences = JSON.stringify({ experience, interests });
    }

    updateUser(session.user.id, updates);

    // Add watchlist items
    if (Array.isArray(watchlist)) {
      for (const ticker of watchlist) {
        if (typeof ticker === "string" && ticker.trim()) {
          const sym = ticker.trim().toUpperCase();
          if (!findWatchlistItem(session.user.id, sym)) {
            addWatchlistItem(session.user.id, sym);
          }
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Onboarding error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
