import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { updateProfile, updatePreferences } from "./actions";
import PreferencesForm from "./PreferencesForm";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, preferences: true },
  });

  if (!user) return null;

  let preferences: {
    dailyDigest: boolean;
    highConfidenceAlerts: boolean;
    watchlistAlerts: boolean;
    marketing: boolean;
  } = {
    dailyDigest: true,
    highConfidenceAlerts: true,
    watchlistAlerts: false,
    marketing: false,
  };

  if (user.preferences) {
    try {
      preferences = JSON.parse(user.preferences);
    } catch {
      // use defaults
    }
  }

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-2xl">
      {/* Profile card */}
      <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
        <h2 className="text-lg font-semibold text-[#1F2937] mb-4">Profile</h2>
        <form action={updateProfile} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#374151] mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={user.name || ""}
              className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2.5 text-sm text-[#1F2937] focus:outline-none focus:border-[#7CB9E8] focus:ring-1 focus:ring-[#7CB9E8]"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#374151] mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={user.email || ""}
              disabled
              className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2.5 text-sm text-[#1F2937] bg-[#F9FAFB] cursor-not-allowed"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-[#7CB9E8] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#7CB9E8]/90 transition-colors"
          >
            Save
          </button>
        </form>
      </div>

      {/* Notifications card */}
      <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
        <h2 className="text-lg font-semibold text-[#1F2937] mb-4">
          Notifications
        </h2>
        <PreferencesForm preferences={preferences} />
      </div>

      {/* Subscription card */}
      <div className="rounded-lg border border-[#E5E7EB] bg-white p-6">
        <h2 className="text-lg font-semibold text-[#1F2937] mb-4">
          Subscription
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#1F2937]">Current plan</p>
            <p className="text-xs text-[#6B7280] mt-1">Free tier</p>
          </div>
          <a
            href="/pricing"
            className="rounded-lg bg-[#1F2937] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#374151] transition-colors"
          >
            Upgrade to Pro
          </a>
        </div>
      </div>
    </div>
  );
}
