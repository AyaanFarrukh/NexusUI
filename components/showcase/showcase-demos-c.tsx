"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip } from "@/components/ui/tooltip";
import { ChartCard } from "@/components/charts/chart-card";
import { DonutChart } from "@/components/charts/donut-chart";
import { SimpleLineChart } from "@/components/charts/simple-line-chart";
import { HorizontalBarChart } from "@/components/charts/horizontal-bar-chart";
import { conversionRateData, geographicData, trafficSourcesData } from "@/data/analytics";

export function OverlaysDemo() {
  return (
    <div className="grid gap-4 lg:grid-cols-2 min-w-0">
      <Card className="min-w-0">
        <CardContent className="flex flex-wrap items-center gap-3 p-5">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open modal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Example modal</DialogTitle>
                <DialogDescription>Modals use a portal and focus trap.</DialogDescription>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">Body content for the dialog.</p>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Tooltip content="Top tooltip" side="top">
            <Button variant="outline">Top</Button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" side="bottom">
            <Button variant="outline">Bottom</Button>
          </Tooltip>
          <Tooltip content="Left tooltip" side="left">
            <Button variant="outline">Left</Button>
          </Tooltip>
          <Tooltip content="Right tooltip" side="right">
            <Button variant="outline">Right</Button>
          </Tooltip>
        </CardContent>
      </Card>

      <Card className="min-w-0">
        <CardContent className="p-5">
          <Tabs defaultValue="one">
            <TabsList>
              <TabsTrigger value="one">Tab one</TabsTrigger>
              <TabsTrigger value="two">Tab two</TabsTrigger>
              <TabsTrigger value="three">Tab three</TabsTrigger>
            </TabsList>
            <TabsContent value="one" className="rounded-md border border-border p-4 text-sm text-muted-foreground">
              Content for the first tab.
            </TabsContent>
            <TabsContent value="two" className="rounded-md border border-border p-4 text-sm text-muted-foreground">
              Content for the second tab.
            </TabsContent>
            <TabsContent value="three" className="rounded-md border border-border p-4 text-sm text-muted-foreground">
              Content for the third tab.
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export function TablesDemo() {
  const rows = [
    { name: "Olivia Martin", role: "Admin", status: "Active" },
    { name: "Jackson Lee", role: "Editor", status: "Pending" },
    { name: "Isabella Nguyen", role: "Viewer", status: "Inactive" },
  ];
  return (
    <Card className="min-w-0 overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Name</th>
                <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Role</th>
                <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((row) => (
                <tr key={row.name} className="transition-colors hover:bg-muted/30">
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-foreground">{row.name}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{row.role}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Badge variant={row.status === "Active" ? "success" : row.status === "Pending" ? "warning" : "neutral"}>
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export function ChartsDemo() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 min-w-0">
      <ChartCard title="Area / Line" description="Conversion rate over a week">
        <SimpleLineChart data={conversionRateData} dataKey="rate" xKey="day" />
      </ChartCard>
      <ChartCard title="Donut" description="Traffic sources">
        <DonutChart data={trafficSourcesData} />
      </ChartCard>
      <ChartCard title="Horizontal bar" description="Visits by country">
        <HorizontalBarChart data={geographicData} dataKey="visits" nameKey="country" />
      </ChartCard>
    </div>
  );
}