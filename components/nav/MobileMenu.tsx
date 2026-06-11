"use client";

import { useEffect, useRef } from "react";
import Atmark from "@/components/ui/Atmark";
import Button from "@/components/ui/Button";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export default function MobileMenu({ open, onClose, links, onNavigate }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    // Focus trap
    const panel = panelRef.current;
    if (panel) {
      const focusable = panel.querySelectorAll<HTMLElement>(
        "a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      if (focusable.length > 0) focusable[0].focus();
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[60] flex flex-col bg-[#FAFAF8] px-6 pt-4 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-[#1A1A2E]" aria-label="Goon home">
          <Atmark size={28} />
          <span className="text-lg font-semibold tracking-tight">Goon</span>
        </a>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>
      </div>

      <div className="mt-12 flex flex-1 flex-col gap-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => onNavigate(e, link.href)}
            className="rounded-xl px-4 py-4 text-2xl font-medium text-[#1A1A2E] transition-colors hover:bg-[#F5E6CC]/40"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="pb-8">
        <Button
          variant="primary"
          className="w-full py-4 text-base"
          onClick={() => {
            onClose();
            const el = document.getElementById("cta");
            if (el) {
              const top = el.getBoundingClientRect().top + window.scrollY - 72;
              window.scrollTo({ top, behavior: "smooth" });
            }
          }}
        >
          Join waitlist
        </Button>
      </div>
    </div>
  );
}
