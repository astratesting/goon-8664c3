"use client";

import { useState } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      } else {
        setStatus("success");
        setMessage(data.message || "You're on the list!");
        setEmail("");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-50" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-sky/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-mint/10 rounded-full blur-3xl" />

      <div className="max-w-2xl mx-auto px-6 text-center relative">
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">
          Ready to trade with an edge?
        </h2>
        <p className="text-gray-500 text-lg mb-8 max-w-lg mx-auto">
          Join the waitlist to get early access and be the first to know when
          new models go live.
        </p>

        {status === "success" ? (
          <div className="bg-mint/10 border border-mint/30 rounded-2xl p-6 max-w-md mx-auto">
            <div className="w-12 h-12 gradient-sky-mint rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-semibold text-gray-800 mb-1">{message}</p>
            <p className="text-sm text-gray-500">
              We will reach out when your spot is ready.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-xl border border-gray-200 focus:border-sky focus:ring-2 focus:ring-sky/20 outline-none transition-all text-sm"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="gradient-sky-mint text-white font-semibold px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
            >
              {status === "loading" ? "Joining…" : "Join waitlist"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-sm text-red-500 mt-3">{message}</p>
        )}

        <p className="text-xs text-gray-400 mt-4">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
