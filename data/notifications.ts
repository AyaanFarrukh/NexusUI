import { AtSign, CreditCard, MessageSquare, Settings, ShieldAlert } from "lucide-react";
import type { AppNotification, NotificationCategory } from "@/types/notification";

export const notificationCategoryMeta: Record<
  NotificationCategory,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    iconClass: string;
    badgeVariant: "accent" | "info" | "neutral" | "success" | "danger";
  }
> = {
  mention: { label: "Mention", icon: AtSign, iconClass: "bg-accent-subtle text-accent-subtle-fg", badgeVariant: "accent" },
  comment: { label: "Comment", icon: MessageSquare, iconClass: "bg-info-subtle text-info-fg", badgeVariant: "info" },
  system: { label: "System", icon: Settings, iconClass: "bg-muted text-muted-foreground", badgeVariant: "neutral" },
  billing: { label: "Billing", icon: CreditCard, iconClass: "bg-success-subtle text-success-fg", badgeVariant: "success" },
  security: { label: "Security", icon: ShieldAlert, iconClass: "bg-danger-subtle text-danger-fg", badgeVariant: "danger" },
};

export const notificationsData: AppNotification[] = [
  { id: "ntf_001", title: "Olivia Martin mentioned you", description: "“…can you review the accessibility audit before Friday?”", category: "mention", createdAt: "2025-03-15T09:12:00Z", read: false },
  { id: "ntf_002", title: "New comment on Website Redesign", description: "Jackson Lee: “Navigation fix is ready for review.”", category: "comment", createdAt: "2025-03-15T08:40:00Z", read: false },
  { id: "ntf_003", title: "Payment method expiring", description: "Your Visa •• 4242 expires this month. Update it to avoid interruption.", category: "billing", createdAt: "2025-03-14T16:05:00Z", read: false },
  { id: "ntf_004", title: "New sign-in from Chrome on macOS", description: "San Francisco, CA · If this was you, no action is needed.", category: "security", createdAt: "2025-03-14T13:22:00Z", read: true },
  { id: "ntf_005", title: "Scheduled maintenance", description: "The platform will be read-only on Mar 16, 02:00–03:00 UTC.", category: "system", createdAt: "2025-03-13T10:00:00Z", read: true },
  { id: "ntf_006", title: "Isabella Nguyen mentioned you", description: "“…the new hero mockups are in, would love your eyes on them.”", category: "mention", createdAt: "2025-03-12T15:47:00Z", read: true },
  { id: "ntf_007", title: "Invoice paid", description: "Invoice #2025-031 for $299.00 was paid successfully.", category: "billing", createdAt: "2025-03-11T09:00:00Z", read: true },
  { id: "ntf_008", title: "New comment on Mobile App v2.0", description: "Alexander Walker: “Found an edge case in offline sync.”", category: "comment", createdAt: "2025-03-10T11:31:00Z", read: true },
];