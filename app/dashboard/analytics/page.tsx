import { ChartCard } from "@/components/charts/chart-card";
import { DonutChart } from "@/components/charts/donut-chart";
import { SimpleLineChart } from "@/components/charts/simple-line-chart";
import { HorizontalBarChart } from "@/components/charts/horizontal-bar-chart";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  userGrowthData,
  conversionRateData,
  revenueAnalyticsData,
  trafficSourcesData,
  geographicData,
  deviceBreakdownData,
  acquisitionChannelsData,
  performanceMetrics,
} from "@/data/analytics";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 min-w-0">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Deep dive into your traffic, revenue, and user behavior.</p>
      </div>

      {/* Performance Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 min-w-0">
        {performanceMetrics.map((metric) => (
          <Card key={metric.label} className="min-w-0">
            <CardContent className="p-5">
              <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <h3 className="text-xl font-bold text-foreground">{metric.value}</h3>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 text-xs font-medium",
                    metric.direction === "up" ? "text-success-fg" : "text-danger-fg"
                  )}
                >
                  {metric.direction === "up" ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                  {metric.trend}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Row 1: User Growth & Conversion Rate */}
      <div className="grid gap-4 lg:grid-cols-2 min-w-0">
        <div className="min-w-0">
          <ChartCard title="User Growth" description="Monthly active users vs new signups">
            <SimpleLineChart
              data={userGrowthData}
              dataKey="users"
              xKey="month"
              color="var(--accent)"
              secondaryDataKey="newUsers"
              secondaryColor="var(--success)"
            />
          </ChartCard>
        </div>
        <div className="min-w-0">
          <ChartCard title="Conversion Rate" description="Daily conversion percentage vs target">
            <SimpleLineChart
              data={conversionRateData}
              dataKey="rate"
              xKey="day"
              color="var(--accent)"
              secondaryDataKey="target"
              secondaryColor="var(--warning)"
            />
          </ChartCard>
        </div>
      </div>

      {/* Row 2: Revenue Analytics & Traffic Sources */}
      <div className="grid gap-4 lg:grid-cols-3 min-w-0">
        <div className="lg:col-span-2 min-w-0">
          <ChartCard title="Revenue Analytics" description="Quarterly revenue breakdown">
            <HorizontalBarChart data={revenueAnalyticsData} dataKey="revenue" nameKey="quarter" color="var(--accent)" />
          </ChartCard>
        </div>
        <div className="min-w-0">
          <ChartCard title="Traffic Sources" description="Where your visitors come from">
            <DonutChart data={trafficSourcesData} centerLabel="100%" />
          </ChartCard>
        </div>
      </div>

      {/* Row 3: Geographic & Devices */}
      <div className="grid gap-4 lg:grid-cols-2 min-w-0">
        <div className="min-w-0">
          <ChartCard title="Geographic Data" description="Top countries by visits">
            <HorizontalBarChart data={geographicData} dataKey="visits" nameKey="country" color="var(--info)" />
          </ChartCard>
        </div>
        <div className="min-w-0">
          <ChartCard title="Device Breakdown" description="Sessions by device type">
            <DonutChart data={deviceBreakdownData} centerLabel="Devices" />
          </ChartCard>
        </div>
      </div>

      {/* Row 4: Acquisition Channels & Empty State Demo */}
      <div className="grid gap-4 lg:grid-cols-2 min-w-0">
        <div className="min-w-0">
          <ChartCard title="Acquisition Channels" description="Conversions by ad platform">
            <HorizontalBarChart data={acquisitionChannelsData} dataKey="conversions" nameKey="channel" color="var(--warning)" />
          </ChartCard>
        </div>
        <div className="min-w-0">
          <ChartCard title="Empty State Demo" description="How charts gracefully handle missing data" isEmpty={true}>
            <div />
          </ChartCard>
        </div>
      </div>
    </div>
  );
}