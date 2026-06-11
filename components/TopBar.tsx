"use client";

import { UserMenu } from "@/components/UserMenu";
import { cn } from "@/lib/utils";

interface TopBarProps {
  title: string;
  userName?: string | null;
  userEmail?: string | null;
  className?: string;
}

export function TopBar({ title, userName, userEmail, className }: TopBarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#E5E7EB] bg-white/80 backdrop-blur-md px-6 lg:px-8",
        className
      )}
    >
      <nav aria-label="Breadcrumb">
        <h1 className="text-sm font-medium text-[#1F2937]">{title}</h1>
      </nav>
      <UserMenu userName={userName} userEmail={userEmail} />
    </header>
  );
}
