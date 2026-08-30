import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  formatTime12,
  getWeekDays,
  isSameDay,
  toKey,
  CALENDAR_TODAY,
} from "@/lib/calendar";
import { eventCategoryMeta } from "@/lib/event-meta";
import type { CalendarEvent } from "@/types/event";

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onCreateOnDate: (dateKey: string) => void;
}

export function WeekView({ currentDate, events, onSelectEvent, onCreateOnDate }: WeekViewProps) {
  const days = getWeekDays(currentDate);

  return (
    <div className="grid min-w-0 grid-cols-1 items-start gap-4 md:grid-cols-7 md:gap-2">
      {days.map((date) => {
        const key = toKey(date);
        const isToday = isSameDay(date, CALENDAR_TODAY);
        const dayEvents = events
          .filter((e) => e.date === key)
          .sort((a, b) => a.startTime.localeCompare(b.startTime));

        return (
          <div
            key={key}
            className={cn(
              "flex max-h-[70dvh] flex-col rounded-xl border border-border bg-muted/40",
              isToday && "border-accent/40 bg-accent-subtle/30"
            )}
          >
            {/* Day header */}
            <div className="flex items-center justify-between px-3 pb-2 pt-3">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </p>
                <p
                  className={cn(
                    "text-sm font-semibold",
                    isToday ? "text-accent" : "text-foreground"
                  )}
                >
                  {date.getDate()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                aria-label={`Add event on ${date.toDateString()}`}
                onClick={() => onCreateOnDate(key)}
              >
                <Plus className="size-4" />
              </Button>
            </div>

            {/* Events */}
            <div className="flex min-h-[96px] flex-1 flex-col gap-2 overflow-y-auto p-2 pt-0 scrollbar-thin">
              {dayEvents.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => onSelectEvent(event)}
                  className="focus-ring w-full rounded-lg border border-border bg-surface p-2.5 text-left shadow-card transition-colors hover:border-accent/40"
                >
                  <p className="text-[11px] font-medium text-muted-foreground">
                    {formatTime12(event.startTime)}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-xs font-medium text-foreground">
                    {event.title}
                  </p>
                  <span
                    className={cn(
                      "mt-1.5 block size-1.5 rounded-full",
                      eventCategoryMeta[event.category].dotClass
                    )}
                  />
                </button>
              ))}
              {dayEvents.length === 0 && (
                <div className="grid h-16 place-items-center rounded-lg border border-dashed border-border text-[11px] text-muted-foreground">
                  No events
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}