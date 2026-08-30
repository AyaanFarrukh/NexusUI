import { KpiCard } from "@/components/dashboard/kpi-card";
import { AnalyticsChart } from "@/components/charts/analytics-chart";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { TopProducts } from "@/components/dashboard/top-products";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { kpiData } from "@/data/dashboard";

export default function OverviewPage() {
  return (
    <div className="space-y-6 min-w-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here is a summary of your platform activity.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 min-w-0">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3 min-w-0">
        <div className="lg:col-span-2 min-w-0">
          <AnalyticsChart />
        </div>
        <div className="min-w-0">
          <RevenueChart />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid gap-4 lg:grid-cols-3 min-w-0">
        <div className="lg:col-span-2 min-w-0">
          <TopProducts />
        </div>
        <div className="space-y-4 min-w-0">
          <RecentActivity />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}