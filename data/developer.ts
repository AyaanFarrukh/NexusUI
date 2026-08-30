export interface ApiKey {
  id: string;
  name: string;
  maskedKey: string;
  createdAt: string;
  lastUsed: string;
  status: "active" | "revoked";
}

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  active: boolean;
}

export const apiKeysData: ApiKey[] = [
  { id: "key_001", name: "Production", maskedKey: "nx_live_••••••••••••4f2a", createdAt: "2024-11-02T00:00:00Z", lastUsed: "2025-03-14T10:20:00Z", status: "active" },
  { id: "key_002", name: "Staging", maskedKey: "nx_test_••••••••••••9c1d", createdAt: "2025-01-15T00:00:00Z", lastUsed: "2025-03-13T16:45:00Z", status: "active" },
  { id: "key_003", name: "Legacy CI", maskedKey: "nx_live_••••••••••••77be", createdAt: "2024-06-20T00:00:00Z", lastUsed: "2024-12-01T09:00:00Z", status: "revoked" },
];

export const webhooksData: Webhook[] = [
  { id: "wh_001", url: "https://api.example.com/hooks/orders", events: ["order.created", "order.paid"], active: true },
  { id: "wh_002", url: "https://example.com/webhooks/users", events: ["user.created"], active: true },
  { id: "wh_003", url: "https://staging.example.com/hooks/dev", events: ["project.updated"], active: false },
];

export const webhookEventOptions = [
  "order.created", "order.paid", "user.created", "user.deleted", "project.updated", "invoice.paid",
];

export const usageStats = [
  { label: "API requests", used: 82_400, limit: 100_000, unit: "" },
  { label: "Bandwidth", used: 34, limit: 100, unit: "GB" },
  { label: "Webhook deliveries", used: 12_300, limit: 50_000, unit: "" },
];

export const quickstartSnippet = `import Nexus from "@nexusui/sdk";

const nexus = new Nexus({ apiKey: process.env.NEXUS_API_KEY });

// List projects
const projects = await nexus.projects.list();

// Create a task
await nexus.tasks.create({
  title: "Ship Milestone 19",
  status: "in-progress",
});`;