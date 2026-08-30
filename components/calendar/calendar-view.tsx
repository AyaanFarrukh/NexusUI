"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Select } from "@/components/ui/select";
import { EventDialog, type EventFormPayload } from "./event-dialog";
import { DeleteEventDialog } from "./delete-event-dialog";
import { MonthView } from "./month-view";
import { WeekView } from "./week-view";
import { DayView } from "./day-view";
import { useToast } from "@/lib/hooks/use-toast";
import { eventsData } from "@/data/events";
import { EVENT_CATEGORIES, eventCategoryMeta } from "@/lib/event-meta";
import {
  addDays,
  addMonths,
  CALENDAR_TODAY,
  formatDayFull,
  formatMonthYear,
  formatWeekRange,
  toKey,
} from "@/lib/calendar";
import { cn } from "@/lib/utils";
import type { CalendarEvent } from "@/types/event";

type CalendarViewMode = "month" | "week" | "day";

const viewOptions: { value: CalendarViewMode; label: string }[] = [
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "day", label: "Day" },
];

const categoryFilterOptions = [
  { value: "all", label: "All categories" },
  ...EVENT_CATEGORIES.map((c) => ({ value: c, label: eventCategoryMeta[c].label })),
];

export function CalendarView() {
  const { toast } = useToast();

  const [events, setEvents] = useState<CalendarEvent[]>(eventsData);
  const [view, setView] = useState<CalendarViewMode>("month");
  const [currentDate, setCurrentDate] = useState<Date>(CALENDAR_TODAY);
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Create dialog
  const [createOpen, setCreateOpen] = useState(false);
  const [createDefaultDate, setCreateDefaultDate] = useState(toKey(CALENDAR_TODAY));

  // Edit dialog
  const [editOpen, setEditOpen] = useState(false);
  const [editEvent, setEditEvent] = useState<CalendarEvent | null>(null);

  // Delete dialog
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<CalendarEvent | null>(null);

  const filteredEvents =
    categoryFilter === "all"
      ? events
      : events.filter((e) => e.category === categoryFilter);

  const navigate = (direction: 1 | -1) => {
    setCurrentDate((prev) => {
      if (view === "month") return addMonths(prev, direction);
      if (view === "week") return addDays(prev, 7 * direction);
      return addDays(prev, direction);
    });
  };

  const headerLabel =
    view === "month"
      ? formatMonthYear(currentDate)
      : view === "week"
        ? formatWeekRange(currentDate)
        : formatDayFull(currentDate);

  const openCreate = (dateKey: string) => {
    setCreateDefaultDate(dateKey);
    setCreateOpen(true);
  };

  const openEdit = (event: CalendarEvent) => {
    setEditEvent(event);
    setEditOpen(true);
  };

  const handleCreate = (payload: EventFormPayload) => {
    const event: CalendarEvent = { id: `evt_${Date.now()}`, ...payload };
    setEvents((prev) => [...prev, event]);
    toast({ title: "Event created", description: payload.title, variant: "success" });
  };

  const handleUpdate = (payload: EventFormPayload) => {
    if (!editEvent) return;
    setEvents((prev) =>
      prev.map((e) => (e.id === editEvent.id ? { ...e, ...payload } : e))
    );
    toast({ title: "Event updated", description: payload.title, variant: "success" });
  };

  const requestDelete = (event: CalendarEvent) => {
    setDeleteTarget(event);
    setDeleteOpen(true);
  };

  const confirmDelete = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    toast({ title: "Event deleted", description: "The event was removed from your calendar." });
  };

  return (
    <div className="space-y-4 min-w-0">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentDate(CALENDAR_TODAY)}>
            Today
          </Button>
          <div className="flex items-center gap-1">
            <IconButton variant="outline" size="icon" className="size-8" aria-label="Previous" onClick={() => navigate(-1)}>
              <ChevronLeft className="size-4" />
            </IconButton>
            <IconButton variant="outline" size="icon" className="size-8" aria-label="Next" onClick={() => navigate(1)}>
              <ChevronRight className="size-4" />
            </IconButton>
          </div>
          <h2 className="text-lg font-semibold text-foreground">{headerLabel}</h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            options={categoryFilterOptions}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-[150px]"
          />

          {/* View switcher */}
          <div className="flex items-center rounded-lg border border-border bg-muted p-0.5">
            {viewOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setView(option.value)}
                className={cn(
                  "focus-ring rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  view === option.value
                    ? "bg-surface text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          <Button onClick={() => openCreate(toKey(currentDate))}>
            <Plus className="mr-2 size-4" />
            New event
          </Button>
        </div>
      </div>

      {/* Active view */}
      {view === "month" && (
        <MonthView
          currentDate={currentDate}
          events={filteredEvents}
          onSelectEvent={openEdit}
          onCreateOnDate={openCreate}
          onShowDay={(date) => {
            setCurrentDate(date);
            setView("day");
          }}
        />
      )}
      {view === "week" && (
        <WeekView
          currentDate={currentDate}
          events={filteredEvents}
          onSelectEvent={openEdit}
          onCreateOnDate={openCreate}
        />
      )}
      {view === "day" && (
        <DayView
          currentDate={currentDate}
          events={filteredEvents}
          onSelectEvent={openEdit}
          onCreateOnDate={openCreate}
        />
      )}

      {/* Dialogs */}
      <EventDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        event={null}
        defaultDate={createDefaultDate}
        onSave={handleCreate}
        onDelete={requestDelete}
      />
      <EventDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        event={editEvent}
        defaultDate={toKey(currentDate)}
        onSave={handleUpdate}
        onDelete={requestDelete}
      />
      <DeleteEventDialog
        event={deleteTarget}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={confirmDelete}
      />
    </div>
  );
}