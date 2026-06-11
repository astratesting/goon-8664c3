import Link from "next/link";

export default function Hero() {
  return (
    <section className="gradient-hero pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
      {/* Ambient decorative orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-sky/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-mint/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      <div className="absolute top-1/2 right-10 w-64 h-64 bg-sand/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "-1.5s" }} />

      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-sky/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-mint animate-pulse-soft" />
          <span className="text-xs font-medium text-gray-600 tracking-wide uppercase">
            AI-Powered Trade Signals
          </span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
          Trade signals backed by{" "}
          <span className="text-gradient">deep learning</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
          Goon uses autonomous deep-learning models to analyze historical price action and
          live social sentiment — then delivers clear, probability-backed buy and sell signals.
          No PhD required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/auth/signup"
            className="gradient-sky-mint text-white font-semibold px-8 py-4 rounded-xl text-lg hover:opacity-90 transition-opacity shadow-lg shadow-sky/20"
          >
            Start free trial
          </Link>
          <a
            href="#how-it-works"
            className="text-gray-600 font-medium px-8 py-4 rounded-xl hover:bg-white/50 transition-colors flex items-center gap-2"
          >
            See how it works
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Signal preview card */}
        <div className="mt-16 max-w-lg mx-auto">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 card-glow border border-white/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="font-serif text-lg font-bold">AAPL</span>
                <span className="bg-mint/20 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase">
                  Buy
                </span>
              </div>
              <span className="text-xs text-gray-400">Live signal</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">Model confidence</span>
              <span className="text-xs font-semibold">78%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
              <div className="bg-gradient-to-r from-mint to-emerald-400 h-1.5 rounded-full" style={{ width: "78%" }} />
            </div>
            <p className="text-xs text-gray-500 text-left leading-relaxed">
              Bullish sentiment surge detected across social channels. Ascending price
              pattern aligns with historical momentum continuation features.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
