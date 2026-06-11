import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Goon — AI-Powered Trade Signals for Retail Traders",
  description:
    "Deep-learning models analyze historical price action and live social sentiment to deliver probability-backed buy and sell signals. No PhD required.",
  openGraph: {
    title: "Goon — AI-Powered Trade Signals",
    description:
      "Deep-learning models analyze price action and social sentiment to deliver probability-backed trade signals.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-softwhite text-[#1a1a2e] font-sans">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
