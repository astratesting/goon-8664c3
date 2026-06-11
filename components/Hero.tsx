import Link from "next/link";

export default function Hero() {
  return (
    <section className="gradient-hero pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden data-grid">
      {/* Ambient decorative orbs — brand colors */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-flame-orange/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-magenta/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      <div className="absolute top-1/2 right-10 w-64 h-64 bg-acid-green/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-1.5s" }} />

      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-flame-orange/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-acid-green animate-pulse-soft" />
          <span className="text-xs font-mono font-medium text-gray-400 tracking-wide uppercase">
            AI-Powered Stock Predictions
          </span>
        </div>

        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6 text-white">
          Your AI Trading Edge{" "}
          <span className="text-gradient">— Delivered</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Get probability-backed trade signals from deep-learning models that analyze
          alternative data — executive speech patterns, supply chain logistics, social
          sentiment — all explained in plain English. No financial background required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/auth/signup"
            className="gradient-sky-mint text-white font-semibold px-8 py-4 rounded-xl text-lg hover:opacity-90 transition-opacity"
          >
            Get early access
          </Link>
          <a
            href="#how-it-works"
            className="text-gray-400 hover:text-white font-medium px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 transition-all text-lg"
          >
            See how it works
          </a>
        </div>

        {/* Signal preview card */}
        <div className="mt-16 max-w-sm mx-auto bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-left">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wide">Signal</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-heading text-xl font-bold text-white">AAPL</span>
                <span className="bg-acid-green/10 text-acid-green text-xs font-bold px-2 py-0.5 rounded-md">
                  BUY
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500 uppercase tracking-wide">Confidence</span>
              <div className="text-2xl font-bold text-flame-orange mt-1">78%</div>
            </div>
          </div>
          <div className="w-full bg-white/5 rounded-full h-2 mb-4">
            <div className="gradient-sky-mint h-2 rounded-full" style={{ width: "78%" }} />
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            <span className="text-gray-300 font-medium">Rationale:</span>{" "}
            Executive sentiment shifted positive on the latest earnings call combined with
            strengthening supply-chain signals from Asian manufacturers.
          </p>
        </div>
      </div>
    </section>
  );
}
