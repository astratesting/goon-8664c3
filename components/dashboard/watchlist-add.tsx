"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export function WatchlistAdd({
  onAdd,
}: {
  onAdd: (ticker: string) => void;
}) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const ticker = value.toUpperCase().trim();
    if (/^[A-Z]{1,5}$/.test(ticker)) {
      onAdd(ticker);
      setValue("");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value.toUpperCase())}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Add ticker…"
        className="h-10 px-4 rounded-xl border border-gray-200 bg-white text-sm text-[#1a1a2e] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky/30 focus:border-sky transition-all w-40"
      />
      <button
        onClick={handleSubmit}
        className="h-10 px-4 rounded-xl bg-sky text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5"
      >
        <Plus className="w-4 h-4" />
        Add
      </button>
    </div>
  );
}
