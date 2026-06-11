import { clsx } from "clsx";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "sky" | "mint" | "amber";
}

export default function Badge({ variant = "sky", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variant === "sky" && "bg-[#7EC8E3]/15 text-[#1A1A2E]/80",
        variant === "mint" && "bg-[#A8E6CF]/20 text-[#1A1A2E]/80",
        variant === "amber" && "bg-[#E8B86D]/20 text-[#1A1A2E]/80",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
