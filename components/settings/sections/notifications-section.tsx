"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/lib/hooks/use-toast";

const initial = [
  { id: "email", label: "Email notifications", desc: "Receive updates in your inbox.", on: true },
  { id: "push", label: "Push notifications", desc: "Get alerts on this device.", on: true },
  { id: "mentions", label: "Mentions", desc: "Notify me when someone mentions me.", on: true },
  { id: "comments", label: "Comments", desc: "Notify me about replies to my threads.", on: false },
  { id: "digest", label: "Weekly digest", desc: "A summary of activity every Monday.", on: false },
];

export function NotificationsSection() {
  const { toast } = useToast();
  const [items, setItems] = useState(initial);

  const toggle = (id: string) =>
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, on: !item.on } : item)));

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what you want to hear about.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
            <Switch checked={item.on} onCheckedChange={() => toggle(item.id)} />
          </div>
        ))}
        <div className="flex justify-end border-t border-border pt-4">
          <Button onClick={() => toast({ title: "Saved", description: "Notification preferences updated.", variant: "success" })}>
            Save preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}