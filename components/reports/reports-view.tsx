"use client";

import { useMemo, useState } from "react";
import { BarChart3, DollarSign, FolderKanban, Loader2, ShoppingCart, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ReportPreview } from "./report-preview";
import { generateReport, REPORT_DEFINITIONS, reportCategoryMeta } from "@/data/reports";
import { addDays, CALENDAR_TODAY, toKey } from "@/lib/calendar";
import { formatDate } from "@/lib/project-meta";
import { cn } from "@/lib/utils";
import type { GeneratedReport, ReportCategory } from "@/types/report";

const categoryIconMap: Record<ReportCategory, React.ComponentType<{ className?: string }>> = {
  revenue: DollarSign,
  users: Users,
  projects: FolderKanban,
  ecommerce: ShoppingCart,
};

const categoryFilterOptions = [
  { value: "all", label: "All categories" },
  { value: "revenue", label: "Revenue" },
  { value: "users", label: "Users" },
  { value: "projects", label: "Projects" },
  { value: "ecommerce", label: "E-commerce" },
];

const presets = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
];

export function ReportsView() {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [from, setFrom] = useState(toKey(addDays(CALENDAR_TODAY, -30)));
  const [to, setTo] = useState(toKey(CALENDAR_TODAY));

  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [activeReportId, setActiveReportId] = useState<string | null>(null);
  const [report, setReport] = useState<GeneratedReport | null>(null);

  const filteredDefinitions = useMemo(
    () =>
      REPORT_DEFINITIONS.filter(
        (definition) => categoryFilter === "all" || definition.category === categoryFilter
      ),
    [categoryFilter]
  );

  const applyPreset = (days: number) => {
    setFrom(toKey(addDays(CALENDAR_TODAY, -days)));
    setTo(toKey(CALENDAR_TODAY));
  };

  const handleGenerate = (id: string) => {
    if (generatingId) return;
    setGeneratingId(id);
    setActiveReportId(id);

    // Simulated generation latency
    setTimeout(() => {
      setReport(generateReport(id, from, to));
      setGeneratingId(null);
    }, 900);
  };

  return (
    <div className="space-y-6 min-w-0">
      {/* Toolbar: date range + presets + category */}
      <Card className="min-w-0">
        <CardContent className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="w-[150px]" aria-label="From date" />
              <span className="text-sm text-muted-foreground">→</span>
              <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="w-[150px]" aria-label="To date" />
            </div>
            <div className="flex flex-wrap gap-1">
              {presets.map((preset) => (
                <Button key={preset.days} variant="ghost" size="xs" onClick={() => applyPreset(preset.days)}>
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
          <Select
            options={categoryFilterOptions}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-[160px]"
          />
        </CardContent>
      </Card>

      {/* Report cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 min-w-0">
        {filteredDefinitions.map((definition) => {
          const Icon = categoryIconMap[definition.category];
          const isActive = activeReportId === definition.id;
          const isGenerating = generatingId === definition.id;

          return (
            <Card
              key={definition.id}
              className={cn(
                "flex min-w-0 flex-col transition-colors",
                isActive && "border-accent/50"
              )}
            >
              <CardContent className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-2">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-subtle text-accent-subtle-fg">
                    <Icon className="size-5" />
                  </span>
                  <Badge variant={reportCategoryMeta[definition.category].variant}>
                    {reportCategoryMeta[definition.category].label}
                  </Badge>
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground">{definition.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{definition.description}</p>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs text-muted-foreground">
                    Updated {formatDate(definition.updatedAt)}
                  </span>
                  <Button
                    size="sm"
                    variant={isActive ? "secondary" : "primary"}
                    onClick={() => handleGenerate(definition.id)}
                    disabled={generatingId !== null}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Generating…
                      </>
                    ) : isActive ? (
                      "Regenerate"
                    ) : (
                      "Generate"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Generating skeleton */}
      {generatingId && (
        <Card className="min-w-0">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-3">
              <Loader2 className="size-5 animate-spin text-accent" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-[220px]" />
                <Skeleton className="h-4 w-[160px]" />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </div>
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>
      )}

      {/* Preview */}
      {!generatingId && <ReportPreview report={report} />}

      {/* No reports in category */}
      {filteredDefinitions.length === 0 && (
        <Card className="min-w-0">
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <BarChart3 className="size-8 text-muted-foreground" />
              <h3 className="mt-3 text-lg font-semibold text-foreground">No reports in this category</h3>
              <p className="mt-1 text-sm text-muted-foreground">Try a different category filter.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}