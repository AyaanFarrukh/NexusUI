import { IntegrationsView } from "@/components/integrations/integrations-view";

export default function IntegrationsPage() {
  return (
    <div className="space-y-6 min-w-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Integrations</h1>
        <p className="text-muted-foreground">Connect the tools your team already uses.</p>
      </div>
      <IntegrationsView />
    </div>
  );
}