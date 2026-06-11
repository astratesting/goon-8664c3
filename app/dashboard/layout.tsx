import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div className="flex min-h-screen bg-[#FAFAF5]">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[240px]">
        <TopBar userName={session.user.name} userEmail={session.user.email} />
        {children}
      </div>
    </div>
  );
}
