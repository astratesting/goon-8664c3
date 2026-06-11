"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // In demo mode, just show success
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-semibold text-[#1A1A2E]">
            Goon
          </Link>
          <h1 className="mt-4 text-xl font-semibold text-[#1F2937]">
            Reset password
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Enter your email and we&apos;ll send reset instructions
          </p>
        </div>

        {submitted ? (
          <div className="space-y-4">
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-700">
              If an account exists for <strong>{email}</strong>, you&apos;ll
              receive reset instructions shortly.
            </div>
            <Link
              href="/login"
              className="block w-full text-center rounded-lg bg-[#1F2937] py-2.5 text-sm font-medium text-white hover:bg-[#111827] transition-colors"
            >
              Back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#374151] mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[#D1D5DB] bg-white px-3 py-2.5 text-sm text-[#1F2937] placeholder-[#9CA3AF] focus:border-[#7CB9E8] focus:outline-none focus:ring-1 focus:ring-[#7CB9E8]"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#1F2937] py-2.5 text-sm font-medium text-white hover:bg-[#111827] transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>

            <p className="text-center text-sm text-[#6B7280]">
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-medium text-[#7CB9E8] hover:text-[#5BA3D9]"
              >
                Sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
