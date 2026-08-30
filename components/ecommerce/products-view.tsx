"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { TableSkeleton } from "./table-skeleton";
import { productsData } from "@/data/products";
import { categoryIconMap, formatCurrency, productStatusMeta } from "@/lib/ecommerce-meta";
import { cn } from "@/lib/utils";

const statusOptions = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
  { value: "out-of-stock", label: "Out of stock" },
];

export function ProductsView() {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const categoryOptions = useMemo(() => {
    const categories = Array.from(new Set(productsData.map((p) => p.category)));
    return [
      { value: "all", label: "All categories" },
      ...categories.map((c) => ({ value: c, label: c })),
    ];
  }, []);

  const filtered = useMemo(() => {
    const searchLower = search.toLowerCase();
    return productsData.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchLower) ||
        product.sku.toLowerCase().includes(searchLower);
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
      const matchesStatus = statusFilter === "all" || product.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, categoryFilter, statusFilter]);

  return (
    <div className="space-y-4 min-w-0">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <Input
            placeholder="Search by name or SKU..."
            icon={<Search className="size-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select options={categoryOptions} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-[160px]" />
          <Select options={statusOptions} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-[150px]" />
        </div>
      </div>

      <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-surface shadow-card">
        {isLoading ? (
          <TableSkeleton />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Search className="size-8" />}
            title="No products found"
            description="Try adjusting your search or filters."
            action={
              <Button variant="outline" onClick={() => { setSearch(""); setCategoryFilter("all"); setStatusFilter("all"); }}>
                Clear filters
              </Button>
            }
            className="py-16"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Product</th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Category</th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Price</th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Inventory</th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((product) => {
                  const Icon = categoryIconMap[product.category] ?? Search;
                  return (
                    <tr key={product.id} className="transition-colors hover:bg-muted/30">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-subtle text-accent-subtle-fg">
                            <Icon className="size-5" />
                          </span>
                          <div>
                            <p className="font-medium text-foreground">{product.name}</p>
                            <p className="font-mono text-xs text-muted-foreground">{product.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{product.category}</td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-foreground">{formatCurrency(product.price)}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className={cn(
                          "font-medium",
                          product.inventory === 0
                            ? "text-danger-fg"
                            : product.inventory < 20
                              ? "text-warning-fg"
                              : "text-muted-foreground"
                        )}>
                          {product.inventory}
                        </span>
                        {product.inventory > 0 && product.inventory < 20 && (
                          <span className="ml-2 text-xs text-warning-fg">Low stock</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Badge variant={productStatusMeta[product.status].variant}>
                          {productStatusMeta[product.status].label}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}