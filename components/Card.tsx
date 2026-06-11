import { cn } from "@/lib/utils";

export function Card({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-[#EEF2F6] rounded-2xl p-6 border border-[#E5E7EB] shadow-[0_1px_2px_rgba(31,41,55,.04),0_8px_24px_rgba(31,41,55,.04)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
