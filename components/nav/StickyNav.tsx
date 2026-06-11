"use client";

import { useEffect, useState, useCallback } from "react";
import Atmark from "@/components/ui/Atmark";
import Button from "@/components/ui/Button";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 8);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    if (prefersReduced) {
      window.scrollTo(0, top);
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMenuOpen(false);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-[#FAFAF8]/80 backdrop-blur-md border-b border-[#1A1A2E]/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 md:px-8">
          <a
            href="/"
            className="flex items-center gap-2 text-[#1A1A2E]"
            aria-label="Goon home"
          >
            <Atmark size={28} />
            <span className="text-lg font-semibold tracking-tight">Goon</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="text-sm text-[#1A1A2E]/60 transition-colors hover:text-[#1A1A2E]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              variant="primary"
              className="px-5 py-2 text-sm"
              onClick={() => {
                const el = document.getElementById("cta");
                if (el) {
                  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                  const top = el.getBoundingClientRect().top + window.scrollY - 72;
                  if (prefersReduced) window.scrollTo(0, top);
                  else window.scrollTo({ top, behavior: "smooth" });
                }
              }}
            >
              Join waitlist
            </Button>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </nav>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
        onNavigate={scrollTo}
      />
    </>
  );
}
