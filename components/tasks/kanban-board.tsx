"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TaskCard } from "./task-card";
import { TASK_STATUSES, taskStatusMeta } from "@/lib/task-meta";
import { cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/types/task";

interface KanbanBoardProps {
  tasks: Task[];
  onMove: (taskId: string, status: TaskStatus) => void;
  onAddTask: (status: TaskStatus) => void;
}

export function KanbanBoard({ tasks, onMove, onAddTask }: KanbanBoardProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null);

  const handleDrop = (status: TaskStatus) => {
    if (draggedId) onMove(draggedId, status);
    setDraggedId(null);
    setDragOverColumn(null);
  };

  return (
    /* Wrapping grid — columns flow to the next row when there's no space.
       1 col mobile → 2 cols small → 3 cols desktop → 5 cols ultra-wide. */
    <div className="grid min-w-0 grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
      {TASK_STATUSES.map((status) => {
        const columnTasks = tasks.filter((t) => t.status === status);
        const isOver = dragOverColumn === status;

        return (
          <div
            key={status}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverColumn(status);
            }}
            onDragLeave={() => setDragOverColumn((prev) => (prev === status ? null : prev))}
            onDrop={(e) => {
              e.preventDefault();
              handleDrop(status);
            }}
            className={cn(
              "flex max-h-[70dvh] flex-col rounded-xl border border-border bg-muted/40 transition-colors",
              isOver && "border-accent/50 bg-accent-subtle/40"
            )}
          >
            {/* Column header */}
            <div className="flex items-center justify-between px-4 pb-2 pt-4">
              <div className="flex items-center gap-2">
                <span className={cn("size-2 rounded-full", taskStatusMeta[status].dotClass)} />
                <span className="text-sm font-semibold text-foreground">
                  {taskStatusMeta[status].label}
                </span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  {columnTasks.length}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                aria-label={`Add task to ${taskStatusMeta[status].label}`}
                onClick={() => onAddTask(status)}
              >
                <Plus className="size-4" />
              </Button>
            </div>

            {/* Cards — capped height with internal vertical scroll on ALL screens */}
            <div className="flex min-h-[160px] flex-1 flex-col gap-3 overflow-y-auto p-3 pt-1 scrollbar-thin">
              {columnTasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => setDraggedId(task.id)}
                  onDragEnd={() => {
                    setDraggedId(null);
                    setDragOverColumn(null);
                  }}
                  className={cn(
                    "cursor-grab active:cursor-grabbing",
                    draggedId === task.id && "opacity-50"
                  )}
                >
                  <TaskCard task={task} />
                </div>
              ))}
              {columnTasks.length === 0 && (
                <div className="grid h-24 place-items-center rounded-lg border border-dashed border-border text-xs text-muted-foreground">
                  Drop tasks here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}