import Atmark from "@/components/ui/Atmark";

const LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Sign in", href: "/auth/signin" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white px-6 py-10 md:px-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Atmark size={24} />
            <span className="text-base font-semibold text-[#1A1A2E]">Goon</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#6B7280] transition-colors hover:text-[#1A1A2E]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-[#E5E7EB] pt-6 text-center">
          <p className="text-xs leading-relaxed text-[#9CA3AF] max-w-2xl mx-auto">
            Goon provides algorithmically generated predictions for informational purposes
            only. It does not constitute financial advice. Trading involves risk, and past
            performance does not guarantee future results. Always conduct your own research
            before making investment decisions.
          </p>
          <p className="mt-3 text-xs text-[#D1D5DB]">
            &copy; {new Date().getFullYear()} Goon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
