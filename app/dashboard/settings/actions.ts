"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateProfile(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session) return { ok: false, error: "Unauthorized" };

  const name = formData.get("name") as string;
  if (!name || name.length < 2) {
    return { ok: false, error: "Name must be at least 2 characters." };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name },
  });

  revalidatePath("/dashboard/settings");
  return { ok: true };
}

export async function updatePreferences(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session) return { ok: false, error: "Unauthorized" };

  const preferences = {
    dailyDigest: formData.get("dailyDigest") === "on",
    highConfidenceAlerts: formData.get("highConfidenceAlerts") === "on",
    watchlistAlerts: formData.get("watchlistAlerts") === "on",
    marketing: formData.get("marketing") === "on",
  };

  await prisma.user.update({
    where: { id: session.user.id },
    data: { preferences: JSON.stringify(preferences) },
  });

  revalidatePath("/dashboard/settings");
  return { ok: true };
}
