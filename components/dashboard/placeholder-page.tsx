import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Layers } from "lucide-react";

export function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Card>
        <CardContent className="py-12">
          <EmptyState
            icon={<Layers className="size-8" />}
            title="Coming Soon"
            description="This page will be fully built in the upcoming milestones."
          />
        </CardContent>
      </Card>
    </div>
  );
}