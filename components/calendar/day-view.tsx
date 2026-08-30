import { CalendarDays, Clock, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { formatTime12, toKey } from "@/lib/calendar";
import { eventCategoryMeta } from "@/lib/event-meta";
import type { CalendarEvent } from "@/types/event";

interface DayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onCreateOnDate: (dateKey: string) => void;
}

export function DayView({ currentDate, events, onSelectEvent, onCreateOnDate }: DayViewProps) {
  const key = toKey(currentDate);
  const dayEvents = events
    .filter((e) => e.date === key)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  if (dayEvents.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface shadow-card">
        <EmptyState
          icon={<CalendarDays className="size-8" />}
          title="No events scheduled"
          description="You have nothing planned for this day. Enjoy the focus time or schedule something new."
          action={<Button onClick={() => onCreateOnDate(key)}>Add event</Button>}
          className="py-16"
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {dayEvents.map((event) => (
        <Card key={event.id} className="min-w-0">
          <CardContent className="p-5">
            <button
              type="button"
              onClick={() => onSelectEvent(event)}
              className="focus-ring w-full rounded-lg text-left"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-foreground">{event.title}</h3>
                    <Badge variant={eventCategoryMeta[event.category].badgeVariant}>
                      {eventCategoryMeta[event.category].label}
                    </Badge>
                  </div>
                  {event.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {formatTime12(event.startTime)} – {formatTime12(event.endTime)}
                    </span>
                    {event.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3.5" />
                        {event.location}
                      </span>
                    )}
                  </div>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">Click to edit</span>
              </div>
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}