"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DollarSign, Users, ShoppingCart, Activity, TrendingUp, TrendingDown } from "lucide-react";

const iconMap = {
  DollarSign,
  Users,
  ShoppingCart,
  Activity,
};

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  comparison: string;
  icon: keyof typeof iconMap;
}

export function KpiCard({ title, value, change, trend, comparison, icon }: KpiCardProps) {
  const Icon = iconMap[icon];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="rounded-full bg-accent-subtle p-2 text-accent-subtle-fg">
            <Icon className="size-4" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">{value}</h3>
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 font-medium",
                trend === "up" ? "text-success-fg" : "text-danger-fg"
              )}
            >
              {trend === "up" ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
              {change}
            </span>
            <span className="text-muted-foreground">{comparison}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}