"use client";

import { useState } from "react";
import { removeFromWatchlist } from "./actions";

export default function RemoveButton({ id }: { id: string }) {
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setPending(true);
    try {
      await removeFromWatchlist(id);
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className="rounded p-1 text-[#9CA3AF] hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
      aria-label="Remove from watchlist"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M4 4l8 8m0-8l-8 8" />
      </svg>
    </button>
  );
}
