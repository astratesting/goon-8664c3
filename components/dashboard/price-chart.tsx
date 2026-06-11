"use client";

import { useState, useRef, useCallback, useMemo } from "react";

export function PriceChart({ data, ticker }: { data: number[]; ticker: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const width = 600;
  const height = 200;
  const padding = { top: 10, right: 10, bottom: 25, left: 10 };

  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const points = useMemo(() => {
    if (!data.length) return [];
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    return data.map((v, i) => ({
      x: padding.left + (i / (data.length - 1)) * chartW,
      y: padding.top + (1 - (v - min) / range) * chartH,
      value: v,
    }));
  }, [data, chartW, chartH]);

  const pathD = useMemo(
    () => "M " + points.map((p) => `${p.x},${p.y}`).join(" L "),
    [points]
  );

  const areaD = useMemo(
    () =>
      pathD +
      ` L ${points[points.length - 1]?.x ?? 0},${height - padding.bottom}` +
      ` L ${points[0]?.x ?? 0},${height - padding.bottom} Z`,
    [pathD, points]
  );

  const dates = useMemo(() => {
    const now = new Date();
    return data.map((_, i) => {
      const d = new Date(now.getTime() - (data.length - 1 - i) * 86400000);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    });
  }, [data]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * width;
      let closest = 0;
      let minDist = Infinity;
      points.forEach((p, i) => {
        const d = Math.abs(p.x - x);
        if (d < minDist) {
          minDist = d;
          closest = i;
        }
      });
      setHoverIdx(closest);
    },
    [points]
  );

  const gridLines = useMemo(() => {
    if (!data.length) return [];
    const min = Math.min(...data);
    const max = Math.max(...data);
    const step = (max - min) / 4;
    return Array.from({ length: 5 }, (_, i) => {
      const val = min + step * i;
      const y = padding.top + (1 - (val - min) / (max - min || 1)) * chartH;
      return { y, val };
    });
  }, [data, chartH]);

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoverIdx(null)}
      >
        {gridLines.map((g, i) => (
          <g key={i}>
            <line
              x1={padding.left}
              y1={g.y}
              x2={width - padding.right}
              y2={g.y}
              stroke="#f3f0eb"
              strokeWidth={1}
            />
            <text x={width - padding.right} y={g.y - 4} textAnchor="end" fontSize={9} fill="#9ca3af">
              ${g.val.toFixed(0)}
            </text>
          </g>
        ))}

        <path d={areaD} fill="url(#chartGradient)" />
        <path d={pathD} fill="none" stroke="#87CEEB" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#87CEEB" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#87CEEB" stopOpacity={0} />
          </linearGradient>
        </defs>

        {hoverIdx !== null && points[hoverIdx] && (
          <>
            <line
              x1={points[hoverIdx].x}
              y1={padding.top}
              x2={points[hoverIdx].x}
              y2={height - padding.bottom}
              stroke="#87CEEB"
              strokeWidth={1}
              strokeDasharray="4 2"
            />
            <circle cx={points[hoverIdx].x} cy={points[hoverIdx].y} r={4} fill="#87CEEB" stroke="white" strokeWidth={2} />
          </>
        )}
      </svg>

      {hoverIdx !== null && points[hoverIdx] && (
        <div
          className="absolute bg-white rounded-lg shadow-lg border border-gray-100 px-3 py-2 text-xs pointer-events-none z-10"
          style={{
            left: `${(points[hoverIdx].x / width) * 100}%`,
            top: 0,
            transform: "translate(-50%, -110%)",
          }}
        >
          <p className="font-medium text-[#1a1a2e]">${points[hoverIdx].value.toFixed(2)}</p>
          <p className="text-gray-400">{dates[hoverIdx]}</p>
        </div>
      )}
    </div>
  );
}
