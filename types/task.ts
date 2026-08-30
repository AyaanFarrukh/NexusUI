export type TaskStatus = "backlog" | "todo" | "in-progress" | "review" | "completed";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  assigneeName?: string;
  dueDate?: string;
  tags: string[];
  projectName?: string;
  comments?: number;
  attachments?: number;
}