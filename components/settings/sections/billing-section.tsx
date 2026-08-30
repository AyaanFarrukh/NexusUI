"use client";

import { CreditCard } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/lib/hooks/use-toast";

const invoices = [
  { id: "INV-2025-031", date: "Mar 1, 2025", amount: "$29.00", status: "paid" },
  { id: "INV-2025-021", date: "Feb 1, 2025", amount: "$29.00", status: "paid" },
  { id: "INV-2025-011", date: "Jan 1, 2025", amount: "$29.00", status: "paid" },
];

export function BillingSection() {
  const { toast } = useToast();

  return (
    <div className="space-y-4 min-w-0">
      <Card className="min-w-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Current plan</CardTitle>
            <CardDescription>Renews on April 1, 2025.</CardDescription>
          </div>
          <Badge variant="accent">Pro</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">$29</span>
            <span className="text-sm text-muted-foreground">/ month</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Seats used</span>
              <span className="font-medium text-foreground">8 / 10</span>
            </div>
            <Progress value={80} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => toast({ title: "Upgrade", description: "Open the upgrade flow (buyer integration)." })}>
              Upgrade plan
            </Button>
            <Button variant="outline" onClick={() => toast({ title: "Billing portal", description: "Open the billing portal (buyer integration)." })}>
              Manage billing
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Payment method</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-muted text-muted-foreground">
              <CreditCard className="size-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">Visa •••• 4242</p>
              <p className="text-xs text-muted-foreground">Expires 09/27</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => toast({ title: "Update card", description: "Open the card update form (buyer integration)." })}>
            Update
          </Button>
        </CardContent>
      </Card>

      <Card className="min-w-0 overflow-hidden">
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Invoice</th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Date</th>
                  <th className="whitespace-nowrap px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Amount</th>
                  <th className="whitespace-nowrap px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="transition-colors hover:bg-muted/30">
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-foreground">{invoice.id}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{invoice.date}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-foreground">{invoice.amount}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <Badge variant="success">Paid</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}