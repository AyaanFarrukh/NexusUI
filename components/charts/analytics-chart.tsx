"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { analyticsData } from "@/data/dashboard";
import { cn } from "@/lib/utils";

const timeframes = [
  { label: "7D", value: "7d" },
  { label: "30D", value: "30d" },
  { label: "90D", value: "90d" },
  { label: "12M", value: "12m" },
] as const;

type Timeframe = (typeof timeframes)[number]["value"];

export function AnalyticsChart() {
  const [timeframe, setTimeframe] = useState<Timeframe>("7d");
  const data = analyticsData[timeframe];

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">User & Revenue Analytics</CardTitle>
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {timeframes.map((tf) => (
            <Button
              key={tf.value}
              variant={timeframe === tf.value ? "secondary" : "ghost"}
              size="xs"
              onClick={() => setTimeframe(tf.value)}
              className={cn(
                "h-6 px-2.5 text-xs",
                timeframe === tf.value && "bg-surface shadow-xs"
              )}
            >
              {tf.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--success)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--success)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="var(--muted-foreground)" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="var(--muted-foreground)" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "var(--surface)", 
                  border: "1px solid var(--border)", 
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "var(--foreground)"
                }} 
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--accent)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="users"
                stroke="var(--success)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorUsers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}