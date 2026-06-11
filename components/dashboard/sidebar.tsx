"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Brain, Star, BarChart3, Briefcase, Clock, Settings, LogOut } from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Predictions", href: "/dashboard/predictions", icon: Brain },
  { label: "Watchlist", href: "/dashboard/watchlist", icon: Star },
  { label: "Market", href: "/dashboard/market", icon: BarChart3 },
  { label: "Portfolio", href: "/dashboard/portfolio", icon: Briefcase },
  { label: "Trade History", href: "/dashboard/trades", icon: Clock },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar({ email }: { email?: string }) {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    window.location.href = "/auth/signin";
  };

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-100 min-h-screen sticky top-0">
      <div className="p-6">
        <Link href="/" className="font-serif text-2xl font-bold text-gradient">
          Goon
        </Link>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-sky/10 text-sky"
                  : "text-gray-500 hover:text-[#1a1a2e] hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        {email && (
          <p className="text-xs text-gray-400 mb-3 truncate px-1">{email}</p>
        )}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
