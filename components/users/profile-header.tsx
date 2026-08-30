"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks/use-toast";
import { UserStatus, UserRole } from "@/types/user";
import { Mail, Phone, MapPin, Calendar, MessageSquare, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusBadgeMap: Record<UserStatus, { label: string; variant: "success" | "neutral" | "warning" }> = {
  active: { label: "Active", variant: "success" },
  inactive: { label: "Inactive", variant: "neutral" },
  pending: { label: "Pending", variant: "warning" },
};

const roleBadgeMap: Record<UserRole, string> = {
  admin: "Administrator",
  editor: "Editor",
  viewer: "Viewer",
  billing: "Billing",
};

interface ProfileHeaderProps {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  location: string;
  joinedAt: string;
  lastActive: string;
  bio: string;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ProfileHeader({
  name,
  email,
  phone,
  role,
  status,
  location,
  joinedAt,
  bio,
}: ProfileHeaderProps) {
  const { toast } = useToast();

  return (
    <div className="rounded-xl border border-border bg-surface shadow-card overflow-hidden min-w-0">
      {/* Decorative cover band (intentional design element) */}
      <div className="h-24 bg-gradient-to-r from-accent/25 via-accent/10 to-transparent sm:h-28" />

      <div className="px-6 pb-6">
        {/* Identity row — only the avatar overlaps the cover band */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4">
            <Avatar
              fallback={name}
              size="xl"
              className="-mt-12 shrink-0 ring-4 ring-surface"
            />
            <div className="min-w-0 sm:pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold text-foreground">{name}</h1>
                <Badge variant={statusBadgeMap[status].variant}>
                  {statusBadgeMap[status].label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{roleBadgeMap[role]}</p>
            </div>
          </div>

          {/* Actions now align perfectly with the name, below the band */}
          <div className="flex shrink-0 gap-2 sm:pb-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast({ title: "Message sent", description: `Opening chat with ${name}...` })}
            >
              <MessageSquare className="mr-2 size-4" />
              Message
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="size-8">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => toast({ title: "Edit user", description: "Opening editor..." })}>
                  Edit profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast({ title: "Permissions", description: "Opening permissions..." })}>
                  Manage permissions
                </DropdownMenuItem>
                <DropdownMenuItem className="text-danger-fg">
                  Deactivate account
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{bio}</p>

        {/* Meta info */}
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Mail className="size-3.5" />
            {email}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Phone className="size-3.5" />
            {phone}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            Joined {formatDate(joinedAt)}
          </span>
        </div>
      </div>
    </div>
  );
}