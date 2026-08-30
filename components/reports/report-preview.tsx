"use client";

import { FileJson, FileSpreadsheet, Printer } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { useToast } from "@/lib/hooks/use-toast";
import { exportCSV, exportJSON, printReport } from "@/lib/export-utils";
import { reportCategoryMeta } from "@/data/reports";
import { formatDate } from "@/lib/project-meta";
import type { GeneratedReport } from "@/types/report";

interface ReportPreviewProps {
  report: GeneratedReport | null;
}

export function ReportPreview({ report }: ReportPreviewProps) {
  const { toast } = useToast();

  if (!report) {
    return (
      <Card className="min-w-0">
        <CardContent className="p-0">
          <EmptyState
            icon={<FileSpreadsheet className="size-8" />}
            title="No report selected"
            description="Generate a report above to preview its data here, then export it as CSV, JSON or a print-ready view."
            className="py-16"
          />
        </CardContent>
      </Card>
    );
  }

  const slug = report.definition.id;
  const headers = report.rows.length > 0 ? Object.keys(report.rows[0]) : [];

  const handleCSV = () => {
    exportCSV(`${slug}.csv`, report.rows);
    toast({ title: "CSV exported", description: `${report.rows.length} rows downloaded.`, variant: "success" });
  };

  const handleJSON = () => {
    exportJSON(`${slug}.json`, {
      report: report.definition.name,
      category: report.definition.category,
      range: report.range,
      generatedAt: report.generatedAt,
      summary: report.summary,
      rows: report.rows,
    });
    toast({ title: "JSON exported", description: "Full report downloaded.", variant: "success" });
  };

  const handlePrint = () => {
    printReport({
      title: report.definition.name,
      subtitle: `${reportCategoryMeta[report.definition.category].label} · ${formatDate(report.range.from)} – ${formatDate(report.range.to)} · Generated ${new Date(report.generatedAt).toLocaleString()}`,
      summary: report.summary,
      rows: report.rows,
    });
  };

  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>{report.definition.name}</CardTitle>
            <Badge variant={reportCategoryMeta[report.definition.category].variant}>
              {reportCategoryMeta[report.definition.category].label}
            </Badge>
          </div>
          <CardDescription>
            {formatDate(report.range.from)} – {formatDate(report.range.to)}
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2 print:hidden">
          <Button variant="outline" size="sm" onClick={handleCSV}>
            <FileSpreadsheet className="mr-2 size-4" />
            CSV
          </Button>
          <Button variant="outline" size="sm" onClick={handleJSON}>
            <FileJson className="mr-2 size-4" />
            JSON
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 size-4" />
            Print
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Summary tiles */}
        <div className="grid gap-3 sm:grid-cols-3">
          {report.summary.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-border bg-background/50 p-4">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-lg font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Data table */}
        {report.rows.length === 0 ? (
          <EmptyState
            icon={<FileSpreadsheet className="size-6" />}
            title="No rows in this range"
            description="Widen the date range to include more data."
            className="py-10"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  {headers.map((header) => (
                    <th key={header} className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {report.rows.map((row, index) => (
                  <tr key={index} className="transition-colors hover:bg-muted/30">
                    {headers.map((header) => (
                      <td key={header} className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {String(row[header])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}