import {
  Calendar, Cloud, CreditCard, Figma, Github, Gitlab, Linkedin, Mail, Slack, Zap,
} from "lucide-react";

export type IntegrationCategory =
  | "Communication"
  | "Development"
  | "Design"
  | "Productivity"
  | "Payments"
  | "Storage";

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: IntegrationCategory;
  icon: React.ComponentType<{ className?: string }>;
  connected: boolean;
  popular?: boolean;
}

export const integrationCategories: ("All" | IntegrationCategory)[] = [
  "All", "Communication", "Development", "Design", "Productivity", "Payments", "Storage",
];

export const integrationsData: Integration[] = [
  { id: "slack", name: "Slack", description: "Send notifications and alerts straight to your channels.", category: "Communication", icon: Slack, connected: true, popular: true },
  { id: "github", name: "GitHub", description: "Link commits, pull requests and deploy previews.", category: "Development", icon: Github, connected: true, popular: true },
  { id: "figma", name: "Figma", description: "Embed live design files inside your projects.", category: "Design", icon: Figma, connected: false, popular: true },
  { id: "stripe", name: "Stripe", description: "Accept payments and sync invoices automatically.", category: "Payments", icon: CreditCard, connected: true },
  { id: "gcal", name: "Google Calendar", description: "Two-way sync between events and your calendar.", category: "Productivity", icon: Calendar, connected: false },
  { id: "dropbox", name: "Dropbox", description: "Attach and preview files stored in your Dropbox.", category: "Storage", icon: Cloud, connected: false },
  { id: "zapier", name: "Zapier", description: "Automate workflows with 5,000+ connected apps.", category: "Productivity", icon: Zap, connected: false },
  { id: "gitlab", name: "GitLab", description: "Mirror repositories and track merge requests.", category: "Development", icon: Gitlab, connected: false },
  { id: "smtp", name: "Email (SMTP)", description: "Send transactional email from your own domain.", category: "Communication", icon: Mail, connected: true },
  { id: "linkedin", name: "LinkedIn", description: "Share updates and pull company insights.", category: "Communication", icon: Linkedin, connected: false },
];