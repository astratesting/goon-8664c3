"use client";

import { clsx } from "clsx";
import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const el = ref.current;
    if (!el) return;

    if (prefersReduced) {
      el.classList.remove("opacity-0", "translate-y-4");
      el.classList.add("opacity-100", "translate-y-0");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.remove("opacity-0", "translate-y-4");
            el.classList.add("opacity-100", "translate-y-0");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={clsx(
        "opacity-0 translate-y-4 transition-all duration-[400ms] ease-out will-change-transform",
        className
      )}
    >
      {children}
    </div>
  );
}
