"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  userName?: string | null;
  userEmail?: string | null;
  className?: string;
}

export function UserMenu({ userName, userEmail, className }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const initial = (userName || userEmail || "U").charAt(0).toUpperCase();
  const displayName = userName || "User";

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-[#EEF2F6]"
        aria-label="User menu"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7CB9E8] text-sm font-semibold text-white select-none">
          {initial}
        </span>
        {userName && (
          <span className="hidden text-sm font-medium text-[#1F2937] sm:inline">
            {userName}
          </span>
        )}
        <svg
          className={cn("hidden h-4 w-4 text-[#6B7280] transition-transform sm:block", open && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-[0_4px_12px_rgba(31,41,55,.08)]">
          <div className="px-4 py-3 border-b border-[#E5E7EB]">
            <p className="text-sm font-medium text-[#1F2937]">{displayName}</p>
            {userEmail && (
              <p className="mt-0.5 truncate text-xs text-[#6B7280]">{userEmail}</p>
            )}
          </div>
          <div className="py-1">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-[#6B7280] transition-colors hover:bg-[#EEF2F6] hover:text-[#1F2937]"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
