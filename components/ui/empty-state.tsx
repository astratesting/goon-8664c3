import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  headline: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function EmptyState({
  icon: Icon,
  headline,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-sky/10 flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-sky" />
      </div>
      <h3 className="text-lg font-semibold text-[#1a1a2e] mb-2">{headline}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{description}</p>
      {action &&
        (action.href ? (
          <a
            href={action.href}
            className="px-5 py-2.5 rounded-xl bg-sky text-white font-medium text-sm hover:opacity-90 transition-opacity shadow-sm"
          >
            {action.label}
          </a>
        ) : (
          <button
            onClick={action.onClick}
            className="px-5 py-2.5 rounded-xl bg-sky text-white font-medium text-sm hover:opacity-90 transition-opacity shadow-sm"
          >
            {action.label}
          </button>
        ))}
    </div>
  );
}
