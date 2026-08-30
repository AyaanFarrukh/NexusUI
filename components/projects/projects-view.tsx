"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutGrid, List, Plus, Search, FolderKanban } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { useToast } from "@/lib/hooks/use-toast";
import { ProjectCard } from "./project-card";
import { ProjectTable } from "./project-table";
import { projectsData } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

const statusOptions = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "planning", label: "Planning" },
  { value: "on-hold", label: "On Hold" },
  { value: "completed", label: "Completed" },
];

const priorityOptions = [
  { value: "all", label: "All priorities" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

function CardSkeleton() {
  return (
    <div className="space-y-4 rounded-xl border border-border bg-surface p-5">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-2 w-full" />
      <div className="flex justify-between">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

export function ProjectsView() {
  const router = useRouter();
  const { toast } = useToast();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [view, setView] = useState<"cards" | "table">("cards");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setProjects(projectsData);
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = useMemo(() => {
    const searchLower = search.toLowerCase();
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower);
      const matchesStatus = statusFilter === "all" || project.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [projects, search, statusFilter, priorityFilter]);

  const isEmpty = !isLoading && projects.length === 0;
  const isNoResults = !isLoading && projects.length > 0 && filteredProjects.length === 0;

  return (
    <div className="space-y-4 min-w-0">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-xs">
          <Input
            placeholder="Search projects..."
            icon={<Search className="size-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-[140px]"
          />
          <Select
            options={priorityOptions}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-[140px]"
          />

          {/* View toggle */}
          <div className="flex items-center rounded-lg border border-border bg-muted p-0.5">
            <button
              type="button"
              aria-label="Card view"
              onClick={() => setView("cards")}
              className={cn(
                "focus-ring rounded-md p-1.5 transition-colors",
                view === "cards"
                  ? "bg-surface text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Table view"
              onClick={() => setView("table")}
              className={cn(
                "focus-ring rounded-md p-1.5 transition-colors",
                view === "table"
                  ? "bg-surface text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="size-4" />
            </button>
          </div>

          <Button onClick={() => toast({ title: "New project", description: "Project creation wizard is a buyer integration point." })}>
            <Plus className="mr-2 size-4" />
            New project
          </Button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 min-w-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : isEmpty ? (
        <div className="rounded-xl border border-border bg-surface shadow-card">
          <EmptyState
            icon={<FolderKanban className="size-8" />}
            title="No projects yet"
            description="Create your first project to start tracking progress with your team."
            action={<Button>New project</Button>}
            className="py-16"
          />
        </div>
      ) : isNoResults ? (
        <div className="rounded-xl border border-border bg-surface shadow-card">
          <EmptyState
            icon={<Search className="size-8" />}
            title="No projects found"
            description="Try adjusting your search or filters to find what you're looking for."
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                  setPriorityFilter("all");
                }}
              >
                Clear filters
              </Button>
            }
            className="py-16"
          />
        </div>
      ) : view === "cards" ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 min-w-0">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <ProjectTable projects={filteredProjects} onOpen={(id) => router.push(`/dashboard/projects/${id}`)} />
      )}
    </div>
  );
}