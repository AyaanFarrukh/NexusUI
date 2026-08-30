import { MessagesView } from "@/components/messages/messages-view";

export default function MessagesPage() {
  return (
    <div className="space-y-6 min-w-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Messages</h1>
        <p className="text-muted-foreground">Direct messages with your team.</p>
      </div>
      <MessagesView />
    </div>
  );
}