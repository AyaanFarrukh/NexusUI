"use client";

import { useMemo, useState } from "react";
import { BellOff, Check, CheckCheck, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Select } from "@/components/ui/select";
import { useNotifications } from "./notifications-provider";
import { notificationCategoryMeta } from "@/data/notifications";
import { timeAgo } from "@/lib/calendar";
import { cn } from "@/lib/utils";
import type { NotificationCategory } from "@/types/notification";

const categoryOptions = [
  { value: "all", label: "All categories" },
  { value: "mention", label: "Mentions" },
  { value: "comment", label: "Comments" },
  { value: "system", label: "System" },
  { value: "billing", label: "Billing" },
  { value: "security", label: "Security" },
];

export function NotificationsView() {
  const { notifications, unreadCount, markRead, markAllRead, remove } = useNotifications();

  const [categoryFilter, setCategoryFilter] = useState<"all" | NotificationCategory>("all");
  const [tab, setTab] = useState<"all" | "unread">("all");

  const filtered = useMemo(() => {
    return notifications
      .filter((n) => categoryFilter === "all" || n.category === categoryFilter)
      .filter((n) => tab === "all" || !n.read)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [notifications, categoryFilter, tab]);

  return (
    <div className="space-y-4 min-w-0">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center rounded-lg border border-border bg-muted p-0.5">
          {(["all", "unread"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={cn(
                "focus-ring rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors",
                tab === value ? "bg-surface text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {value}
              {value === "unread" && unreadCount > 0 && (
                <span className="ml-1.5 rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            options={categoryOptions}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as "all" | NotificationCategory)}
            className="w-[160px]"
          />
          <Button variant="outline" size="sm" onClick={markAllRead} disabled={unreadCount === 0}>
            <CheckCheck className="mr-2 size-4" />
            Mark all as read
          </Button>
        </div>
      </div>

      {/* List */}
      <Card className="min-w-0 overflow-hidden">
        <CardContent className="p-0">
          {notifications.length === 0 ? (
            <EmptyState
              icon={<BellOff className="size-8" />}
              title="No notifications"
              description="You're all caught up. New activity will show up here."
              className="py-16"
            />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<BellOff className="size-8" />}
              title="Nothing here"
              description="No notifications match the current filters."
              action={
                <Button variant="outline" onClick={() => { setCategoryFilter("all"); setTab("all"); }}>
                  Clear filters
                </Button>
              }
              className="py-16"
            />
          ) : (
            <ul className="divide-y divide-border">
              {filtered.map((notification) => {
                const meta = notificationCategoryMeta[notification.category];
                const Icon = meta.icon;

                return (
                  <li
                    key={notification.id}
                    className={cn(
                      "flex gap-4 px-5 py-4 transition-colors",
                      notification.read ? "bg-surface" : "bg-accent-subtle/25"
                    )}
                  >
                    <span className={cn("grid size-10 shrink-0 place-items-center rounded-full", meta.iconClass)}>
                      <Icon className="size-4" />
                    </span>

                    <button
                      type="button"
                      onClick={() => markRead(notification.id)}
                      className="focus-ring min-w-0 flex-1 rounded-md text-left"
                      title={notification.read ? undefined : "Mark as read"}
                    >
                      <div className="flex items-center gap-2">
                        <p className={cn("truncate text-sm", notification.read ? "font-medium text-foreground" : "font-semibold text-foreground")}>
                          {notification.title}
                        </p>
                        {!notification.read && <span className="size-2 shrink-0 rounded-full bg-accent" />}
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{notification.description}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {meta.label} · {timeAgo(notification.createdAt)}
                      </p>
                    </button>

                    <div className="flex shrink-0 items-start gap-1">
                      {!notification.read && (
                        <Button variant="ghost" size="icon" className="size-8" aria-label="Mark as read" onClick={() => markRead(notification.id)}>
                          <Check className="size-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="size-8" aria-label="Delete notification" onClick={() => remove(notification.id)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}