"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/lib/hooks/use-toast";

export function PreferencesSection() {
  const { toast } = useToast();
  const [landing, setLanding] = useState("overview");
  const [rows, setRows] = useState("10");
  const [autosave, setAutosave] = useState(true);

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Fine-tune how the dashboard behaves.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Default landing page</label>
            <Select
              options={[
                { value: "overview", label: "Overview" },
                { value: "analytics", label: "Analytics" },
                { value: "projects", label: "Projects" },
                { value: "tasks", label: "Tasks" },
              ]}
              value={landing}
              onChange={(e) => setLanding(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Rows per page</label>
            <Select
              options={[
                { value: "10", label: "10" },
                { value: "20", label: "20" },
                { value: "50", label: "50" },
              ]}
              value={rows}
              onChange={(e) => setRows(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">Autosave drafts</p>
            <p className="text-sm text-muted-foreground">Save my work automatically as I type.</p>
          </div>
          <Switch checked={autosave} onCheckedChange={setAutosave} />
        </div>

        <div className="flex justify-end border-t border-border pt-4">
          <Button onClick={() => toast({ title: "Saved", description: "Preferences updated.", variant: "success" })}>
            Save preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}