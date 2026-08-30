import type { Task } from "@/types/task";

export const taskAssignees = [
  { id: "usr_001", name: "Olivia Martin" },
  { id: "usr_002", name: "Jackson Lee" },
  { id: "usr_003", name: "Isabella Nguyen" },
  { id: "usr_004", name: "William Kim" },
  { id: "usr_005", name: "Sofia Davis" },
  { id: "usr_006", name: "Ethan Brown" },
  { id: "usr_007", name: "Mia Johnson" },
  { id: "usr_008", name: "Liam Garcia" },
  { id: "usr_011", name: "Emma Anderson" },
  { id: "usr_015", name: "Amelia Jackson" },
  { id: "usr_019", name: "Evelyn Lewis" },
  { id: "usr_020", name: "Alexander Walker" },
];

export const tasksData: Task[] = [
  // ── Backlog ──
  { id: "tsk_001", title: "Design empty states for reports", status: "backlog", priority: "low", assigneeId: "usr_003", assigneeName: "Isabella Nguyen", dueDate: "2025-04-18T00:00:00Z", tags: ["Design"], projectName: "Website Redesign" },
  { id: "tsk_002", title: "Spike: evaluate edge caching", status: "backlog", priority: "medium", assigneeId: "usr_002", assigneeName: "Jackson Lee", dueDate: "2025-04-22T00:00:00Z", tags: ["Research", "Performance"] },
  { id: "tsk_003", title: "Draft Q2 campaign brief", status: "backlog", priority: "medium", assigneeId: "usr_007", assigneeName: "Mia Johnson", dueDate: "2025-04-25T00:00:00Z", tags: ["Marketing"] },

  // ── To Do ──
  { id: "tsk_004", title: "Fix mobile nav overlap on iOS", status: "todo", priority: "high", assigneeId: "usr_002", assigneeName: "Jackson Lee", dueDate: "2025-03-19T00:00:00Z", tags: ["Bug", "Mobile"], projectName: "Mobile App v2.0", comments: 3 },
  { id: "tsk_005", title: "Write API rate-limit docs", status: "todo", priority: "medium", assigneeId: "usr_006", assigneeName: "Ethan Brown", dueDate: "2025-03-24T00:00:00Z", tags: ["Docs"], projectName: "API Integration Suite" },
  { id: "tsk_006", title: "User interview synthesis", status: "todo", priority: "medium", assigneeId: "usr_005", assigneeName: "Sofia Davis", dueDate: "2025-03-21T00:00:00Z", tags: ["Research"], attachments: 2 },
  { id: "tsk_007", title: "Refresh pricing page copy", status: "todo", priority: "low", assigneeId: "usr_004", assigneeName: "William Kim", dueDate: "2025-03-27T00:00:00Z", tags: ["Copy"] },

  // ── In Progress ──
  { id: "tsk_008", title: "Implement offline sync queue", status: "in-progress", priority: "urgent", assigneeId: "usr_015", assigneeName: "Amelia Jackson", dueDate: "2025-03-22T00:00:00Z", tags: ["Mobile", "Backend"], projectName: "Mobile App v2.0", comments: 5, attachments: 1 },
  { id: "tsk_009", title: "Build settings screen components", status: "in-progress", priority: "high", assigneeId: "usr_011", assigneeName: "Emma Anderson", dueDate: "2025-03-18T00:00:00Z", tags: ["Design System"] },
  { id: "tsk_010", title: "Webhook retry with exponential backoff", status: "in-progress", priority: "high", assigneeId: "usr_006", assigneeName: "Ethan Brown", dueDate: "2025-03-26T00:00:00Z", tags: ["Backend"], projectName: "API Integration Suite", comments: 2 },
  { id: "tsk_011", title: "Migrate blog CMS content types", status: "in-progress", priority: "medium", assigneeId: "usr_004", assigneeName: "William Kim", dueDate: "2025-03-25T00:00:00Z", tags: ["CMS"], projectName: "Website Redesign" },

  // ── Review ─
  { id: "tsk_012", title: "Accessibility audit fixes (WCAG AA)", status: "review", priority: "high", assigneeId: "usr_001", assigneeName: "Olivia Martin", dueDate: "2025-03-20T00:00:00Z", tags: ["A11y"], projectName: "Website Redesign", comments: 4 },
  { id: "tsk_013", title: "Crash-free session dashboard", status: "review", priority: "medium", assigneeId: "usr_020", assigneeName: "Alexander Walker", dueDate: "2025-03-17T00:00:00Z", tags: ["QA"], attachments: 3 },

  // ── Completed ──
  { id: "tsk_014", title: "OAuth flow for Salesforce", status: "completed", priority: "high", assigneeId: "usr_008", assigneeName: "Liam Garcia", dueDate: "2025-02-10T00:00:00Z", tags: ["Backend"], projectName: "API Integration Suite" },
  { id: "tsk_015", title: "Onboarding checklist A/B test", status: "completed", priority: "medium", assigneeId: "usr_001", assigneeName: "Olivia Martin", dueDate: "2025-02-15T00:00:00Z", tags: ["Growth"] },
  { id: "tsk_016", title: "Logo exploration rounds", status: "completed", priority: "medium", assigneeId: "usr_019", assigneeName: "Evelyn Lewis", dueDate: "2025-02-20T00:00:00Z", tags: ["Brand"] },
];