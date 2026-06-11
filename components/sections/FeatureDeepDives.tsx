import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import SignalCard from "@/components/ui/SignalCard";
import Reveal from "@/components/ui/Reveal";

const features = [
  {
    eyebrow: "Deep learning",
    title: "Predictions powered by deep learning",
    body: "Goon's model fuses historical price action with aggregated public social sentiment — identifying patterns that neither data source reveals alone.",
    bullets: [
      "Multi-source data fusion — price, volume, sentiment",
      "Continuously retrained on new market conditions",
      "No black-box magic — every signal comes with an explanation",
    ],
    signal: {
      ticker: "NVDA",
      direction: "Up" as const,
      probability: 72,
      horizon: "5–7 days",
      risk: "Medium" as const,
      why: "Strong social momentum around AI chip demand combined with a bullish breakout pattern on the daily chart.",
    },
    reverse: false,
  },
  {
    eyebrow: "Probability",
    title: "Probability, not promises",
    body: "Every signal includes a calibrated probability and a confidence band — so you can size positions and manage risk with real numbers, not gut feelings.",
    bullets: [
      "Calibrated % on every signal — not just direction",
      "Confidence bands show model certainty",
      "Risk level rated: Low, Medium, or High",
    ],
    signal: {
      ticker: "TSLA",
      direction: "Down" as const,
      probability: 65,
      horizon: "3–5 days",
      risk: "High" as const,
      why: "Negative sentiment shift after earnings guidance, paired with a head-and-shoulders pattern forming on the 4H chart.",
    },
    reverse: true,
  },
  {
    eyebrow: "Plain English",
    title: "Explanations you can actually read",
    body: "No jargon walls. Goon explains why it thinks what it thinks in a short paragraph any trader can understand — beginner or pro.",
    bullets: [
      "One-paragraph 'Why' on every signal",
      "No chart PhD required",
      "Transparent about what the model considered",
    ],
    signal: {
      ticker: "AAPL",
      direction: "Up" as const,
      probability: 58,
      horizon: "7–10 days",
      risk: "Low" as const,
      why: "Stable social sentiment with a seasonal uptrend pattern and strong institutional accumulation signals in recent volume data.",
    },
    reverse: false,
  },
  {
    eyebrow: "Weeks ahead",
    title: "Forecast weeks ahead, not seconds",
    body: "Built for swing and short-term position traders — not HFT bots. Goon looks days to weeks into the future, giving you time to plan, not just react.",
    bullets: [
      "Forecasts from 3 days to 3 weeks out",
      "Designed for position traders, not scalpers",
      "Time to plan entries and exits calmly",
    ],
    signal: {
      ticker: "SPY",
      direction: "Sideways" as const,
      probability: 54,
      horizon: "10–14 days",
      risk: "Low" as const,
      why: "Mixed macro signals and neutral sentiment suggest consolidation. No strong directional catalyst visible in the current data window.",
    },
    reverse: true,
  },
];

export default function FeatureDeepDives() {
  return (
    <Section id="features">
      <Reveal>
        <p className="mb-2 text-sm font-medium text-[#1A1A2E]/50">Features</p>
        <h2 className="mb-16 text-3xl font-semibold leading-tight text-[#1A1A2E] md:text-4xl">
          Built for how you actually trade
        </h2>
      </Reveal>

      <div className="space-y-24">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 50}>
            <div
              className={`flex flex-col items-center gap-10 lg:flex-row ${
                f.reverse ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <Badge variant="sky" className="mb-4">
                  {f.eyebrow}
                </Badge>
                <h3 className="mb-4 text-2xl font-semibold text-[#1A1A2E] md:text-3xl">
                  {f.title}
                </h3>
                <p className="mb-6 text-base leading-relaxed text-[#1A1A2E]/70">{f.body}</p>
                <ul className="space-y-3">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-[#1A1A2E]/70">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#7EC8E3]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-1 justify-center">
                <SignalCard {...f.signal} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
