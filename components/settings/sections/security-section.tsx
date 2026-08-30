"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/lib/hooks/use-toast";

const sessions = [
  { id: "s1", device: "Chrome on macOS", location: "San Francisco, CA", current: true },
  { id: "s2", device: "Safari on iPhone", location: "San Francisco, CA", current: false },
  { id: "s3", device: "Edge on Windows", location: "New York, NY", current: false },
];

export function SecuritySection() {
  const { toast } = useToast();

  return (
    <div className="space-y-4 min-w-0">
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Change password</CardTitle>
          <CardDescription>Use a long, unique password for this account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              toast({ title: "Password updated", description: "Your password was changed.", variant: "success" });
            }}
          >
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Current password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">New password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Confirm new password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit">Update password</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Two-factor authentication</CardTitle>
          <CardDescription>Add an extra layer of security.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">Require a code from your authenticator app.</p>
          <Switch onCheckedChange={(on) => toast({ title: on ? "2FA enabled" : "2FA disabled" })} />
        </CardContent>
      </Card>

      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Active sessions</CardTitle>
          <CardDescription>Devices currently signed in to your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-foreground">{session.device}</p>
                <p className="text-xs text-muted-foreground">{session.location}</p>
              </div>
              {session.current ? (
                <Badge variant="success">This device</Badge>
              ) : (
                <Button variant="outline" size="sm" onClick={() => toast({ title: "Session revoked" })}>
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}