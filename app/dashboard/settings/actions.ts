"use server";

import { auth } from "@/lib/auth";
import { updateUser } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const name = (formData.get("name") as string)?.trim();
  if (!name || name.length < 2) {
    throw new Error("Name must be at least 2 characters.");
  }

  updateUser(session.user.id, { name });

  revalidatePath("/dashboard/settings");
}

export async function updatePreferences(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const preferences = {
    dailyDigest: formData.get("dailyDigest") === "on",
    highConfidenceAlerts: formData.get("highConfidenceAlerts") === "on",
    watchlistAlerts: formData.get("watchlistAlerts") === "on",
    marketing: formData.get("marketing") === "on",
  };

  updateUser(session.user.id, { preferences: JSON.stringify(preferences) });

  revalidatePath("/dashboard/settings");
}
