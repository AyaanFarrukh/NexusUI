import { cn } from "@/lib/utils";
import {
  WEEKDAY_LABELS,
  getMonthGrid,
  isSameDay,
  toKey,
  CALENDAR_TODAY,
} from "@/lib/calendar";
import { eventCategoryMeta } from "@/lib/event-meta";
import type { CalendarEvent } from "@/types/event";

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onCreateOnDate: (dateKey: string) => void;
  onShowDay: (date: Date) => void;
}

export function MonthView({ currentDate, events, onSelectEvent, onCreateOnDate, onShowDay }: MonthViewProps) {
  const grid = getMonthGrid(currentDate);

  const eventsOn = (date: Date) => {
    const key = toKey(date);
    return events
      .filter((e) => e.date === key)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-border shadow-card">
      {/* Weekday header */}
      <div className="grid grid-cols-7 gap-px bg-border">
        {WEEKDAY_LABELS.map((day) => (
          <div
            key={day}
            className="bg-muted/80 px-2 py-2 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground"
          >
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.charAt(0)}</span>
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-px bg-border">
        {grid.map((date) => {
          const inMonth = date.getMonth() === currentDate.getMonth();
          const isToday = isSameDay(date, CALENDAR_TODAY);
          const dayEvents = eventsOn(date);
          const visible = dayEvents.slice(0, 3);
          const remaining = dayEvents.length - visible.length;

          return (
            <div
              key={toKey(date)}
              onClick={() => onCreateOnDate(toKey(date))}
              className={cn(
                "min-h-[76px] cursor-pointer bg-surface p-1.5 transition-colors hover:bg-muted/40 sm:min-h-[108px] sm:p-2",
                !inMonth && "bg-muted/30"
              )}
            >
              <div className="mb-1 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onShowDay(date);
                  }}
                  className={cn(
                    "focus-ring grid size-6 place-items-center rounded-full text-xs font-medium transition-colors",
                    isToday
                      ? "bg-accent text-accent-fg"
                      : inMonth
                        ? "text-foreground hover:bg-muted"
                        : "text-muted-foreground/60 hover:bg-muted"
                  )}
                >
                  {date.getDate()}
                </button>
              </div>

              {/* Event chips (sm and up) */}
              <div className="hidden space-y-1 sm:block">
                {visible.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEvent(event);
                    }}
                    className="focus-ring flex w-full items-center gap-1.5 rounded-md bg-muted/80 px-1.5 py-1 text-left transition-colors hover:bg-muted"
                  >
                    <span className={cn("size-1.5 shrink-0 rounded-full", eventCategoryMeta[event.category].dotClass)} />
                    <span className="truncate text-[11px] font-medium text-foreground">
                      {event.title}
                    </span>
                  </button>
                ))}
                {remaining > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onShowDay(date);
                    }}
                    className="focus-ring rounded px-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground"
                  >
                    +{remaining} more
                  </button>
                )}
              </div>

              {/* Dots only on mobile */}
              <div className="flex flex-wrap gap-1 sm:hidden">
                {dayEvents.slice(0, 4).map((event) => (
                  <span
                    key={event.id}
                    className={cn("size-1.5 rounded-full", eventCategoryMeta[event.category].dotClass)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}