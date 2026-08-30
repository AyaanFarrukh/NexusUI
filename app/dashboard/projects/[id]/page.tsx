import Link from "next/link";
import { FolderOpen } from "lucide-react";

import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ProjectHeader } from "@/components/projects/project-header";
import { ProjectDetailTabs } from "@/components/projects/project-detail-tabs";
import { getProject } from "@/data/projects";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) {
    return (
      <div className="space-y-6 min-w-0">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/projects">Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Not found</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-surface shadow-card">
          <EmptyState
            icon={<FolderOpen className="size-8" />}
            title="Project not found"
            description="The project you are looking for does not exist or may have been archived."
            action={
              <Link href="/dashboard/projects">
                <Button variant="outline">Back to projects</Button>
              </Link>
            }
            className="py-16"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 min-w-0">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/projects">Projects</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{project.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProjectHeader project={project} />
      <ProjectDetailTabs project={project} />
    </div>
  );
}