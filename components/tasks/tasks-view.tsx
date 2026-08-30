"use client";

import { useEffect, useMemo, useState } from "react";
import { List, Plus, Search, SquareKanban, CheckSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { KanbanBoard } from "./kanban-board";
import { TaskListView } from "./task-list-view";
import { NewTaskDialog, type NewTaskPayload } from "./new-task-dialog";
import { useToast } from "@/lib/hooks/use-toast";
import { tasksData } from "@/data/tasks";
import { TASK_PRIORITIES, taskPriorityMeta } from "@/lib/task-meta";
import { cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/types/task";

const priorityOptions = [
  { value: "all", label: "All priorities" },
  ...TASK_PRIORITIES.map((p) => ({ value: p, label: taskPriorityMeta[p].label })),
];

function BoardSkeleton() {
  return (
    <div className="flex min-w-0 gap-4 overflow-x-auto pb-4">
      {Array.from({ length: 5 }).map((_, col) => (
        <div key={col} className="w-[280px] shrink-0 space-y-3 rounded-xl border border-border bg-muted/40 p-3">
          <div className="flex items-center justify-between px-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-6" />
          </div>
          {Array.from({ length: 2 }).map((_, card) => (
            <div key={card} className="space-y-3 rounded-xl border border-border bg-surface p-4">
              <Skeleton className="h-4 w-16 rounded-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function TasksView() {
  const { toast } = useToast();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>("todo");

  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(tasksData);
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const assigneeOptions = useMemo(() => {
    const map = new Map<string, string>();
    tasks.forEach((t) => {
      if (t.assigneeId && t.assigneeName) map.set(t.assigneeId, t.assigneeName);
    });
    return [
      { value: "all", label: "All assignees" },
      ...Array.from(map, ([value, label]) => ({ value, label })),
    ];
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const searchLower = search.toLowerCase();
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchLower) ||
        task.tags.some((tag) => tag.toLowerCase().includes(searchLower));
      const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
      const matchesAssignee = assigneeFilter === "all" || task.assigneeId === assigneeFilter;
      return matchesSearch && matchesPriority && matchesAssignee;
    });
  }, [tasks, search, priorityFilter, assigneeFilter]);

  const handleMove = (taskId: string, status: TaskStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status } : t)));
  };

  const handleCreate = (payload: NewTaskPayload) => {
    const task: Task = {
      id: `tsk_${Date.now()}`,
      title: payload.title,
      status: payload.status,
      priority: payload.priority,
      assigneeId: payload.assigneeId,
      assigneeName: payload.assigneeName,
      dueDate: payload.dueDate,
      tags: [],
    };
    setTasks((prev) => [task, ...prev]);
    toast({ title: "Task created", description: payload.title, variant: "success" });
  };

  const openDialog = (status: TaskStatus) => {
    setDefaultStatus(status);
    setDialogOpen(true);
  };

  const isEmpty = !isLoading && tasks.length === 0;
  const isNoResults = !isLoading && tasks.length > 0 && filteredTasks.length === 0;

  return (
    <div className="space-y-4 min-w-0">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-xs">
          <Input
            placeholder="Search tasks or tags..."
            icon={<Search className="size-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            options={priorityOptions}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-[140px]"
          />
          <Select
            options={assigneeOptions}
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
            className="w-[160px]"
          />

          {/* View toggle */}
          <div className="flex items-center rounded-lg border border-border bg-muted p-0.5">
            <button
              type="button"
              aria-label="Kanban view"
              onClick={() => setView("kanban")}
              className={cn(
                "focus-ring rounded-md p-1.5 transition-colors",
                view === "kanban"
                  ? "bg-surface text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <SquareKanban className="size-4" />
            </button>
            <button
              type="button"
              aria-label="List view"
              onClick={() => setView("list")}
              className={cn(
                "focus-ring rounded-md p-1.5 transition-colors",
                view === "list"
                  ? "bg-surface text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="size-4" />
            </button>
          </div>

          <Button onClick={() => openDialog("todo")}>
            <Plus className="mr-2 size-4" />
            New task
          </Button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <BoardSkeleton />
      ) : isEmpty ? (
        <div className="rounded-xl border border-border bg-surface shadow-card">
          <EmptyState
            icon={<CheckSquare className="size-8" />}
            title="No tasks yet"
            description="Create your first task to start organizing work across the board."
            action={<Button onClick={() => openDialog("todo")}>New task</Button>}
            className="py-16"
          />
        </div>
      ) : isNoResults ? (
        <div className="rounded-xl border border-border bg-surface shadow-card">
          <EmptyState
            icon={<Search className="size-8" />}
            title="No tasks found"
            description="Try adjusting your search or filters to find what you're looking for."
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setPriorityFilter("all");
                  setAssigneeFilter("all");
                }}
              >
                Clear filters
              </Button>
            }
            className="py-16"
          />
        </div>
      ) : view === "kanban" ? (
        <KanbanBoard tasks={filteredTasks} onMove={handleMove} onAddTask={openDialog} />
      ) : (
        <TaskListView tasks={filteredTasks} onStatusChange={handleMove} />
      )}

      <NewTaskDialog
        open={dialogOpen}
        defaultStatus={defaultStatus}
        onOpenChange={setDialogOpen}
        onCreate={handleCreate}
      />
    </div>
  );
}