import { NotificationsView } from "@/components/notifications/notifications-view";

export default function NotificationsPage() {
  return (
    <div className="space-y-6 min-w-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Notifications</h1>
        <p className="text-muted-foreground">Mentions, comments, billing and security activity.</p>
      </div>
      <NotificationsView />
    </div>
  );
}