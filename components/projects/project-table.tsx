import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TeamAvatarStack } from "./team-avatar-stack";
import {
  deadlineInfo,
  formatDate,
  projectPriorityMeta,
  projectStatusMeta,
} from "@/lib/project-meta";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

interface ProjectTableProps {
  projects: Project[];
  onOpen: (id: string) => void;
}

export function ProjectTable({ projects, onOpen }: ProjectTableProps) {
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-surface shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Project</th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Priority</th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Progress</th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Team</th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Deadline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {projects.map((project) => {
              const deadline = deadlineInfo(project.deadline);
              const showOverdue = deadline.overdue && project.status !== "completed";

              return (
                <tr
                  key={project.id}
                  onClick={() => onOpen(project.id)}
                  className="cursor-pointer transition-colors hover:bg-muted/30"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <p className="font-medium text-foreground">{project.name}</p>
                    <p className="max-w-[240px] truncate text-xs text-muted-foreground">
                      {project.description}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Badge variant={projectStatusMeta[project.status].variant}>
                      {projectStatusMeta[project.status].label}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Badge variant={projectPriorityMeta[project.priority].variant}>
                      {projectPriorityMeta[project.priority].label}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="w-24" />
                      <span className="text-xs text-muted-foreground">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <TeamAvatarStack members={project.team} max={3} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <p className="text-foreground">{formatDate(project.deadline)}</p>
                    <p className={cn("text-xs text-muted-foreground", showOverdue && "font-medium text-danger-fg")}>
                      {showOverdue ? deadline.label : `${project.tasks.length} tasks`}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}