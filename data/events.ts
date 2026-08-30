import type { CalendarEvent } from "@/types/event";

export const eventsData: CalendarEvent[] = [
  { id: "evt_001", title: "Sprint 14 planning", date: "2025-03-03", startTime: "10:00", endTime: "11:00", category: "meeting", location: "Zoom", description: "Kickoff and capacity check for the new sprint." },
  { id: "evt_002", title: "Design review: pricing page", date: "2025-03-05", startTime: "14:00", endTime: "15:00", category: "meeting", location: "Room 4B" },
  { id: "evt_003", title: "Q1 report due", date: "2025-03-07", startTime: "17:00", endTime: "17:30", category: "deadline" },
  { id: "evt_004", title: "Gym session", date: "2025-03-08", startTime: "08:00", endTime: "09:00", category: "personal" },
  { id: "evt_005", title: "1:1 with Olivia", date: "2025-03-10", startTime: "11:30", endTime: "12:00", category: "meeting", location: "Office 210" },
  { id: "evt_006", title: "Renew SSL certificates", date: "2025-03-12", startTime: "09:00", endTime: "09:30", category: "reminder" },
  { id: "evt_007", title: "Mobile v2.0 feature freeze", date: "2025-03-14", startTime: "18:00", endTime: "18:30", category: "deadline" },
  { id: "evt_008", title: "Team standup", date: "2025-03-15", startTime: "09:30", endTime: "09:45", category: "meeting", location: "Zoom" },
  { id: "evt_009", title: "Accessibility audit review", date: "2025-03-15", startTime: "13:00", endTime: "14:00", category: "meeting", location: "Room 4B" },
  { id: "evt_010", title: "Dentist appointment", date: "2025-03-15", startTime: "17:30", endTime: "18:15", category: "personal" },
  { id: "evt_011", title: "Payroll submission", date: "2025-03-17", startTime: "10:00", endTime: "10:30", category: "reminder" },
  { id: "evt_012", title: "Customer interview — Acme Corp", date: "2025-03-19", startTime: "15:00", endTime: "16:00", category: "meeting", location: "Zoom" },
  { id: "evt_013", title: "Marketing copy deadline", date: "2025-03-21", startTime: "12:00", endTime: "12:30", category: "deadline" },
  { id: "evt_014", title: "Quarterly all-hands", date: "2025-03-24", startTime: "16:00", endTime: "17:00", category: "meeting", location: "Main Hall" },
  { id: "evt_015", title: "API v4 spec due", date: "2025-03-26", startTime: "17:00", endTime: "17:30", category: "deadline" },
  { id: "evt_016", title: "Run half-marathon", date: "2025-03-28", startTime: "07:00", endTime: "09:30", category: "personal" },
];