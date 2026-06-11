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
        "ink-soft": "#6B7280",
        cloud: "#EEF2F6",
        line: "#E5E7EB",
      },
      fontFamily: {
        sans: ["Geist", "system-ui", "sans-serif"],
        serif: ["Lora", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
