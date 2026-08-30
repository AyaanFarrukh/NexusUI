import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileStatsProps {
  stats: { label: string; value: string; change?: string; trend?: "up" | "down" }[];
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 min-w-0">
      {stats.map((stat) => (
        <Card key={stat.label} className="min-w-0">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <h3 className="mt-1 text-2xl font-bold text-foreground">{stat.value}</h3>
            {stat.change && (
              <p
                className={cn(
                  "mt-1 inline-flex items-center gap-1 text-xs font-medium",
                  stat.trend === "up" ? "text-success-fg" : "text-danger-fg"
                )}
              >
                {stat.trend === "up" ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                {stat.change}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}