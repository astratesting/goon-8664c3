import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF8] px-4">
      <h1 className="text-6xl font-bold text-[#1A1A2E] mb-4">404</h1>
      <p className="text-lg text-[#6B7280] mb-8">Page not found</p>
      <Link
        href="/"
        className="rounded-lg bg-[#1A1A2E] text-white px-6 py-3 text-sm font-medium hover:bg-[#1A1A2E]/90 transition-colors"
      >
        Go home
      </Link>
    </div>
  );
}
