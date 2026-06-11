import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import EmptyState from "@/components/EmptyState";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default async function PortfolioPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const items = await prisma.portfolioItem.findMany({
    where: { userId: session.user.id, hidden: false },
    orderBy: { ticker: "asc" },
  });

  if (items.length === 0) {
    return (
      <EmptyState
        icon={
          <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
          </svg>
        }
        title="No portfolio items"
        description="Add holdings from your predictions to track your portfolio."
      />
    );
  }

  const totalValue = items.reduce((sum, item) => sum + item.shares * item.avgCost, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-[#6B7280] mb-1">Holdings</p>
          <p className="text-2xl font-semibold text-[#1F2937]">{items.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-[#6B7280] mb-1">Total Value</p>
          <p className="text-2xl font-semibold text-[#1F2937]">${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </Card>
        <Card>
          <p className="text-sm text-[#6B7280] mb-1">Positions</p>
          <p className="text-2xl font-semibold text-[#1F2937]">{items.length}</p>
        </Card>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/dashboard/predictions/${item.ticker}`}
            className="flex items-center justify-between rounded-lg border border-[#E5E7EB] bg-white p-4 hover:border-[#7CB9E8]/30 transition-colors"
          >
            <div>
              <span className="font-semibold text-[#1F2937]">{item.ticker}</span>
              <span className="ml-3 text-sm text-[#6B7280]">{item.shares} shares</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-[#1F2937]">
                ${(item.shares * item.avgCost).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-[#6B7280]">Avg ${item.avgCost.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
