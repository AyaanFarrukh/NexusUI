"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { TableSkeleton } from "./table-skeleton";
import { customersData } from "@/data/customers";
import { customerSegmentMeta, formatCurrency } from "@/lib/ecommerce-meta";
import { formatDate } from "@/lib/project-meta";

const segmentOptions = [
  { value: "all", label: "All segments" },
  { value: "vip", label: "VIP" },
  { value: "regular", label: "Regular" },
  { value: "new", label: "New" },
];

export function CustomersView() {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    const searchLower = search.toLowerCase();
    return customersData.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower);
      const matchesSegment = segmentFilter === "all" || customer.segment === segmentFilter;
      return matchesSearch && matchesSegment;
    });
  }, [search, segmentFilter]);

  return (
    <div className="space-y-4 min-w-0">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <Input
            placeholder="Search customers..."
            icon={<Search className="size-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select options={segmentOptions} value={segmentFilter} onChange={(e) => setSegmentFilter(e.target.value)} className="w-[150px]" />
      </div>

      <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-surface shadow-card">
        {isLoading ? (
          <TableSkeleton />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Search className="size-8" />}
            title="No customers found"
            description="Try adjusting your search or filters."
            action={
              <Button variant="outline" onClick={() => { setSearch(""); setSegmentFilter("all"); }}>
                Clear filters
              </Button>
            }
            className="py-16"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Customer</th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Location</th>
                  <th className="whitespace-nowrap px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Orders</th>
                  <th className="whitespace-nowrap px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Total spent</th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Joined</th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Segment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((customer) => (
                  <tr key={customer.id} className="transition-colors hover:bg-muted/30">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar fallback={customer.name} size="sm" />
                        <div>
                          <p className="font-medium text-foreground">{customer.name}</p>
                          <p className="text-xs text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{customer.location}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-muted-foreground">{customer.ordersCount}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-foreground">{formatCurrency(customer.totalSpent)}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{formatDate(customer.joinedAt)}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge variant={customerSegmentMeta[customer.segment].variant}>
                        {customerSegmentMeta[customer.segment].label}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}