"use client";

import { Calendar, User, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TeamAvatarStack } from "./team-avatar-stack";
import { useToast } from "@/lib/hooks/use-toast";
import {
  deadlineInfo,
  formatDate,
  projectPriorityMeta,
  projectStatusMeta,
} from "@/lib/project-meta";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

export function ProjectHeader({ project }: { project: Project }) {
  const { toast } = useToast();
  const deadline = deadlineInfo(project.deadline);
  const showOverdue = deadline.overdue && project.status !== "completed";

  return (
    <Card className="min-w-0">
      <CardContent className="space-y-5 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {project.name}
              </h1>
              <Badge variant={projectStatusMeta[project.status].variant}>
                {projectStatusMeta[project.status].label}
              </Badge>
              <Badge variant={projectPriorityMeta[project.priority].variant}>
                {projectPriorityMeta[project.priority].label} priority
              </Badge>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast({ title: "Share link copied", description: "Anyone with the link can view this project." })}
            >
              Share
            </Button>
            <Button
              size="sm"
              onClick={() => toast({ title: "Manage project", description: "Project settings are a buyer integration point." })}
            >
              Manage project
            </Button>
          </div>
        </div>

        <div className="grid gap-4 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground">Progress</p>
            <div className="flex items-center gap-2">
              <Progress value={project.progress} className="flex-1" />
              <span className="text-sm font-semibold text-foreground">{project.progress}%</span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Calendar className="size-3.5" />
              Deadline
            </p>
            <p className="text-sm font-medium text-foreground">{formatDate(project.deadline)}</p>
            <p className={cn("text-xs text-muted-foreground", showOverdue && "font-medium text-danger-fg")}>
              {showOverdue ? deadline.label : "On schedule"}
            </p>
          </div>

          <div className="space-y-1">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <User className="size-3.5" />
              Owner
            </p>
            <p className="text-sm font-medium text-foreground">{project.owner}</p>
            <p className="text-xs text-muted-foreground">Started {formatDate(project.startDate)}</p>
          </div>

          <div className="space-y-1">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Wallet className="size-3.5" />
              Budget
            </p>
            <p className="text-sm font-medium text-foreground">{project.budget}</p>
            <div className="pt-1">
              <TeamAvatarStack members={project.team} max={4} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}