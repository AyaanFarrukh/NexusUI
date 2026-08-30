"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { revenueByCategoryData } from "@/data/dashboard";

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Revenue by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueByCategoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                cursor={{ fill: "var(--muted)" }}
                contentStyle={{ 
                  backgroundColor: "var(--surface)", 
                  border: "1px solid var(--border)", 
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "var(--foreground)"
                }} 
              />
              <Bar 
                dataKey="value" 
                fill="var(--accent)" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}