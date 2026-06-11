"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  TrendingUp,
  Eye,
  Briefcase,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Predictions", href: "/dashboard/predictions", icon: TrendingUp },
  { label: "Watchlist", href: "/dashboard/watchlist", icon: Eye },
  { label: "Portfolio", href: "/dashboard/portfolio", icon: Briefcase },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
] as const;

interface SidebarProps {
  tier?: "Free" | "Pro";
  className?: string;
}

export function Sidebar({ tier = "Free", className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden lg:flex lg:w-60 lg:flex-col lg:fixed lg:inset-y-0 border-r border-[#E5E7EB] bg-white",
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6 border-b border-[#E5E7EB]">
        <span className="font-serif text-xl font-semibold tracking-tight text-[#1F2937]">
          Goon
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#7CB9E8]/10 text-[#1F2937]"
                  : "text-[#6B7280] hover:bg-[#EEF2F6] hover:text-[#1F2937]"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  isActive ? "text-[#7CB9E8]" : "text-[#9CA3AF]"
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Tier Badge */}
      <div className="px-3 py-4 border-t border-[#E5E7EB]">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
              tier === "Pro"
                ? "bg-[#98D8C8]/20 text-emerald-800"
                : "bg-[#EEF2F6] text-[#6B7280]"
            )}
          >
            {tier}
          </span>
          <span className="text-xs text-[#6B7280]">tier</span>
        </div>
      </div>
    </aside>
  );
}
