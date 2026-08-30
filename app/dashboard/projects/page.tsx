import { ProjectsView } from "@/components/projects/projects-view";

export default function ProjectsPage() {
  return (
    <div className="space-y-6 min-w-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Projects</h1>
        <p className="text-muted-foreground">
          Track progress, deadlines and teams across all active initiatives.
        </p>
      </div>
      <ProjectsView />
    </div>
  );
}