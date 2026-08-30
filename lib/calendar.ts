/**
 * Demo anchor date so mock events are always visible.
 * Buyers: replace with `new Date()` when connecting a real backend.
 */
export const CALENDAR_TODAY = new Date(2025, 2, 15);

export const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function toKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Monday-based start of week. */
export function startOfWeek(date: Date): Date {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = (result.getDay() + 6) % 7;
  result.setDate(result.getDate() - day);
  return result;
}

export function addDays(date: Date, amount: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** 42 cells (6 weeks) covering the given month, Monday-first. */
export function getMonthGrid(date: Date): Date[] {
  const start = startOfWeek(new Date(date.getFullYear(), date.getMonth(), 1));
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}

export function getWeekDays(date: Date): Date[] {
  const start = startOfWeek(date);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function formatWeekRange(date: Date): string {
  const days = getWeekDays(date);
  const startLabel = days[0].toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const endLabel = days[6].toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${startLabel} – ${endLabel}, ${days[6].getFullYear()}`;
}

export function formatDayFull(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime12(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

/** Relative time against the demo anchor date (e.g. "2h ago"). */
export function timeAgo(dateString: string): string {
  const now = CALENDAR_TODAY.getTime();
  const then = new Date(dateString).getTime();
  const mins = Math.max(1, Math.floor((now - then) / 60000));
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}