"use server";

import { auth } from "@/lib/auth";
import { findWatchlistItem, addWatchlistItem, removeWatchlistItem } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addToWatchlist(ticker: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const normalized = ticker.trim().toUpperCase();
  if (!normalized) throw new Error("Ticker is required");

  const existing = findWatchlistItem(session.user.id, normalized);
  if (existing) {
    return { ok: false, error: "Ticker already in watchlist" };
  }

  addWatchlistItem(session.user.id, normalized);

  revalidatePath("/dashboard/watchlist");
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function removeFromWatchlist(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  removeWatchlistItem(id, session.user.id);

  revalidatePath("/dashboard/watchlist");
  revalidatePath("/dashboard");
  return { ok: true };
}
