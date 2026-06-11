"use client";

import { useTransition } from "react";
import { updatePreferences } from "./actions";

interface PreferencesFormProps {
  preferences: {
    dailyDigest: boolean;
    highConfidenceAlerts: boolean;
    watchlistAlerts: boolean;
    marketing: boolean;
  };
}

const TOGGLE_ITEMS = [
  { name: "dailyDigest", label: "Daily digest", description: "Receive a daily summary of predictions and market sentiment." },
  { name: "highConfidenceAlerts", label: "High-confidence alerts", description: "Get notified when a prediction exceeds 85% confidence." },
  { name: "watchlistAlerts", label: "Watchlist price alerts", description: "Alerts when watchlist items hit target prices." },
  { name: "marketing", label: "Marketing", description: "Product updates and feature announcements." },
] as const;

export default function PreferencesForm({ preferences }: PreferencesFormProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <form action={(formData) => startTransition(() => updatePreferences(formData))} className="space-y-4">
      {TOGGLE_ITEMS.map((item) => (
        <label key={item.name} className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name={item.name}
            defaultChecked={preferences[item.name]}
            className="mt-0.5 h-4 w-4 rounded border-[#D1D5DB] text-[#7CB9E8] focus:ring-[#7CB9E8]"
          />
          <div>
            <span className="text-sm font-medium text-[#1F2937]">{item.label}</span>
            <p className="text-xs text-[#6B7280] mt-0.5">{item.description}</p>
          </div>
        </label>
      ))}
      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-[#7CB9E8] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#7CB9E8]/90 disabled:opacity-50 transition-colors mt-2"
      >
        {isPending ? "Saving..." : "Save preferences"}
      </button>
    </form>
  );
}
