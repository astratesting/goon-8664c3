import { clsx } from "clsx";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "sand";
}

export default function Card({ variant = "default", className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border p-6",
        variant === "default" && "border-[#1A1A2E]/[0.06] bg-white",
        variant === "sand" && "border-[#1A1A2E]/[0.06] bg-[#F5E6CC]/40",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
