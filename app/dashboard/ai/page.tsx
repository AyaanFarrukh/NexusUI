import { AIWorkspace } from "@/components/ai/ai-workspace";

export default function AIWorkspacePage() {
  return (
    <div className="space-y-6 min-w-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">AI Workspace</h1>
        <p className="text-muted-foreground">
          Chat with Nexus AI, tune the model, and track usage. Demo mode — no API keys required.
        </p>
      </div>
      <AIWorkspace />
    </div>
  );
}