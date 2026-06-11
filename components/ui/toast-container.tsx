"use client";

import { X } from "lucide-react";

interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; variant: string }>;
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium bg-white border ${
            t.variant === "success"
              ? "border-sky/30"
              : t.variant === "error"
                ? "border-rose-300"
                : "border-sand"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full flex-shrink-0 ${
              t.variant === "success"
                ? "bg-sky"
                : t.variant === "error"
                  ? "bg-rose-400"
                  : "bg-sand"
            }`}
          />
          <span className="flex-1 text-[#1a1a2e]">{t.message}</span>
          <button
            onClick={() => onDismiss(t.id)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
