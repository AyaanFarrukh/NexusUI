import type { EventCategory } from "@/types/event";

export const EVENT_CATEGORIES: EventCategory[] = [
  "meeting",
  "deadline",
  "personal",
  "reminder",
];

export const eventCategoryMeta: Record<
  EventCategory,
  { label: string; dotClass: string; badgeVariant: "info" | "danger" | "success" | "warning" }
> = {
  meeting: { label: "Meeting", dotClass: "bg-info", badgeVariant: "info" },
  deadline: { label: "Deadline", dotClass: "bg-danger", badgeVariant: "danger" },
  personal: { label: "Personal", dotClass: "bg-success", badgeVariant: "success" },
  reminder: { label: "Reminder", dotClass: "bg-warning", badgeVariant: "warning" },
};