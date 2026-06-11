"use client";

import { clsx } from "clsx";
import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7EC8E3] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variant === "primary" &&
            "bg-[#1A1A2E] text-white hover:bg-[#1A1A2E]/90 active:bg-[#1A1A2E]/80",
          variant === "secondary" &&
            "border border-[#1A1A2E]/15 bg-white text-[#1A1A2E] hover:border-[#1A1A2E]/30 hover:bg-[#FAFAF8]",
          variant === "ghost" &&
            "text-[#1A1A2E]/70 hover:text-[#1A1A2E] underline-offset-4 hover:underline",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
