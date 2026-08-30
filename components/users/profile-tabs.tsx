"use client";

import { Activity, Briefcase, CreditCard, FileText, Settings as SettingsIcon } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/lib/hooks/use-toast";
import { projectStatusMeta } from "@/lib/project-meta";
import { formatDate } from "@/lib/project-meta";
import type { UserProfile } from "@/data/user-profile";

function OverviewTab({ profile }: { profile: UserProfile }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3 min-w-0">
      {/* User Info Card */}
      <Card className="lg:col-span-1 min-w-0">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Full name</p>
            <p className="text-sm font-medium text-foreground">{profile.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Email address</p>
            <p className="text-sm text-foreground">{profile.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Phone number</p>
            <p className="text-sm text-foreground">{profile.phone}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Location</p>
            <p className="text-sm text-foreground">{profile.location}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Department</p>
            <p className="text-sm text-foreground">{profile.department}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Joined</p>
            <p className="text-sm text-foreground">{formatDate(profile.joinedAt)}</p>
          </div>
        </CardContent>
      </Card>

      {/* Internal Notes */}
      <Card className="lg:col-span-2 min-w-0">
        <CardHeader>
          <CardTitle>Internal Notes</CardTitle>
          <CardDescription>Private notes visible only to administrators.</CardDescription>
        </CardHeader>
        <CardContent>
          {profile.notes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No notes yet.</p>
          ) : (
            <div className="space-y-4">
              {profile.notes.map((note) => (
                <div key={note.id} className="rounded-lg border border-border bg-background/50 p-4">
                  <p className="text-sm text-foreground">{note.content}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium">{note.author}</span>
                    <span>·</span>
                    <span>{formatDate(note.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ActivityTab({ profile }: { profile: UserProfile }) {
  const iconMap = {
    create: "✨",
    update: "📝",
    delete: "🗑️",
    login: "🔑",
    comment: "💬",
  };

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions performed by this user.</CardDescription>
      </CardHeader>
      <CardContent>
        {profile.activity.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent activity.</p>
        ) : (
          <div className="relative">
            {profile.activity.map((item, index) => (
              <div key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
                {index < profile.activity.length - 1 && (
                  <div className="absolute left-[7px] top-5 bottom-0 w-px bg-border" />
                )}
                <span className="relative z-10 mt-1.5 grid size-[15px] shrink-0 place-items-center rounded-full border-2 border-border bg-accent text-[8px]">
                  {iconMap[item.type]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{item.action}</span>{" "}
                    <span className="text-muted-foreground">{item.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.timestamp).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ProjectsTab({ profile }: { profile: UserProfile }) {
  return (
    <div className="space-y-4 min-w-0">
      {profile.projects.length === 0 ? (
        <Card className="min-w-0">
          <CardContent className="py-12 text-center">
            <p className="text-sm text-muted-foreground">No projects assigned.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 min-w-0">
          {profile.projects.map((project) => (
            <Card key={project.id} className="min-w-0">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground">{project.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{project.role}</p>
                  </div>
                  <Badge variant={projectStatusMeta[project.status].variant}>
                    {projectStatusMeta[project.status].label}
                  </Badge>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{project.progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-accent transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function TransactionsTab({ profile }: { profile: UserProfile }) {
  return (
    <Card className="min-w-0 overflow-hidden">
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
        <CardDescription>Recent transactions and payments.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {profile.transactions.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-muted-foreground">No transactions yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Description</th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Date</th>
                  <th className="whitespace-nowrap px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Amount</th>
                  <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {profile.transactions.map((txn) => (
                  <tr key={txn.id} className="transition-colors hover:bg-muted/30">
                    <td className="whitespace-nowrap px-6 py-4 text-foreground">{txn.description}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{formatDate(txn.date)}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-foreground">{txn.amount}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge variant={txn.status === "completed" ? "success" : txn.status === "pending" ? "warning" : "danger"}>
                        {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SettingsTab({ profile }: { profile: UserProfile }) {
  const { toast } = useToast();

  return (
    <div className="space-y-6 min-w-0">
      {/* Account Settings */}
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Update the user&apos;s profile information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Full name</label>
              <Input defaultValue={profile.name} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input type="email" defaultValue={profile.email} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Role</label>
              <Select
                options={[
                  { value: "admin", label: "Administrator" },
                  { value: "editor", label: "Editor" },
                  { value: "viewer", label: "Viewer" },
                  { value: "billing", label: "Billing" },
                ]}
                defaultValue={profile.role}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Status</label>
              <Select
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                  { value: "pending", label: "Pending" },
                ]}
                defaultValue={profile.status}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Bio</label>
            <Textarea rows={3} defaultValue={profile.bio} />
          </div>
          <Button onClick={() => toast({ title: "Profile updated", description: "Changes saved successfully.", variant: "success" })}>
            Save changes
          </Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Manage password and two-factor authentication.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" onClick={() => toast({ title: "Password reset", description: "Reset link sent to the user's email." })}>
            Send password reset
          </Button>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="text-sm font-medium text-foreground">Two-factor authentication</p>
              <p className="text-sm text-muted-foreground">Require a code on login.</p>
            </div>
            <Switch onCheckedChange={(on) => toast({ title: on ? "2FA enabled" : "2FA disabled" })} />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="min-w-0 border-danger/30">
        <CardHeader>
          <CardTitle className="text-danger-fg">Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Deactivate account</p>
              <p className="text-sm text-muted-foreground">Temporarily disable access.</p>
            </div>
            <Button variant="outline" onClick={() => toast({ title: "Account deactivated", description: "The user can no longer sign in." })}>
              Deactivate
            </Button>
          </div>
          <div className="flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Delete account</p>
              <p className="text-sm text-muted-foreground">Permanently remove all data.</p>
            </div>
            <Button variant="destructive" onClick={() => toast({ title: "Account deletion", description: "This is a demo — wire to your backend.", variant: "destructive" })}>
              Delete permanently
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ProfileTabs({ profile }: { profile: UserProfile }) {
  return (
    <Tabs defaultValue="overview" className="min-w-0">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">
          <FileText className="mr-2 size-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="activity">
          <Activity className="mr-2 size-4" />
          Activity
        </TabsTrigger>
        <TabsTrigger value="projects">
          <Briefcase className="mr-2 size-4" />
          Projects
        </TabsTrigger>
        <TabsTrigger value="transactions">
          <CreditCard className="mr-2 size-4" />
          Transactions
        </TabsTrigger>
        <TabsTrigger value="settings">
          <SettingsIcon className="mr-2 size-4" />
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <OverviewTab profile={profile} />
      </TabsContent>
      <TabsContent value="activity">
        <ActivityTab profile={profile} />
      </TabsContent>
      <TabsContent value="projects">
        <ProjectsTab profile={profile} />
      </TabsContent>
      <TabsContent value="transactions">
        <TransactionsTab profile={profile} />
      </TabsContent>
      <TabsContent value="settings">
        <SettingsTab profile={profile} />
      </TabsContent>
    </Tabs>
  );
}