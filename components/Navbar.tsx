"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ink-black/80 backdrop-blur-lg border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-heading text-2xl font-bold text-gradient">
          Goon
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
            Pricing
          </a>
          <a href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors">
            FAQ
          </a>
          <Link
            href="/auth/signin"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className="gradient-sky-mint text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-gray-400"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-ink-black/95 backdrop-blur-lg border-t border-white/5 px-6 py-6 space-y-4">
          <a href="#features" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white">Features</a>
          <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white">How It Works</a>
          <a href="#pricing" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white">Pricing</a>
          <a href="#faq" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white">FAQ</a>
          <Link href="/auth/signin" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-white">Sign in</Link>
          <Link
            href="/auth/signup"
            onClick={() => setMobileOpen(false)}
            className="block text-center gradient-sky-mint text-white font-semibold py-3 rounded-xl"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
