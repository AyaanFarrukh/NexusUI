"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useToast } from "@/lib/hooks/use-toast";

export function GeneralSection() {
  const { toast } = useToast();
  const [name, setName] = useState("NexusUI Workspace");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("utc");

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>General</CardTitle>
        <CardDescription>Basic workspace information and locale.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            toast({ title: "Saved", description: "General settings updated.", variant: "success" });
          }}
        >
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Workspace name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Language</label>
              <Select
                options={[
                  { value: "en", label: "English" },
                  { value: "es", label: "Español" },
                  { value: "de", label: "Deutsch" },
                  { value: "fr", label: "Français" },
                ]}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Timezone</label>
              <Select
                options={[
                  { value: "utc", label: "UTC" },
                  { value: "est", label: "Eastern (EST)" },
                  { value: "pst", label: "Pacific (PST)" },
                  { value: "cet", label: "Central European (CET)" },
                ]}
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}