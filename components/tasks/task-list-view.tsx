import { Calendar } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { deadlineInfo, formatDate } from "@/lib/project-meta";
import { TASK_STATUSES, taskPriorityMeta, taskStatusMeta } from "@/lib/task-meta";
import { cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/types/task";

interface TaskListViewProps {
  tasks: Task[];
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

const statusOptions = TASK_STATUSES.map((s) => ({
  value: s,
  label: taskStatusMeta[s].label,
}));

export function TaskListView({ tasks, onStatusChange }: TaskListViewProps) {
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-surface shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Task</th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Priority</th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Assignee</th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Due date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tasks.map((task) => {
              const due = task.dueDate ? deadlineInfo(task.dueDate) : null;
              const showOverdue = due?.overdue && task.status !== "completed";

              return (
                <tr key={task.id} className="transition-colors hover:bg-muted/30">
                  <td className="whitespace-nowrap px-6 py-4">
                    <p className="font-medium text-foreground">{task.title}</p>
                    {task.projectName && (
                      <p className="text-xs text-muted-foreground">{task.projectName}</p>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Select
                      options={statusOptions}
                      value={task.status}
                      onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
                      className="h-8 w-[140px] text-xs"
                      aria-label={`Change status of ${task.title}`}
                    />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Badge variant={taskPriorityMeta[task.priority].variant}>
                      {taskPriorityMeta[task.priority].label}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {task.assigneeName ? (
                      <div className="flex items-center gap-2">
                        <Avatar fallback={task.assigneeName} size="sm" />
                        <span className="text-muted-foreground">{task.assigneeName}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Unassigned</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {task.dueDate ? (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 text-muted-foreground",
                          showOverdue && "font-medium text-danger-fg"
                        )}
                      >
                        <Calendar className="size-3.5" />
                        {showOverdue ? due!.label : formatDate(task.dueDate)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
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