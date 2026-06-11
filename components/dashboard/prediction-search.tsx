"use client";

import { useState, useTransition } from "react";
import { Brain, Search } from "lucide-react";

const TRENDING = ["AAPL", "NVDA", "TSLA", "MSFT", "AMZN", "META"];

export function PredictionSearch({
  onSearch,
}: {
  onSearch: (ticker: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [shaking, setShaking] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (ticker?: string) => {
    const q = (ticker ?? query).toUpperCase().trim();
    if (!/^[A-Z]{1,5}$/.test(q)) {
      setShaking(true);
      setTimeout(() => setShaking(false), 300);
      return;
    }
    startTransition(() => {
      onSearch(q);
      setQuery("");
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={`relative flex items-center ${shaking ? "animate-wiggle" : ""}`}
      >
        <div className="absolute left-4 text-gray-400">
          <Brain className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Search a ticker — AAPL, TSLA, NVDA…"
          className="w-full h-14 pl-12 pr-24 rounded-2xl border border-gray-200 bg-white text-[#1a1a2e] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky/30 focus:border-sky transition-all text-lg"
        />
        <button
          onClick={() => handleSubmit()}
          disabled={isPending}
          className="absolute right-2 px-5 py-2.5 rounded-xl bg-sky text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          {isPending ? "Analyzing…" : "Predict"}
        </button>
      </div>
      <div className="flex items-center gap-2 mt-4 justify-center flex-wrap">
        <span className="text-xs text-gray-400">Trending:</span>
        {TRENDING.map((t) => (
          <button
            key={t}
            onClick={() => handleSubmit(t)}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-600 hover:border-sky/40 hover:text-sky transition-all"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
