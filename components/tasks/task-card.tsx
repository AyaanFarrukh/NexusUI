import { Calendar, MessageSquare, Paperclip } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { deadlineInfo, formatDate } from "@/lib/project-meta";
import { taskPriorityMeta } from "@/lib/task-meta";
import { cn } from "@/lib/utils";
import type { Task } from "@/types/task";

export function TaskCard({ task }: { task: Task }) {
  const due = task.dueDate ? deadlineInfo(task.dueDate) : null;
  const showOverdue = due?.overdue && task.status !== "completed";

  return (
    <div className="space-y-3 rounded-xl border border-border bg-surface p-4 shadow-card transition-colors hover:border-accent/40">
      <div className="flex items-center justify-between gap-2">
        <Badge variant={taskPriorityMeta[task.priority].variant}>
          {taskPriorityMeta[task.priority].label}
        </Badge>
        {due && (
          <span
            className={cn(
              "inline-flex items-center gap-1 text-xs text-muted-foreground",
              showOverdue && "font-medium text-danger-fg"
            )}
          >
            <Calendar className="size-3" />
            {showOverdue ? due.label : formatDate(task.dueDate!)}
          </span>
        )}
      </div>

      <p className="text-sm font-medium leading-snug text-foreground">{task.title}</p>

      {task.projectName && (
        <p className="text-xs text-muted-foreground">{task.projectName}</p>
      )}

      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {task.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="px-1.5 text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-border pt-3">
        {task.assigneeName ? (
          <div className="flex items-center gap-2">
            <Avatar fallback={task.assigneeName} size="sm" />
            <span className="text-xs text-muted-foreground">{task.assigneeName}</span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">Unassigned</span>
        )}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {task.comments ? (
            <span className="inline-flex items-center gap-1">
              <MessageSquare className="size-3" />
              {task.comments}
            </span>
          ) : null}
          {task.attachments ? (
            <span className="inline-flex items-center gap-1">
              <Paperclip className="size-3" />
              {task.attachments}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}