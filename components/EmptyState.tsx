import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      <div className="mb-4 text-[#9CA3AF]">{icon}</div>
      <h3 className="font-serif text-lg font-semibold text-[#1F2937] mb-2">{title}</h3>
      <p className="font-sans text-sm text-[#6B7280] max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
