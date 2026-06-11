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
        <Link href="/" className="font-heading text-2xl font-bold text-cobalt">
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
            className="bg-cobalt text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-cobalt/90 transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-ink-black/95 backdrop-blur-lg border-t border-white/5 px-6 py-4 space-y-4">
          <a href="#features" className="block text-sm text-gray-400 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>
            Features
          </a>
          <a href="#how-it-works" className="block text-sm text-gray-400 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>
            How It Works
          </a>
          <a href="#pricing" className="block text-sm text-gray-400 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>
            Pricing
          </a>
          <a href="#faq" className="block text-sm text-gray-400 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>
            FAQ
          </a>
          <Link href="/auth/signin" className="block text-sm text-gray-400 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className="block bg-cobalt text-white text-sm font-semibold px-5 py-2.5 rounded-xl text-center hover:bg-cobalt/90 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
