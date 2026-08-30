"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input, Textarea } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { EVENT_CATEGORIES, eventCategoryMeta } from "@/lib/event-meta";
import type { CalendarEvent, EventCategory } from "@/types/event";

export interface EventFormPayload {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  category: EventCategory;
  location?: string;
  description?: string;
}

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When set, the dialog edits this event; otherwise it creates a new one. */
  event: CalendarEvent | null;
  /** Date preset (YYYY-MM-DD) used in create mode. */
  defaultDate: string;
  onSave: (payload: EventFormPayload) => void;
  onDelete: (event: CalendarEvent) => void;
}

const categoryOptions = EVENT_CATEGORIES.map((c) => ({
  value: c,
  label: eventCategoryMeta[c].label,
}));

export function EventDialog({ open, onOpenChange, event, defaultDate, onSave, onDelete }: EventDialogProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [category, setCategory] = useState<EventCategory>("meeting");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!open) return;
    if (event) {
      setTitle(event.title);
      setDate(event.date);
      setStartTime(event.startTime);
      setEndTime(event.endTime);
      setCategory(event.category);
      setLocation(event.location ?? "");
      setDescription(event.description ?? "");
    } else {
      setTitle("");
      setDate(defaultDate);
      setStartTime("09:00");
      setEndTime("10:00");
      setCategory("meeting");
      setLocation("");
      setDescription("");
    }
  }, [open, event, defaultDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;
    onSave({
      title: title.trim(),
      date,
      startTime,
      endTime: endTime > startTime ? endTime : startTime,
      category,
      location: location.trim() || undefined,
      description: description.trim() || undefined,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event ? "Edit event" : "Create event"}</DialogTitle>
          <DialogDescription>
            {event ? "Update the details of this event." : "Schedule a new event on your calendar."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="event-title" className="text-sm font-medium text-foreground">Title</label>
            <Input
              id="event-title"
              placeholder="e.g. Design sync with the team"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="event-date" className="text-sm font-medium text-foreground">Date</label>
              <Input id="event-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="event-category" className="text-sm font-medium text-foreground">Category</label>
              <Select
                id="event-category"
                options={categoryOptions}
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory)}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="event-start" className="text-sm font-medium text-foreground">Starts</label>
              <Input id="event-start" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="event-end" className="text-sm font-medium text-foreground">Ends</label>
              <Input id="event-end" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="event-location" className="text-sm font-medium text-foreground">Location</label>
            <Input
              id="event-location"
              placeholder="e.g. Zoom, Room 4B..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="event-description" className="text-sm font-medium text-foreground">Description</label>
            <Textarea
              id="event-description"
              rows={3}
              placeholder="Optional notes for this event..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <DialogFooter>
            {event && (
              <Button
                type="button"
                variant="destructive"
                className="sm:mr-auto"
                onClick={() => {
                  onOpenChange(false);
                  onDelete(event);
                }}
              >
                Delete
              </Button>
            )}
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim() || !date}>
              {event ? "Save changes" : "Create event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}