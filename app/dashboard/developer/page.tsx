import { DeveloperView } from "@/components/developer/developer-view";

export default function DeveloperPage() {
  return (
    <div className="space-y-6 min-w-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Developer Tools</h1>
        <p className="text-muted-foreground">API keys, webhooks, usage and quickstart.</p>
      </div>
      <DeveloperView />
    </div>
  );
}