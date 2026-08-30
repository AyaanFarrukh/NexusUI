"use client";

import { useMemo, useState } from "react";
import { Plug, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { useToast } from "@/lib/hooks/use-toast";
import { integrationCategories, integrationsData } from "@/data/integrations";
import { cn } from "@/lib/utils";

export function IntegrationsView() {
  const { toast } = useToast();
  const [items, setItems] = useState(integrationsData);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");

  const connectedCount = items.filter((i) => i.connected).length;

  const filtered = useMemo(() => {
    const searchLower = search.toLowerCase();
    return items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchLower) || item.description.toLowerCase().includes(searchLower);
      const matchesCategory = category === "All" || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [items, search, category]);

  const toggle = (id: string) => {
    const current = items.find((i) => i.id === id);
    if (!current) return;

    const nextConnected = !current.connected;

    // Update state first (no side effects inside the updater).
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, connected: nextConnected } : item))
    );

    // Then fire the toast after React has processed the state update.
    toast({
      title: nextConnected ? `${current.name} connected` : `${current.name} disconnected`,
      description: "Demo only — wire this to your real OAuth flow.",
      variant: nextConnected ? "success" : "default",
    });
  };

  return (
    <div className="space-y-4 min-w-0">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-xs">
          <Input
            placeholder="Search integrations..."
            icon={<Search className="size-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{connectedCount}</span> connected
        </p>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {integrationCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={cn(
              "focus-ring shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              category === cat
                ? "border-accent bg-accent text-accent-fg"
                : "border-border bg-surface text-muted-foreground hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <Card className="min-w-0">
          <CardContent className="p-0">
            <EmptyState
              icon={<Plug className="size-8" />}
              title="No integrations found"
              description="Try a different search or category."
              action={<Button variant="outline" onClick={() => { setSearch(""); setCategory("All"); }}>Clear filters</Button>}
              className="py-16"
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 min-w-0">
          {filtered.map((item) => (
            <Card key={item.id} className="flex min-w-0 flex-col transition-colors hover:border-accent/40">
              <CardContent className="flex flex-1 flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-2">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-subtle text-accent-subtle-fg">
                    <item.icon className="size-5" />
                  </span>
                  <div className="flex items-center gap-1.5">
                    {item.popular && <Badge variant="accent">Popular</Badge>}
                    {item.connected && <Badge variant="success">Connected</Badge>}
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs text-muted-foreground">{item.category}</span>
                  <Button
                    size="sm"
                    variant={item.connected ? "outline" : "default"}
                    onClick={() => toggle(item.id)}
                  >
                    {item.connected ? "Disconnect" : "Connect"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}