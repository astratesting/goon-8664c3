"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addToWatchlist(ticker: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.watchlistItem.create({
    data: { userId: session.user.id, ticker: ticker.toUpperCase() },
  });

  revalidatePath("/dashboard/watchlist");
  revalidatePath("/dashboard");
}

export async function removeFromWatchlist(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.watchlistItem.delete({
    where: { id, userId: session.user.id },
  });

  revalidatePath("/dashboard/watchlist");
  revalidatePath("/dashboard");
}
