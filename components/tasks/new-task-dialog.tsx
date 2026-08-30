"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { taskAssignees } from "@/data/tasks";
import { TASK_PRIORITIES, TASK_STATUSES, taskPriorityMeta, taskStatusMeta } from "@/lib/task-meta";
import type { TaskPriority, TaskStatus } from "@/types/task";

export interface NewTaskPayload {
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  assigneeName?: string;
  dueDate?: string;
}

interface NewTaskDialogProps {
  open: boolean;
  defaultStatus: TaskStatus;
  onOpenChange: (open: boolean) => void;
  onCreate: (payload: NewTaskPayload) => void;
}

const statusOptions = TASK_STATUSES.map((s) => ({ value: s, label: taskStatusMeta[s].label }));
const priorityOptions = TASK_PRIORITIES.map((p) => ({ value: p, label: taskPriorityMeta[p].label }));
const assigneeOptions = [
  { value: "", label: "Unassigned" },
  ...taskAssignees.map((a) => ({ value: a.id, label: a.name })),
];

export function NewTaskDialog({ open, defaultStatus, onOpenChange, onCreate }: NewTaskDialogProps) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>(defaultStatus);
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [assigneeId, setAssigneeId] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Reset the form each time the dialog opens
  useEffect(() => {
    if (open) {
      setTitle("");
      setStatus(defaultStatus);
      setPriority("medium");
      setAssigneeId("");
      setDueDate("");
    }
  }, [open, defaultStatus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const assignee = taskAssignees.find((a) => a.id === assigneeId);
    onCreate({
      title: title.trim(),
      status,
      priority,
      assigneeId: assignee?.id,
      assigneeName: assignee?.name,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
          <DialogDescription>
            Add a new task to the board. You can drag it between columns later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="task-title" className="text-sm font-medium text-foreground">
              Title
            </label>
            <Input
              id="task-title"
              placeholder="e.g. Fix login redirect loop"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="task-status" className="text-sm font-medium text-foreground">
                Status
              </label>
              <Select
                id="task-status"
                options={statusOptions}
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="task-priority" className="text-sm font-medium text-foreground">
                Priority
              </label>
              <Select
                id="task-priority"
                options={priorityOptions}
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="task-assignee" className="text-sm font-medium text-foreground">
                Assignee
              </label>
              <Select
                id="task-assignee"
                options={assigneeOptions}
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="task-due" className="text-sm font-medium text-foreground">
                Due date
              </label>
              <Input
                id="task-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Create task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}