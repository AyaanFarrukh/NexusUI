"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["var(--accent)", "var(--success)", "var(--warning)", "var(--info)", "var(--muted-foreground)"];

interface DonutChartProps {
  data: { name: string; value: number }[];
  centerLabel?: string;
}

export function DonutChart({ data, centerLabel }: DonutChartProps) {
  return (
    <div className="relative h-[250px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="var(--surface)" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              fontSize: "12px",
              color: "var(--foreground)",
            }}
            formatter={(value) => [`${value}%`, "Share"]}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            iconSize={8}
            formatter={(value) => <span style={{ color: "var(--muted-foreground)", fontSize: "12px" }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
      {centerLabel && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-foreground">{centerLabel}</span>
        </div>
      )}
    </div>
  );
}