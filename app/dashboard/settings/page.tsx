"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Card from "@/components/ui/Card";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6 max-w-xl">
      <Card>
        <h2 className="text-lg font-semibold text-[#1F2937] mb-4">Account</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">Name</label>
            <input
              type="text"
              defaultValue={session?.user?.name || ""}
              className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2.5 text-sm text-[#1F2937] focus:outline-none focus:border-[#7CB9E8] focus:ring-1 focus:ring-[#7CB9E8]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">Email</label>
            <input
              type="email"
              defaultValue={session?.user?.email || ""}
              disabled
              className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2.5 text-sm text-[#1F2937] bg-[#F9FAFB] cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">Plan</label>
            <div className="rounded-lg border border-[#D1D5DB] bg-[#F9FAFB] px-3 py-2.5 text-sm text-[#6B7280]">
              Free tier
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-[#1F2937] mb-4">Notifications</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-[#D1D5DB] text-[#7CB9E8] focus:ring-[#7CB9E8]" />
            <span className="text-sm text-[#374151]">Daily prediction digest</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-[#D1D5DB] text-[#7CB9E8] focus:ring-[#7CB9E8]" />
            <span className="text-sm text-[#374151]">New signal alerts</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="h-4 w-4 rounded border-[#D1D5DB] text-[#7CB9E8] focus:ring-[#7CB9E8]" />
            <span className="text-sm text-[#374151]">Weekly portfolio summary</span>
          </label>
        </div>
      </Card>

      {saved && (
        <div className="rounded-lg bg-[#98D8C8]/20 border border-[#98D8C8]/30 p-3 text-sm text-[#1F2937]">
          Settings saved successfully.
        </div>
      )}
    </div>
  );
}
