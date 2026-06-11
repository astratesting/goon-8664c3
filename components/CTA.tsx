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
    <section className="py-20 md:py-28 bg-ink-black relative overflow-hidden data-grid">
      <div className="absolute inset-0 gradient-hero opacity-50" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-cobalt/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-goon-green/10 rounded-full blur-3xl" />

      <div className="max-w-2xl mx-auto px-6 text-center relative">
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 text-white">
          Ready to trade with an edge?
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
          Join the waitlist for early access. Be the first to know when
          new models go live.
        </p>

        {status === "success" ? (
          <div className="bg-goon-green/10 border border-goon-green/30 rounded-2xl p-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-goon-green/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-goon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white font-semibold text-lg">{message}</p>
            <p className="text-gray-400 text-sm mt-1">
              We&apos;ll notify you when it&apos;s your turn.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-cobalt/50 focus:ring-1 focus:ring-cobalt/30 transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-cobalt text-white font-semibold px-8 py-4 rounded-xl hover:bg-cobalt/90 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {status === "loading" ? "Joining..." : "Join waitlist"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-red-400 text-sm mt-3">{message}</p>
        )}

        <p className="text-gray-600 text-xs mt-6">
          No spam. Unsubscribe anytime. We respect your inbox.
        </p>
      </div>
    </section>
  );
}
