"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/lib/hooks/use-toast";
import {
  PlusCircle,
  FileText,
  Pencil,
  Trash2,
  LogIn,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserProfile } from "@/data/user-profile";

// ─── Activity Timeline ────────────────────────────────────────────
const activityIconMap = {
  create: { icon: PlusCircle, color: "text-success" },
  update: { icon: Pencil, color: "text-accent" },
  delete: { icon: Trash2, color: "text-danger" },
  login: { icon: LogIn, color: "text-info" },
  comment: { icon: MessageSquare, color: "text-warning" },
};

function ActivityTab({ activity }: { activity: UserProfile["activity"] }) {
  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Activity Timeline</CardTitle>
        <CardDescription>Recent actions and events for this user.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {activity.map((item, index) => {
            const { icon: Icon, color } = activityIconMap[item.type];
            const isLast = index === activity.length - 1;

            return (
              <div key={item.id} className="relative flex gap-4 pb-6">
                {/* Vertical line */}
                {!isLast && (
                  <div className="absolute left-[15px] top-8 bottom-0 w-px bg-border" />
                )}

                {/* Icon */}
                <div className={cn("relative z-10 mt-0.5 rounded-full bg-surface p-1.5 ring-1 ring-border", color)}>
                  <Icon className="size-4" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{item.action}</span>{" "}
                    <span className="text-muted-foreground">{item.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.timestamp).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Projects Tab ─────────────────────────────────────────────────
const projectStatusMap: Record<string, { label: string; variant: "success" | "warning" | "neutral" }> = {
  active: { label: "Active", variant: "success" },
  completed: { label: "Completed", variant: "neutral" },
  "on-hold": { label: "On Hold", variant: "warning" },
};

function ProjectsTab({ projects }: { projects: UserProfile["projects"] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 min-w-0">
      {projects.map((project) => (
        <Card key={project.id} className="min-w-0">
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h4 className="font-semibold text-foreground">{project.name}</h4>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
              </div>
              <Badge variant={projectStatusMap[project.status].variant}>
                {projectStatusMap[project.status].label}
              </Badge>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{project.progress}%</span>
              </div>
              <Progress value={project.progress} />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Role: {project.role}</span>
              <Button variant="ghost" size="xs">View details</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─── Transactions Tab ─────────────────────────────────────────────
const txnStatusMap: Record<string, { label: string; variant: "success" | "warning" | "danger" }> = {
  completed: { label: "Completed", variant: "success" },
  pending: { label: "Pending", variant: "warning" },
  failed: { label: "Failed", variant: "danger" },
};

function TransactionsTab({ transactions }: { transactions: UserProfile["transactions"] }) {
  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Billing history and payment records.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Description
                </th>
                <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Date
                </th>
                <th className="whitespace-nowrap px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Amount
                </th>
                <th className="whitespace-nowrap px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((txn) => (
                <tr key={txn.id} className="transition-colors hover:bg-muted/30">
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-foreground">
                    {txn.description}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">
                    {new Date(txn.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-foreground">
                    {txn.amount}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <Badge variant={txnStatusMap[txn.status].variant}>
                      {txnStatusMap[txn.status].label}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────
function OverviewTab({ profile }: { profile: UserProfile }) {
  const { toast } = useToast();

  return (
    <div className="grid gap-4 lg:grid-cols-2 min-w-0">
      {/* User Information */}
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-4">
            {[
              { label: "Full Name", value: profile.name },
              { label: "Email Address", value: profile.email },
              { label: "Phone", value: profile.phone },
              { label: "Department", value: profile.department },
              { label: "Location", value: profile.location },
              {
                label: "Joined",
                value: new Date(profile.joinedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }),
              },
              {
                label: "Last Active",
                value: new Date(profile.lastActive).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-0.5 sm:flex-row sm:justify-between">
                <dt className="text-sm text-muted-foreground">{item.label}</dt>
                <dd className="text-sm font-medium text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card className="min-w-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Internal Notes</CardTitle>
            <CardDescription>Private notes visible to admins only.</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => toast({ title: "Add note", description: "Note editor coming in a future update." })}>
            Add note
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {profile.notes.map((note) => (
            <div key={note.id} className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-sm leading-relaxed text-foreground">{note.content}</p>
              <div className="mt-3 flex items-center gap-2">
                <Avatar fallback={note.author} size="sm" />
                <div>
                  <p className="text-xs font-medium text-foreground">{note.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(note.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Settings Tab ─────────────────────────────────────────────────
function SettingsTab({ profile }: { profile: UserProfile }) {
  const { toast } = useToast();

  return (
    <div className="space-y-4 min-w-0">
      {/* Edit Profile */}
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update the user's personal information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              toast({ title: "Profile updated", description: "Changes have been saved.", variant: "success" });
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <Input defaultValue={profile.name} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input type="email" defaultValue={profile.email} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Phone</label>
                <Input defaultValue={profile.phone} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Department</label>
                <Select
                  options={[
                    { value: "product", label: "Product & Design" },
                    { value: "engineering", label: "Engineering" },
                    { value: "marketing", label: "Marketing" },
                    { value: "sales", label: "Sales" },
                  ]}
                  defaultValue="product"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Bio</label>
              <Textarea rows={3} defaultValue={profile.bio} />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage account-level preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Email notifications</p>
              <p className="text-sm text-muted-foreground">Receive email updates about account activity.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Two-factor authentication</p>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to the account.</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Active sessions</p>
              <p className="text-sm text-muted-foreground">Currently logged in on 3 devices.</p>
            </div>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="min-w-0 border-danger/30">
        <CardHeader>
          <CardTitle className="text-danger-fg flex items-center gap-2">
            <AlertTriangle className="size-4" />
            Danger Zone
          </CardTitle>
          <CardDescription>Irreversible account actions.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" onClick={() => toast({ title: "Account deactivated", description: "The user will no longer be able to log in." })}>
            Deactivate account
          </Button>
          <Button variant="destructive" onClick={() => toast({ title: "Delete requested", description: "Account deletion has been queued.", variant: "destructive" })}>
            Delete account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Main Tabs Component ──────────────────────────────────────────
export function ProfileTabs({ profile }: { profile: UserProfile }) {
  return (
    <Tabs defaultValue="overview" className="min-w-0">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <OverviewTab profile={profile} />
      </TabsContent>
      <TabsContent value="activity">
        <ActivityTab activity={profile.activity} />
      </TabsContent>
      <TabsContent value="projects">
        <ProjectsTab projects={profile.projects} />
      </TabsContent>
      <TabsContent value="transactions">
        <TransactionsTab transactions={profile.transactions} />
      </TabsContent>
      <TabsContent value="settings">
        <SettingsTab profile={profile} />
      </TabsContent>
    </Tabs>
  );
}