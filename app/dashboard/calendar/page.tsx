import { CalendarView } from "@/components/calendar/calendar-view";

export default function CalendarPage() {
  return (
    <div className="space-y-6 min-w-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Calendar</h1>
        <p className="text-muted-foreground">
          Schedule meetings, deadlines and personal events. Click any day to add an event.
        </p>
      </div>
      <CalendarView />
    </div>
  );
}