"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface PortfolioChartProps {
  data: { date: string; value: number }[];
}

export function PortfolioChart({ data }: PortfolioChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: "#6B7280" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
          tick={{ fontSize: 12, fill: "#6B7280" }}
          axisLine={false}
          tickLine={false}
          width={50}
        />
        <Tooltip
          formatter={(value: number) => [`$${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, "Value"]}
          contentStyle={{
            backgroundColor: "#FAFAF5",
            border: "1px solid #E5E7EB",
            borderRadius: "12px",
            fontSize: 13,
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#7CB9E8"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "#7CB9E8" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
