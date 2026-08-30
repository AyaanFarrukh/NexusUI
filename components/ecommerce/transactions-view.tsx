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
import { transactionsData } from "@/data/transactions";
import { formatCurrency, transactionStatusMeta, transactionTypeMeta } from "@/lib/ecommerce-meta";
import { formatDate } from "@/lib/project-meta";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 8;

const typeOptions = [
  { value: "all", label: "All types" },
  { value: "sale", label: "Sales" },
  { value: "refund", label: "Refunds" },
  { value: "payout", label: "Payouts" },
  { value: "fee", label: "Fees" },
];

export function TransactionsView() {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, typeFilter]);

  const filtered = useMemo(() => {
    const searchLower = search.toLowerCase();
    return transactionsData
      .filter((txn) => {
        const matchesSearch =
          txn.id.toLowerCase().includes(searchLower) ||
          txn.customerName.toLowerCase().includes(searchLower);
        const matchesType = typeFilter === "all" || txn.type === typeFilter;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [search, typeFilter]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-4 min-w-0">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <Input
            placeholder="Search by ID or customer..."
            icon={<Search className="size-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select options={typeOptions} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="w-[140px]" />
      </div>

      <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-surface shadow-card">
        {isLoading ? (
          <TableSkeleton />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Search className="size-8" />}
            title="No transactions found"
            description="Try adjusting your search or filters."
            action={
              <Button variant="outline" onClick={() => { setSearch(""); setTypeFilter("all"); }}>
                Clear filters
              </Button>
            }
            className="py-16"
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Transaction</th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Customer</th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Method</th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Type</th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Date</th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="whitespace-nowrap px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginated.map((txn) => (
                    <tr key={txn.id} className="transition-colors hover:bg-muted/30">
                      <td className="whitespace-nowrap px-6 py-4">
                        <p className="font-medium text-foreground">{txn.id}</p>
                        {txn.orderId && <p className="text-xs text-muted-foreground">{txn.orderId}</p>}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{txn.customerName}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{txn.method}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Badge variant={transactionTypeMeta[txn.type].variant}>
                          {transactionTypeMeta[txn.type].label}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{formatDate(txn.date)}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Badge variant={transactionStatusMeta[txn.status].variant}>
                          {transactionStatusMeta[txn.status].label}
                        </Badge>
                      </td>
                      <td className={cn(
                        "whitespace-nowrap px-6 py-4 text-right font-medium",
                        txn.amount < 0 ? "text-danger-fg" : "text-foreground"
                      )}>
                        {txn.amount < 0 ? "−" : "+"}{formatCurrency(Math.abs(txn.amount))}
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