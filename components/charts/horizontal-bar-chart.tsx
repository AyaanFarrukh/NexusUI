"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface HorizontalBarChartProps {
  data: Record<string, any>[];
  dataKey: string;
  nameKey: string;
  color?: string;
}

export function HorizontalBarChart({ data, dataKey, nameKey, color = "var(--accent)" }: HorizontalBarChartProps) {
  return (
    <div className="h-[250px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey={nameKey}
            width={110}
            stroke="var(--muted-foreground)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            cursor={{ fill: "var(--muted)" }}
            contentStyle={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              fontSize: "12px",
              color: "var(--foreground)",
            }}
          />
          <Bar dataKey={dataKey} fill={color} radius={[0, 4, 4, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}