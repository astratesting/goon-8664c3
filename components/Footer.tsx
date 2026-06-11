import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink-black border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-heading text-xl font-bold text-gradient">
              Goon
            </Link>
            <span className="text-sm text-gray-500">
              AI-powered trade signals for retail traders.
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            <Link href="/auth/signin" className="hover:text-white transition-colors">
              Sign in
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Goon provides algorithmically generated trade signals for informational purposes
            only. It does not constitute financial advice. Trading involves risk, and past
            performance does not guarantee future results. Always conduct your own research
            before making investment decisions.
          </p>
          <p className="text-xs text-gray-600 mt-3">
            &copy; {new Date().getFullYear()} Goon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
