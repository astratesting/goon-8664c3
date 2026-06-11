"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addToWatchlist(ticker: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const normalized = ticker.trim().toUpperCase();
  if (!normalized) throw new Error("Ticker is required");

  // Prevent duplicates
  const existing = await prisma.watchlistItem.findFirst({
    where: { userId: session.user.id, ticker: normalized },
  });

  if (existing) {
    return { ok: false, error: "Ticker already in watchlist" };
  }

  await prisma.watchlistItem.create({
    data: { userId: session.user.id, ticker: normalized },
  });

  revalidatePath("/dashboard/watchlist");
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function removeFromWatchlist(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.watchlistItem.delete({
    where: { id, userId: session.user.id },
  });

  revalidatePath("/dashboard/watchlist");
  revalidatePath("/dashboard");
  return { ok: true };
}
