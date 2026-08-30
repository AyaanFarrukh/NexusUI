export type ProjectStatus = "active" | "planning" | "on-hold" | "completed";
export type ProjectPriority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "todo" | "in-progress" | "review" | "done";
export type ProjectFileType = "fig" | "pdf" | "doc" | "zip" | "img" | "sheet";

export interface ProjectMember {
  id: string;
  name: string;
  role: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  status: TaskStatus;
  priority: ProjectPriority;
  assigneeId?: string;
  assigneeName?: string;
  dueDate: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  type: ProjectFileType;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface ProjectActivity {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  startDate: string;
  deadline: string;
  budget: string;
  owner: string;
  tags: string[];
  team: ProjectMember[];
  tasks: ProjectTask[];
  files: ProjectFile[];
  activity: ProjectActivity[];
}