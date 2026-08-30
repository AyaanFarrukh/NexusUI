"use client";

import { ArrowRight, Download, Loader2, Plus, Search, Trash2 } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { IconButton } from "@/components/ui/icon-button";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export function ButtonsDemo() {
  return (
    <Card className="min-w-0">
      <CardContent className="space-y-6 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <IconButton aria-label="Icon button">
            <Plus className="size-4" />
          </IconButton>
          <IconButton variant="outline" aria-label="Delete">
            <Trash2 className="size-4" />
          </IconButton>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button>
            With icon <ArrowRight className="ml-2 size-4" />
          </Button>
          <Button variant="outline">
            <Download className="mr-2 size-4" /> Download
          </Button>
          <Button disabled>
            <Loader2 className="mr-2 size-4 animate-spin" /> Loading…
          </Button>
          <Button disabled>Disabled</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function BadgesDemo() {
  return (
    <Card className="min-w-0">
      <CardContent className="flex flex-wrap items-center gap-2 p-5">
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="outline">Outline</Badge>
      </CardContent>
    </Card>
  );
}

export function AvatarsDemo() {
  return (
    <Card className="min-w-0">
      <CardContent className="flex flex-wrap items-end gap-4 p-5">
        <Avatar fallback="Olivia Martin" size="sm" />
        <Avatar fallback="Jackson Lee" size="md" />
        <Avatar fallback="Isabella Nguyen" size="lg" />
        <Avatar fallback="William Kim" size="xl" />
        <div className="flex -space-x-2">
          <Avatar fallback="Ava Martinez" size="sm" className="ring-2 ring-surface" />
          <Avatar fallback="Ethan Brown" size="sm" className="ring-2 ring-surface" />
          <Avatar fallback="Mia Johnson" size="sm" className="ring-2 ring-surface" />
          <span className="grid size-8 place-items-center rounded-full bg-muted text-xs font-medium text-muted-foreground ring-2 ring-surface">
            +5
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function FormsDemo() {
  return (
    <Card className="min-w-0">
      <CardContent className="grid gap-5 p-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Default input</label>
          <Input placeholder="Type something…" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">With icon</label>
          <Input placeholder="Search…" icon={<Search className="size-4" />} />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Error state</label>
          <Input defaultValue="invalid-value" error />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Disabled</label>
          <Input placeholder="Disabled" disabled />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Select</label>
          <Select
            options={[
              { value: "1", label: "Option one" },
              { value: "2", label: "Option two" },
              { value: "3", label: "Option three" },
            ]}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Textarea</label>
          <Textarea rows={2} placeholder="Multiline text…" />
        </div>
        <div className="flex items-center gap-6">
          <Checkbox label="Checkbox" defaultChecked />
          <Switch label="Switch" defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
}