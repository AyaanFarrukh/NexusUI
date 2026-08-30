import { TasksView } from "@/components/tasks/tasks-view";

export default function TasksPage() {
  return (
    <div className="space-y-6 min-w-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Tasks</h1>
        <p className="text-muted-foreground">
          Organize work on the board — drag cards between columns to update status.
        </p>
      </div>
      <TasksView />
    </div>
  );
}