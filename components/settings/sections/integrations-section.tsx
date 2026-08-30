"use client";

import { useState } from "react";
import { Calendar, Figma, Github, Mail, Slack } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/lib/hooks/use-toast";

const initial = [
  { id: "slack", name: "Slack", desc: "Send notifications to your channels.", icon: Slack, on: true },
  { id: "github", name: "GitHub", desc: "Link commits and pull requests.", icon: Github, on: true },
  { id: "figma", name: "Figma", desc: "Embed design files in projects.", icon: Figma, on: false },
  { id: "calendar", name: "Google Calendar", desc: "Sync events with your calendar.", icon: Calendar, on: false },
  { id: "email", name: "Email (SMTP)", desc: "Send transactional email from your domain.", icon: Mail, on: false },
];

export function IntegrationsSection() {
  const { toast } = useToast();
  const [items, setItems] = useState(initial);

  const toggle = (id: string, name: string) => {
    setItems((prev) => {
      const next = prev.map((item) => (item.id === id ? { ...item, on: !item.on } : item));
      const target = next.find((item) => item.id === id);
      toast({
        title: target?.on ? `${name} connected` : `${name} disconnected`,
        description: "This is a demo — wire it to your real integration.",
      });
      return next;
    });
  };

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>Connect the tools your team already uses.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-subtle text-accent-subtle-fg">
                <item.icon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
            <Switch checked={item.on} onCheckedChange={() => toggle(item.id, item.name)} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}