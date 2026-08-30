import type { ProjectPriority, ProjectStatus, TaskStatus } from "@/types/project";

export const projectStatusMeta: Record<
  ProjectStatus,
  { label: string; variant: "success" | "info" | "warning" | "neutral" }
> = {
  active: { label: "Active", variant: "success" },
  planning: { label: "Planning", variant: "info" },
  "on-hold": { label: "On Hold", variant: "warning" },
  completed: { label: "Completed", variant: "neutral" },
};

export const projectPriorityMeta: Record<
  ProjectPriority,
  { label: string; variant: "neutral" | "info" | "warning" | "danger" }
> = {
  low: { label: "Low", variant: "neutral" },
  medium: { label: "Medium", variant: "info" },
  high: { label: "High", variant: "warning" },
  urgent: { label: "Urgent", variant: "danger" },
};

export const taskStatusMeta: Record<
  TaskStatus,
  { label: string; variant: "neutral" | "info" | "warning" | "success" }
> = {
  todo: { label: "To Do", variant: "neutral" },
  "in-progress": { label: "In Progress", variant: "info" },
  review: { label: "Review", variant: "warning" },
  done: { label: "Done", variant: "success" },
};

/** Fixed "today" so mock data always renders consistently. */
const NOW = new Date("2025-03-15T00:00:00Z");

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function deadlineInfo(dateString: string): { label: string; overdue: boolean } {
  const diff = Math.ceil((new Date(dateString).getTime() - NOW.getTime()) / 86400000);
  if (diff < 0) return { label: `${Math.abs(diff)}d overdue`, overdue: true };
  if (diff === 0) return { label: "Due today", overdue: false };
  return { label: `Due in ${diff}d`, overdue: false };
}