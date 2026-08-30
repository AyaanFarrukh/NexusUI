"use client";

import { useState } from "react";
import { Check, Copy, KeyRound, Plus, Trash2, Webhook } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/lib/hooks/use-toast";
import { apiKeysData, quickstartSnippet, usageStats, webhookEventOptions, webhooksData } from "@/data/developer";
import { formatDate } from "@/lib/project-meta";

function generateKey(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "nx_live_";
  for (let i = 0; i < 24; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export function DeveloperView() {
  const { toast } = useToast();

  const [keys, setKeys] = useState(apiKeysData);
  const [webhooks, setWebhooks] = useState(webhooksData);

  const [generateOpen, setGenerateOpen] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [newKey, setNewKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [webhookOpen, setWebhookOpen] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookEvents, setWebhookEvents] = useState<string[]>([]);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      toast({ title: "Copied to clipboard", variant: "success" });
    } catch {
      toast({ title: "Copy failed", description: "Clipboard unavailable.", variant: "destructive" });
    }
  };

  const createKey = () => {
    const full = generateKey();
    const masked = `${full.slice(0, 8)}••••••••••••${full.slice(-4)}`;
    setKeys((prev) => [
      { id: `key_${Date.now()}`, name: keyName || "Untitled key", maskedKey: masked, createdAt: new Date().toISOString(), lastUsed: "Never", status: "active" },
      ...prev,
    ]);
    setNewKey(full);
    setGenerateOpen(false);
    setKeyName("");
  };

  const revokeKey = (id: string) => {
    setKeys((prev) => prev.map((k) => (k.id === id ? { ...k, status: "revoked" } : k)));
    toast({ title: "Key revoked", description: "This key can no longer be used." });
  };

  const toggleWebhook = (id: string) => {
    setWebhooks((prev) => prev.map((w) => (w.id === id ? { ...w, active: !w.active } : w)));
  };

  const addWebhook = () => {
    if (!webhookUrl.trim() || webhookEvents.length === 0) {
      toast({ title: "Missing fields", description: "Provide a URL and at least one event.", variant: "destructive" });
      return;
    }
    setWebhooks((prev) => [
      { id: `wh_${Date.now()}`, url: webhookUrl.trim(), events: webhookEvents, active: true },
      ...prev,
    ]);
    setWebhookOpen(false);
    setWebhookUrl("");
    setWebhookEvents([]);
    toast({ title: "Webhook added", variant: "success" });
  };

  return (
    <div className="space-y-6 min-w-0">
      {/* ── API Keys ── */}
      <Card className="min-w-0 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2"><KeyRound className="size-4" /> API keys</CardTitle>
            <CardDescription>Secret credentials for server-to-server access.</CardDescription>
          </div>
          <Button size="sm" onClick={() => { setNewKey(null); setGenerateOpen(true); }}>
            <Plus className="mr-2 size-4" /> Generate key
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Name</th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Key</th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Created</th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Last used</th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="whitespace-nowrap px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {keys.map((key) => (
                  <tr key={key.id} className="transition-colors hover:bg-muted/30">
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-foreground">{key.name}</td>
                    <td className="whitespace-nowrap px-6 py-4 font-mono text-xs text-muted-foreground">{key.maskedKey}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{formatDate(key.createdAt)}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{key.lastUsed}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge variant={key.status === "active" ? "success" : "neutral"}>{key.status === "active" ? "Active" : "Revoked"}</Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      {key.status === "active" && (
                        <Button variant="ghost" size="xs" onClick={() => revokeKey(key.id)}>
                          <Trash2 className="mr-1 size-3" /> Revoke
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ── Webhooks ── */}
      <Card className="min-w-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2"><Webhook className="size-4" /> Webhooks</CardTitle>
            <CardDescription>Push real-time events to your endpoints.</CardDescription>
          </div>
          <Button size="sm" variant="outline" onClick={() => setWebhookOpen(true)}>
            <Plus className="mr-2 size-4" /> Add endpoint
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {webhooks.map((hook) => (
            <div key={hook.id} className="flex flex-col gap-3 rounded-lg border border-border bg-background/50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="truncate font-mono text-xs text-foreground">{hook.url}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {hook.events.map((event) => (
                    <Badge key={event} variant="outline">{event}</Badge>
                  ))}
                </div>
              </div>
              <Switch checked={hook.active} onCheckedChange={() => toggleWebhook(hook.id)} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── Usage ── */}
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Usage this month</CardTitle>
          <CardDescription>Current consumption against your plan limits.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {usageStats.map((stat) => {
            const percent = Math.min(100, Math.round((stat.used / stat.limit) * 100));
            return (
              <div key={stat.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{stat.label}</span>
                  <span className="text-muted-foreground">
                    {stat.used.toLocaleString()}{stat.unit} / {stat.limit.toLocaleString()}{stat.unit}
                  </span>
                </div>
                <Progress value={percent} />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* ── Quickstart ── */}
      <Card className="min-w-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Quickstart</CardTitle>
            <CardDescription>Get up and running with the SDK in under a minute.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => copy(quickstartSnippet)}>
            {copied ? <Check className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}
            Copy
          </Button>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground scrollbar-thin">
            {quickstartSnippet}
          </pre>
        </CardContent>
      </Card>

      {/* ── Generate key dialog (clean spacing) ── */}
      <Dialog open={generateOpen} onOpenChange={setGenerateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate API key</DialogTitle>
            <DialogDescription>Give the key a recognizable name.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="key-name" className="text-sm font-medium text-foreground">Key name</label>
              <Input
                id="key-name"
                placeholder="e.g. Production, CI pipeline..."
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                autoFocus
              />
              <p className="text-xs text-muted-foreground">The key itself will be revealed after generation.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGenerateOpen(false)}>Cancel</Button>
            <Button onClick={createKey}>Generate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── New key reveal dialog (clean spacing) ── */}
      <Dialog open={newKey !== null} onOpenChange={(open) => !open && setNewKey(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your new API key</DialogTitle>
            <DialogDescription>
              Copy it now — for security, you won't be able to see the full key again.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 p-3">
              <code className="min-w-0 flex-1 truncate font-mono text-xs text-foreground">{newKey}</code>
              <Button variant="outline" size="icon" className="size-8 shrink-0" onClick={() => newKey && copy(newKey)} aria-label="Copy key">
                <Copy className="size-4" />
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setNewKey(null)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Add webhook dialog (clean spacing) ── */}
      <Dialog open={webhookOpen} onOpenChange={setWebhookOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add webhook endpoint</DialogTitle>
            <DialogDescription>Choose the URL and events to subscribe to.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="webhook-url" className="text-sm font-medium text-foreground">Endpoint URL</label>
              <Input
                id="webhook-url"
                placeholder="https://api.example.com/hooks"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Events</label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {webhookEventOptions.map((event) => (
                  <Checkbox
                    key={event}
                    label={event}
                    checked={webhookEvents.includes(event)}
                    onCheckedChange={(checked) =>
                      setWebhookEvents((prev) => (checked ? [...prev, event] : prev.filter((e) => e !== event)))
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWebhookOpen(false)}>Cancel</Button>
            <Button onClick={addWebhook}>Add webhook</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}