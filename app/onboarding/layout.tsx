import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { findUserById } from "@/lib/db";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  // If already onboarded, skip to dashboard
  const user = findUserById(session.user.id);
  if (user?.onboardingComplete) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <div className="mx-auto max-w-2xl px-4 py-12">
        {children}
      </div>
    </div>
  );
}
