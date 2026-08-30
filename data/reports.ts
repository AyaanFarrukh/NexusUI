import { analyticsData, performanceMetrics, revenueByCategoryData, userGrowthData } from "@/data/analytics";
import { ordersData } from "@/data/orders";
import { projectsData } from "@/data/projects";
import { formatCurrency } from "@/lib/ecommerce-meta";
import { formatDate } from "@/lib/project-meta";
import type { GeneratedReport, ReportCategory, ReportDefinition } from "@/types/report";

export const reportCategoryMeta: Record<
  ReportCategory,
  { label: string; variant: "success" | "info" | "accent" | "warning" }
> = {
  revenue: { label: "Revenue", variant: "success" },
  users: { label: "Users", variant: "info" },
  projects: { label: "Projects", variant: "accent" },
  ecommerce: { label: "E-commerce", variant: "warning" },
};

export const REPORT_DEFINITIONS: ReportDefinition[] = [
  { id: "rev-summary", name: "Revenue Summary", description: "Monthly revenue and user totals for the selected period.", category: "revenue", updatedAt: "2025-03-14T08:00:00Z" },
  { id: "rev-by-category", name: "Revenue by Category", description: "How revenue splits across business lines.", category: "revenue", updatedAt: "2025-03-12T08:00:00Z" },
  { id: "usr-growth", name: "User Growth", description: "Active users vs new signups month over month.", category: "users", updatedAt: "2025-03-13T08:00:00Z" },
  { id: "usr-engagement", name: "User Engagement", description: "Bounce rate, session length and page view metrics.", category: "users", updatedAt: "2025-03-10T08:00:00Z" },
  { id: "prj-status", name: "Project Status", description: "Progress, priority and deadlines across all projects.", category: "projects", updatedAt: "2025-03-11T08:00:00Z" },
  { id: "eco-orders", name: "Orders & Fulfillment", description: "Orders in the selected range with payment and fulfillment state.", category: "ecommerce", updatedAt: "2025-03-14T08:00:00Z" },
];

/**
 * Builds a report entirely from local mock data.
 * Buyers: replace this with a fetch to your analytics backend.
 */
export function generateReport(id: string, from: string, to: string): GeneratedReport | null {
  const definition = REPORT_DEFINITIONS.find((r) => r.id === id);
  if (!definition) return null;

  const base = {
    definition,
    range: { from, to },
    generatedAt: new Date().toISOString(),
  };

  switch (id) {
    case "rev-summary": {
      const rows = analyticsData["12m"].map((m) => ({
        Month: m.name,
        Revenue: m.revenue,
        Users: m.users,
      }));
      const totalRevenue = rows.reduce((n, r) => n + (r.Revenue as number), 0);
      const totalUsers = rows.reduce((n, r) => n + (r.Users as number), 0);
      return {
        ...base,
        summary: [
          { label: "Total revenue", value: formatCurrency(totalRevenue) },
          { label: "Avg / month", value: formatCurrency(Math.round(totalRevenue / rows.length)) },
          { label: "Total users", value: totalUsers.toLocaleString() },
        ],
        rows,
      };
    }

    case "rev-by-category": {
      const rows = revenueByCategoryData.map((r) => ({ Category: r.name, Revenue: r.value }));
      const total = rows.reduce((n, r) => n + (r.Revenue as number), 0);
      return {
        ...base,
        summary: [
          { label: "Total", value: formatCurrency(total) },
          { label: "Categories", value: String(rows.length) },
          { label: "Top category", value: [...rows].sort((a, b) => (b.Revenue as number) - (a.Revenue as number))[0].Category as string },
        ],
        rows,
      };
    }

    case "usr-growth": {
      const rows = userGrowthData.map((m) => ({ Month: m.month, Users: m.users, "New users": m.newUsers }));
      const total = rows.reduce((n, r) => n + (r.Users as number), 0);
      return {
        ...base,
        summary: [
          { label: "Active users", value: total.toLocaleString() },
          { label: "Best month", value: [...rows].sort((a, b) => (b.Users as number) - (a.Users as number))[0].Month as string },
        ],
        rows,
      };
    }

    case "usr-engagement": {
      const rows = performanceMetrics.map((m) => ({ Metric: m.label, Value: m.value, Change: m.trend }));
      return {
        ...base,
        summary: [
          { label: "Metrics tracked", value: String(rows.length) },
          { label: "Bounce rate", value: "32.4%" },
        ],
        rows,
      };
    }

    case "prj-status": {
      const rows = projectsData.map((p) => ({
        Project: p.name,
        Status: p.status,
        Priority: p.priority,
        "Progress %": p.progress,
        Deadline: formatDate(p.deadline),
      }));
      const active = projectsData.filter((p) => p.status === "active").length;
      const avg = Math.round(projectsData.reduce((n, p) => n + p.progress, 0) / projectsData.length);
      return {
        ...base,
        summary: [
          { label: "Total projects", value: String(rows.length) },
          { label: "Active", value: String(active) },
          { label: "Avg progress", value: `${avg}%` },
        ],
        rows,
      };
    }

    case "eco-orders": {
      const inRange = ordersData.filter((o) => {
        const day = o.date.slice(0, 10);
        return day >= from && day <= to;
      });
      const rows = inRange.map((o) => ({
        Order: o.id,
        Customer: o.customerName,
        Amount: o.amount,
        Payment: o.paymentStatus,
        Fulfillment: o.fulfillmentStatus,
        Date: formatDate(o.date),
      }));
      const total = inRange.reduce((n, o) => n + o.amount, 0);
      return {
        ...base,
        summary: [
          { label: "Orders in range", value: String(rows.length) },
          { label: "Gross revenue", value: formatCurrency(total) },
          { label: "Avg order value", value: rows.length ? formatCurrency(Math.round(total / rows.length)) : "$0.00" },
        ],
        rows,
      };
    }

    default:
      return null;
  }
}