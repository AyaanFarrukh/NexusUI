export type EventCategory = "meeting" | "deadline" | "personal" | "reminder";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  /** YYYY-MM-DD */
  date: string;
  /** HH:mm (24h) */
  startTime: string;
  /** HH:mm (24h) */
  endTime: string;
  category: EventCategory;
  location?: string;
}