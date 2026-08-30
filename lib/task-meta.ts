import type { TaskPriority, TaskStatus } from "@/types/task";

export const TASK_STATUSES: TaskStatus[] = [
  "backlog",
  "todo",
  "in-progress",
  "review",
  "completed",
];

export const TASK_PRIORITIES: TaskPriority[] = ["low", "medium", "high", "urgent"];

export const taskStatusMeta: Record<
  TaskStatus,
  { label: string; dotClass: string; badgeVariant: "neutral" | "info" | "accent" | "warning" | "success" }
> = {
  backlog: { label: "Backlog", dotClass: "bg-muted-foreground", badgeVariant: "neutral" },
  todo: { label: "To Do", dotClass: "bg-info", badgeVariant: "info" },
  "in-progress": { label: "In Progress", dotClass: "bg-accent", badgeVariant: "accent" },
  review: { label: "Review", dotClass: "bg-warning", badgeVariant: "warning" },
  completed: { label: "Completed", dotClass: "bg-success", badgeVariant: "success" },
};

export const taskPriorityMeta: Record<
  TaskPriority,
  { label: string; variant: "neutral" | "info" | "warning" | "danger" }
> = {
  low: { label: "Low", variant: "neutral" },
  medium: { label: "Medium", variant: "info" },
  high: { label: "High", variant: "warning" },
  urgent: { label: "Urgent", variant: "danger" },
};