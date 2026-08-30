import { ReportsView } from "@/components/reports/reports-view";

export default function ReportsPage() {
  return (
    <div className="space-y-6 min-w-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Reports</h1>
        <p className="text-muted-foreground">
          Generate business reports and export them as CSV, JSON or print-ready documents.
        </p>
      </div>
      <ReportsView />
    </div>
  );
}