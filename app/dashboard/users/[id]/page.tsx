import Link from "next/link";
import { UserX } from "lucide-react";

import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ProfileHeader } from "@/components/users/profile-header";
import { ProfileStats } from "@/components/users/profile-stats";
import { ProfileTabs } from "@/components/users/profile-tabs";
import { getUserProfile } from "@/data/user-profile";

export default async function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = getUserProfile(id);

  // Unknown ID → polished "not found" state instead of showing the wrong user
  if (!profile) {
    return (
      <div className="space-y-6 min-w-0">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/users">Users</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Not found</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="rounded-xl border border-border bg-surface shadow-card overflow-hidden min-w-0">
          <EmptyState
            icon={<UserX className="size-8" />}
            title="User not found"
            description="The user you are looking for does not exist or may have been removed."
            action={
              <Link href="/dashboard/users">
                <Button variant="outline">Back to users</Button>
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
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/users">Users</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{profile.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Profile Header */}
      <ProfileHeader
        name={profile.name}
        email={profile.email}
        phone={profile.phone}
        role={profile.role}
        status={profile.status}
        location={profile.location}
        joinedAt={profile.joinedAt}
        lastActive={profile.lastActive}
        bio={profile.bio}
      />

      {/* Stats */}
      <ProfileStats stats={profile.stats} />

      {/* Tabs */}
      <ProfileTabs profile={profile} />
    </div>
  );
}