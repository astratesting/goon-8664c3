"use client";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    if (prefersReduced) window.scrollTo(0, top);
    else window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40">
      {/* Background glows */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #F5E6CC 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(126,200,227,0.4) 0%, rgba(168,230,207,0.3) 50%, transparent 70%)" }}
      />

      <Reveal className="relative mx-auto max-w-3xl text-center">
        <Badge variant="sky" className="mb-6">
          Early access &middot; 2026
        </Badge>

        <h1 className="text-[40px] font-bold leading-[1.15] tracking-tight text-[#1A1A2E] md:text-[64px]">
          Trade with a{" "}
          <em className="font-serif italic font-normal tracking-normal">thesis</em>, not a hunch.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#1A1A2E]/70 md:text-xl">
          Goon turns price action and live social sentiment into plain-English, probability-backed
          signals — days to weeks ahead of the chart.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button variant="primary" className="w-full sm:w-auto" onClick={() => scrollTo("cta")}>
            Join the waitlist
          </Button>
          <Button variant="ghost" className="w-full sm:w-auto" onClick={() => scrollTo("how")}>
            See how it works ↓
          </Button>
        </div>

        <p className="mt-6 text-sm text-[#1A1A2E]/40">
          No credit card. No spam. We&apos;ll only email when access opens.
        </p>
      </Reveal>
    </section>
  );
}
