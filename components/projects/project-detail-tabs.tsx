"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileText,
  PenTool,
} from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/lib/hooks/use-toast";
import { formatDate, taskStatusMeta } from "@/lib/project-meta";
import type { Project, ProjectFileType } from "@/types/project";

const fileTypeIcon: Record<ProjectFileType, React.ComponentType<{ className?: string }>> = {
  fig: PenTool,
  img: FileImage,
  pdf: FileText,
  doc: FileText,
  sheet: FileSpreadsheet,
  zip: FileArchive,
};

const taskFilterOptions = [
  { value: "all", label: "All tasks" },
  { value: "todo", label: "To Do" },
  { value: "in-progress", label: "In Progress" },
  { value: "review", label: "Review" },
  { value: "done", label: "Done" },
];

/* ─── Overview ─────────────────────────────────────────────────── */
function OverviewTab({ project }: { project: Project }) {
  const counts = {
    todo: project.tasks.filter((t) => t.status === "todo").length,
    inProgress: project.tasks.filter((t) => t.status === "in-progress").length,
    review: project.tasks.filter((t) => t.status === "review").length,
    done: project.tasks.filter((t) => t.status === "done").length,
  };

  return (
    <div className="grid gap-4 lg:grid-cols-3 min-w-0">
      <div className="space-y-4 lg:col-span-2 min-w-0">
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>About this project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Task summary</CardTitle>
            <CardDescription>
              {counts.done} of {project.tasks.length} tasks completed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "To Do", value: counts.todo, variant: "neutral" as const },
                { label: "In Progress", value: counts.inProgress, variant: "info" as const },
                { label: "Review", value: counts.review, variant: "warning" as const },
                { label: "Done", value: counts.done, variant: "success" as const },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-background/50 p-3 text-center">
                  <p className="text-xl font-bold text-foreground">{item.value}</p>
                  <Badge variant={item.variant} className="mt-1">{item.label}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="min-w-0 h-fit">
        <CardHeader>
          <CardTitle>Key details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-4">
            {[
              { label: "Owner", value: project.owner },
              { label: "Start date", value: formatDate(project.startDate) },
              { label: "Deadline", value: formatDate(project.deadline) },
              { label: "Budget", value: project.budget },
              { label: "Team size", value: `${project.team.length} members` },
              { label: "Files", value: `${project.files.length} uploaded` },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-2">
                <dt className="text-sm text-muted-foreground">{item.label}</dt>
                <dd className="text-sm font-medium text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

/* ─── Tasks ───────────────────────────────────────────────────── */
function TasksTab({ project }: { project: Project }) {
  const [filter, setFilter] = useState("all");
  const tasks =
    filter === "all" ? project.tasks : project.tasks.filter((t) => t.status === filter);

  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>{project.tasks.length} tasks in this project.</CardDescription>
        </div>
        <Select
          options={taskFilterOptions}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-[140px]"
        />
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Task</th>
                <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Priority</th>
                <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Assignee</th>
                <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tasks.map((task) => (
                <tr key={task.id} className="transition-colors hover:bg-muted/30">
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-foreground">{task.title}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Badge variant={taskStatusMeta[task.status].variant}>
                      {taskStatusMeta[task.status].label}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 capitalize text-muted-foreground">
                    {task.priority}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      {task.assigneeName && <Avatar fallback={task.assigneeName} size="sm" />}
                      <span className="text-muted-foreground">{task.assigneeName ?? "Unassigned"}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">
                    {formatDate(task.dueDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Team ─────────────────────────────────────────────────────── */
function TeamTab({ project }: { project: Project }) {
  const router = useRouter();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 min-w-0">
      {project.team.map((member) => (
        <Card key={member.id} className="min-w-0">
          <CardContent className="flex items-center gap-4 p-5">
            <Avatar fallback={member.name} size="lg" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-foreground">{member.name}</p>
              <p className="truncate text-sm text-muted-foreground">{member.role}</p>
            </div>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => router.push(`/dashboard/users/${member.id}`)}
            >
              View
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/* ─── Files ────────────────────────────────────────────────────── */
function FilesTab({ project }: { project: Project }) {
  const { toast } = useToast();

  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader>
        <CardTitle>Files</CardTitle>
        <CardDescription>{project.files.length} files shared in this project.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-border">
          {project.files.map((file) => {
            const Icon = fileTypeIcon[file.type];
            return (
              <li key={file.id} className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/30">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-subtle text-accent-subtle-fg">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {file.size} · {file.uploadedBy} · {formatDate(file.uploadedAt)}
                  </p>
                </div>
                <IconButton
                  variant="ghost"
                  aria-label={`Download ${file.name}`}
                  onClick={() => toast({ title: "Download started", description: file.name })}
                >
                  <Download className="size-4" />
                </IconButton>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}

/* ─── Activity ─────────────────────────────────────────────────── */
function ActivityTab({ project }: { project: Project }) {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Activity</CardTitle>
        <CardDescription>Latest updates from the team.</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          {project.activity.map((item, index) => {
            const isLast = index === project.activity.length - 1;
            return (
              <div key={item.id} className="relative flex gap-4 pb-6">
                {!isLast && (
                  <div className="absolute left-[7px] top-5 bottom-0 w-px bg-border" />
                )}
                <span className="relative z-10 mt-1.5 size-[15px] shrink-0 rounded-full border-2 border-border bg-accent" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{item.actor}</span>{" "}
                    <span className="text-muted-foreground">{item.action}</span>{" "}
                    <span className="font-medium">{item.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.timestamp).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Main Tabs ────────────────────────────────────────────────── */
export function ProjectDetailTabs({ project }: { project: Project }) {
  return (
    <Tabs defaultValue="overview" className="min-w-0">
      <TabsList className="mb-4 h-auto flex-wrap">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="files">Files</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>

      <TabsContent value="overview"><OverviewTab project={project} /></TabsContent>
      <TabsContent value="tasks"><TasksTab project={project} /></TabsContent>
      <TabsContent value="team"><TeamTab project={project} /></TabsContent>
      <TabsContent value="files"><FilesTab project={project} /></TabsContent>
      <TabsContent value="activity"><ActivityTab project={project} /></TabsContent>
    </Tabs>
  );
}