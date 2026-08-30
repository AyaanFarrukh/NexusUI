export type NotificationCategory = "mention" | "comment" | "system" | "billing" | "security";

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  category: NotificationCategory;
  createdAt: string;
  read: boolean;
}