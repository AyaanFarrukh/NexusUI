"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { TableFooter } from "./table-footer";
import { TableSkeleton } from "./table-skeleton";
import { ordersData } from "@/data/orders";
import { formatCurrency, fulfillmentStatusMeta, paymentStatusMeta } from "@/lib/ecommerce-meta";
import { formatDate } from "@/lib/project-meta";

const PAGE_SIZE = 8;

const paymentOptions = [
  { value: "all", label: "All payments" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "refunded", label: "Refunded" },
  { value: "failed", label: "Failed" },
];

const fulfillmentOptions = [
  { value: "all", label: "All fulfillment" },
  { value: "fulfilled", label: "Fulfilled" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "unfulfilled", label: "Unfulfilled" },
  { value: "cancelled", label: "Cancelled" },
];

export function OrdersView() {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [fulfillmentFilter, setFulfillmentFilter] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, paymentFilter, fulfillmentFilter]);

  const filtered = useMemo(() => {
    const searchLower = search.toLowerCase();
    return ordersData
      .filter((order) => {
        const matchesSearch =
          order.id.toLowerCase().includes(searchLower) ||
          order.customerName.toLowerCase().includes(searchLower);
        const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter;
        const matchesFulfillment = fulfillmentFilter === "all" || order.fulfillmentStatus === fulfillmentFilter;
        return matchesSearch && matchesPayment && matchesFulfillment;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [search, paymentFilter, fulfillmentFilter]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-4 min-w-0">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <Input
            placeholder="Search by order ID or customer..."
            icon={<Search className="size-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select options={paymentOptions} value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} className="w-[140px]" />
          <Select options={fulfillmentOptions} value={fulfillmentFilter} onChange={(e) => setFulfillmentFilter(e.target.value)} className="w-[160px]" />
        </div>
      </div>

      <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-surface shadow-card">
        {isLoading ? (
          <TableSkeleton />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Search className="size-8" />}
            title="No orders found"
            description="Try adjusting your search or filters."
            action={
              <Button variant="outline" onClick={() => { setSearch(""); setPaymentFilter("all"); setFulfillmentFilter("all"); }}>
                Clear filters
              </Button>
            }
            className="py-16"
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Order</th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Customer</th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Date</th>
                    <th className="whitespace-nowrap px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Amount</th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Payment</th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Fulfillment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginated.map((order) => (
                    <tr key={order.id} className="transition-colors hover:bg-muted/30">
                      <td className="whitespace-nowrap px-6 py-4">
                        <p className="font-medium text-foreground">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.items} item{order.items > 1 ? "s" : ""}</p>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <p className="font-medium text-foreground">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground">{order.email}</p>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{formatDate(order.date)}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-foreground">{formatCurrency(order.amount)}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Badge variant={paymentStatusMeta[order.paymentStatus].variant}>
                          {paymentStatusMeta[order.paymentStatus].label}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Badge variant={fulfillmentStatusMeta[order.fulfillmentStatus].variant}>
                          {fulfillmentStatusMeta[order.fulfillmentStatus].label}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <TableFooter page={page} pageSize={PAGE_SIZE} total={filtered.length} onPageChange={setPage} />
          </>
        )}
      </div>
    </div>
  );
}