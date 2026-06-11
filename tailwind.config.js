/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: "#7CB9E8",
        mint: "#98D8C8",
        sand: "#E8D5B7",
        softwhite: "#FAFAFA",
        paper: "#FAFAF5",
        ink: "#1F2937",
        "ink-soft": "#64748B",
        cloud: "#EEF2F6",
        line: "#E5E7EB",
        "ink-black": "#0A1628",
        indigo: "#2563EB",
        cyan: "#06b6d4",
        "electric-teal": "#10B981",
        cobalt: "#2563EB",
        "deep-navy": "#0A1628",
        "cool-slate": "#64748B",
        "goon-green": "#10B981",
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        serif: ["Lora", "Georgia", "serif"],
        heading: ["Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
