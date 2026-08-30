import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

const pageData: Record<string, { title: string; description: string }> = {
  analytics: { title: "Analytics", description: "Revenue and user growth metrics." },
  users: { title: "Users", description: "Manage your platform users." },
  projects: { title: "Projects", description: "Track and manage team projects." },
  tasks: { title: "Tasks", description: "Organize your daily tasks and kanban boards." },
  calendar: { title: "Calendar", description: "Schedule meetings and events." },
  messages: { title: "Messages", description: "View and send direct messages." },
  notifications: { title: "Notifications", description: "Stay updated with recent activity." },
  files: { title: "Files", description: "Manage your documents and media." },
  reports: { title: "Reports", description: "Generate and export business reports." },
  products: { title: "Products", description: "Manage your e-commerce inventory." },
  orders: { title: "Orders", description: "Track customer orders and fulfillment." },
  customers: { title: "Customers", description: "View customer profiles and history." },
  transactions: { title: "Transactions", description: "Monitor financial transactions." },
  ai: { title: "AI Workspace", description: "Interact with AI models and prompts." },
  integrations: { title: "Integrations", description: "Connect third-party services." },
  developer: { title: "Developer Tools", description: "API keys, webhooks, and documentation." },
  settings: { title: "Settings", description: "Manage your account and preferences." },
  help: { title: "Help Center", description: "Documentation and support." },
};

export default async function CatchAllPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const pageSlug = slug[0];
  const data = pageData[pageSlug] || { title: "Page", description: "This page is under construction." };

  return <PlaceholderPage title={data.title} description={data.description} />;
}