import Link from "next/link";
import { Calendar, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TeamAvatarStack } from "./team-avatar-stack";
import { deadlineInfo, formatDate, projectStatusMeta } from "@/lib/project-meta";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

export function ProjectCard({ project }: { project: Project }) {
  const doneTasks = project.tasks.filter((t) => t.status === "done").length;
  const deadline = deadlineInfo(project.deadline);
  const showOverdue = deadline.overdue && project.status !== "completed";

  return (
    <Link
      href={`/dashboard/projects/${project.id}`}
      className="focus-ring group block rounded-xl"
    >
      <Card className="h-full transition-all duration-200 group-hover:border-accent/40 group-hover:shadow-pop">
        <CardContent className="flex h-full flex-col gap-4 p-5">
          {/* Title + status */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground transition-colors group-hover:text-accent">
              {project.name}
            </h3>
            <Badge variant={projectStatusMeta[project.status].variant} className="shrink-0">
              {projectStatusMeta[project.status].label}
            </Badge>
          </div>

          {/* Description */}
          <p className="line-clamp-2 text-sm text-muted-foreground">{project.description}</p>

          {/* Progress */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{project.progress}%</span>
            </div>
            <Progress value={project.progress} />
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
            <TeamAvatarStack members={project.team} max={3} />
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="size-3.5" />
                {doneTasks}/{project.tasks.length}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1",
                  showOverdue && "font-medium text-danger-fg"
                )}
              >
                <Calendar className="size-3.5" />
                {showOverdue ? deadline.label : formatDate(project.deadline)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}