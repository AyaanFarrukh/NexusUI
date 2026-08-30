import type { Project } from "@/types/project";

export const projectsData: Project[] = [
  {
    id: "prj_001",
    name: "Website Redesign",
    description:
      "Complete overhaul of the marketing website with new brand guidelines, improved performance and a fully accessible component library.",
    status: "active",
    priority: "high",
    progress: 72,
    startDate: "2025-01-06T00:00:00Z",
    deadline: "2025-04-30T00:00:00Z",
    budget: "$48,000",
    owner: "Olivia Martin",
    tags: ["Design", "Frontend", "SEO"],
    team: [
      { id: "usr_001", name: "Olivia Martin", role: "Project Lead" },
      { id: "usr_002", name: "Jackson Lee", role: "Frontend Engineer" },
      { id: "usr_003", name: "Isabella Nguyen", role: "Product Designer" },
      { id: "usr_004", name: "William Kim", role: "Content Strategist" },
    ],
    tasks: [
      { id: "tsk_101", title: "Design new landing page hero", status: "done", priority: "medium", assigneeId: "usr_003", assigneeName: "Isabella Nguyen", dueDate: "2025-03-05T00:00:00Z" },
      { id: "tsk_102", title: "Implement responsive navigation", status: "in-progress", priority: "high", assigneeId: "usr_002", assigneeName: "Jackson Lee", dueDate: "2025-03-18T00:00:00Z" },
      { id: "tsk_103", title: "Accessibility audit (WCAG AA)", status: "review", priority: "high", assigneeId: "usr_001", assigneeName: "Olivia Martin", dueDate: "2025-03-20T00:00:00Z" },
      { id: "tsk_104", title: "Migrate blog to new CMS", status: "in-progress", priority: "medium", assigneeId: "usr_004", assigneeName: "William Kim", dueDate: "2025-03-25T00:00:00Z" },
      { id: "tsk_105", title: "SEO & performance pass", status: "todo", priority: "medium", assigneeId: "usr_002", assigneeName: "Jackson Lee", dueDate: "2025-04-08T00:00:00Z" },
    ],
    files: [
      { id: "fil_101", name: "homepage-v3.fig", type: "fig", size: "8.4 MB", uploadedBy: "Isabella Nguyen", uploadedAt: "2025-03-10T00:00:00Z" },
      { id: "fil_102", name: "brand-guidelines.pdf", type: "pdf", size: "2.1 MB", uploadedBy: "Olivia Martin", uploadedAt: "2025-02-20T00:00:00Z" },
      { id: "fil_103", name: "content-audit.doc", type: "doc", size: "340 KB", uploadedBy: "William Kim", uploadedAt: "2025-02-12T00:00:00Z" },
      { id: "fil_104", name: "hero-assets.zip", type: "zip", size: "24.8 MB", uploadedBy: "Isabella Nguyen", uploadedAt: "2025-03-02T00:00:00Z" },
    ],
    activity: [
      { id: "pac_101", actor: "Jackson Lee", action: "moved task to In Progress", target: "Implement responsive navigation", timestamp: "2025-03-14T15:40:00Z" },
      { id: "pac_102", actor: "Isabella Nguyen", action: "uploaded", target: "homepage-v3.fig", timestamp: "2025-03-10T11:05:00Z" },
      { id: "pac_103", actor: "Olivia Martin", action: "commented on", target: "Accessibility audit (WCAG AA)", timestamp: "2025-03-09T09:30:00Z" },
      { id: "pac_104", actor: "Isabella Nguyen", action: "completed task", target: "Design new landing page hero", timestamp: "2025-03-05T16:20:00Z" },
    ],
  },
  {
    id: "prj_002",
    name: "Mobile App v2.0",
    description:
      "Major update to the iOS and Android applications: new onboarding, offline mode, and a redesigned settings area.",
    status: "active",
    priority: "urgent",
    progress: 45,
    startDate: "2025-02-01T00:00:00Z",
    deadline: "2025-05-20T00:00:00Z",
    budget: "$86,000",
    owner: "Benjamin Moore",
    tags: ["Mobile", "iOS", "Android"],
    team: [
      { id: "usr_014", name: "Benjamin Moore", role: "Project Lead" },
      { id: "usr_015", name: "Amelia Jackson", role: "Mobile Engineer" },
      { id: "usr_011", name: "Emma Anderson", role: "Product Designer" },
      { id: "usr_020", name: "Alexander Walker", role: "QA Engineer" },
      { id: "usr_007", name: "Mia Johnson", role: "Product Manager" },
    ],
    tasks: [
      { id: "tsk_201", title: "Offline mode data sync", status: "in-progress", priority: "urgent", assigneeId: "usr_15", assigneeName: "Amelia Jackson", dueDate: "2025-03-22T00:00:00Z" },
      { id: "tsk_202", title: "Redesign settings screens", status: "review", priority: "high", assigneeId: "usr_011", assigneeName: "Emma Anderson", dueDate: "2025-03-17T00:00:00Z" },
      { id: "tsk_203", title: "Push notification service", status: "in-progress", priority: "high", assigneeId: "usr_014", assigneeName: "Benjamin Moore", dueDate: "2025-03-28T00:00:00Z" },
      { id: "tsk_204", title: "Regression test suite", status: "todo", priority: "medium", assigneeId: "usr_020", assigneeName: "Alexander Walker", dueDate: "2025-04-10T00:00:00Z" },
    ],
    files: [
      { id: "fil_201", name: "app-mockups-v2.fig", type: "fig", size: "12.6 MB", uploadedBy: "Emma Anderson", uploadedAt: "2025-03-08T00:00:00Z" },
      { id: "fil_202", name: "release-plan.sheet", type: "sheet", size: "88 KB", uploadedBy: "Mia Johnson", uploadedAt: "2025-03-01T00:00:00Z" },
      { id: "fil_203", name: "crash-report-feb.pdf", type: "pdf", size: "1.2 MB", uploadedBy: "Alexander Walker", uploadedAt: "2025-02-25T00:00:00Z" },
    ],
    activity: [
      { id: "pac_201", actor: "Alexander Walker", action: "opened bug", target: "Session expires on background", timestamp: "2025-03-13T10:12:00Z" },
      { id: "pac_202", actor: "Emma Anderson", action: "uploaded", target: "app-mockups-v2.fig", timestamp: "2025-03-08T14:45:00Z" },
      { id: "pac_203", actor: "Benjamin Moore", action: "started task", target: "Push notification service", timestamp: "2025-03-06T09:00:00Z" },
    ],
  },
  {
    id: "prj_003",
    name: "API Integration Suite",
    description:
      "Building third-party integration connectors for enterprise clients: Salesforce, HubSpot, Slack and custom webhooks.",
    status: "on-hold",
    priority: "medium",
    progress: 30,
    startDate: "2024-11-12T00:00:00Z",
    deadline: "2025-06-15T00:00:00Z",
    budget: "$54,000",
    owner: "Ethan Brown",
    tags: ["Backend", "API", "Enterprise"],
    team: [
      { id: "usr_006", name: "Ethan Brown", role: "Tech Lead" },
      { id: "usr_008", name: "Liam Garcia", role: "Backend Engineer" },
      { id: "usr_013", name: "Charlotte Thomas", role: "Solutions Architect" },
    ],
    tasks: [
      { id: "tsk_301", title: "OAuth flow for Salesforce", status: "done", priority: "high", assigneeId: "usr_008", assigneeName: "Liam Garcia", dueDate: "2025-02-10T00:00:00Z" },
      { id: "tsk_302", title: "Webhook retry mechanism", status: "in-progress", priority: "medium", assigneeId: "usr_006", assigneeName: "Ethan Brown", dueDate: "2025-04-02T00:00:00Z" },
      { id: "tsk_303", title: "HubSpot contact sync", status: "todo", priority: "medium", assigneeId: "usr_013", assigneeName: "Charlotte Thomas", dueDate: "2025-04-20T00:00:00Z" },
    ],
    files: [
      { id: "fil_301", name: "api-spec-v4.doc", type: "doc", size: "512 KB", uploadedBy: "Ethan Brown", uploadedAt: "2025-02-18T00:00:00Z" },
      { id: "fil_302", name: "integration-diagram.img", type: "img", size: "940 KB", uploadedBy: "Charlotte Thomas", uploadedAt: "2025-02-05T00:00:00Z" },
    ],
    activity: [
      { id: "pac_301", actor: "Ethan Brown", action: "paused project", target: "Awaiting enterprise contract renewal", timestamp: "2025-03-01T08:30:00Z" },
      { id: "pac_302", actor: "Liam Garcia", action: "completed task", target: "OAuth flow for Salesforce", timestamp: "2025-02-10T17:00:00Z" },
    ],
  },
  {
    id: "prj_004",
    name: "Onboarding Flow",
    description:
      "Redesigned user onboarding to reduce drop-off rates. Shipped with a 23% improvement in activation.",
    status: "completed",
    priority: "medium",
    progress: 100,
    startDate: "2024-10-01T00:00:00Z",
    deadline: "2025-02-28T00:00:00Z",
    budget: "$32,000",
    owner: "Olivia Martin",
    tags: ["UX", "Growth"],
    team: [
      { id: "usr_001", name: "Olivia Martin", role: "Project Lead" },
      { id: "usr_005", name: "Sofia Davis", role: "UX Researcher" },
      { id: "usr_002", name: "Jackson Lee", role: "Frontend Engineer" },
    ],
    tasks: [
      { id: "tsk_401", title: "User interviews (12 sessions)", status: "done", priority: "medium", assigneeId: "usr_005", assigneeName: "Sofia Davis", dueDate: "2024-11-15T00:00:00Z" },
      { id: "tsk_402", title: "Progressive profile setup", status: "done", priority: "high", assigneeId: "usr_002", assigneeName: "Jackson Lee", dueDate: "2025-01-20T00:00:00Z" },
      { id: "tsk_403", title: "A/B test checklist onboarding", status: "done", priority: "medium", assigneeId: "usr_001", assigneeName: "Olivia Martin", dueDate: "2025-02-15T00:00:00Z" },
    ],
    files: [
      { id: "fil_401", name: "research-findings.pdf", type: "pdf", size: "3.4 MB", uploadedBy: "Sofia Davis", uploadedAt: "2024-11-20T00:00:00Z" },
      { id: "fil_402", name: "final-results.sheet", type: "sheet", size: "120 KB", uploadedBy: "Olivia Martin", uploadedAt: "2025-03-03T00:00:00Z" },
    ],
    activity: [
      { id: "pac_401", actor: "Olivia Martin", action: "closed project", target: "Onboarding Flow", timestamp: "2025-03-03T10:00:00Z" },
      { id: "pac_402", actor: "Olivia Martin", action: "uploaded", target: "final-results.sheet", timestamp: "2025-03-03T09:55:00Z" },
    ],
  },
  {
    id: "prj_005",
    name: "Data Warehouse Migration",
    description:
      "Migrating analytics pipelines from legacy Postgres to a modern warehouse with dbt models and reverse ETL.",
    status: "planning",
    priority: "high",
    progress: 8,
    startDate: "2025-04-01T00:00:00Z",
    deadline: "2025-08-01T00:00:00Z",
    budget: "$120,000",
    owner: "Ava Martinez",
    tags: ["Data", "Infrastructure"],
    team: [
      { id: "usr_009", name: "Ava Martinez", role: "Data Lead" },
      { id: "usr_012", name: "James Taylor", role: "Data Engineer" },
      { id: "usr_017", name: "Harper Harris", role: "Analytics Engineer" },
      { id: "usr_006", name: "Ethan Brown", role: "Platform Advisor" },
    ],
    tasks: [
      { id: "tsk_501", title: "Vendor evaluation matrix", status: "in-progress", priority: "high", assigneeId: "usr_009", assigneeName: "Ava Martinez", dueDate: "2025-03-28T00:00:00Z" },
      { id: "tsk_502", title: "Cost & capacity forecast", status: "review", priority: "medium", assigneeId: "usr_017", assigneeName: "Harper Harris", dueDate: "2025-03-21T00:00:00Z" },
      { id: "tsk_503", title: "Migration risk assessment", status: "todo", priority: "high", assigneeId: "usr_012", assigneeName: "James Taylor", dueDate: "2025-04-05T00:00:00Z" },
    ],
    files: [
      { id: "fil_501", name: "vendor-comparison.sheet", type: "sheet", size: "96 KB", uploadedBy: "Harper Harris", uploadedAt: "2025-03-11T00:00:00Z" },
    ],
    activity: [
      { id: "pac_501", actor: "Ava Martinez", action: "created project", target: "Data Warehouse Migration", timestamp: "2025-03-05T09:00:00Z" },
      { id: "pac_502", actor: "Harper Harris", action: "uploaded", target: "vendor-comparison.sheet", timestamp: "2025-03-11T13:25:00Z" },
    ],
  },
  {
    id: "prj_006",
    name: "Brand Identity Refresh",
    description:
      "Refreshing logo, color system and voice guidelines across product, marketing and sales collateral.",
    status: "active",
    priority: "low",
    progress: 58,
    startDate: "2025-01-20T00:00:00Z",
    deadline: "2025-04-12T00:00:00Z",
    budget: "$18,000",
    owner: "Isabella Nguyen",
    tags: ["Brand", "Design"],
    team: [
      { id: "usr_003", name: "Isabella Nguyen", role: "Creative Director" },
      { id: "usr_019", name: "Evelyn Lewis", role: "Brand Designer" },
      { id: "usr_016", name: "Lucas White", role: "Copywriter" },
    ],
    tasks: [
      { id: "tsk_601", title: "Logo exploration rounds", status: "done", priority: "medium", assigneeId: "usr_019", assigneeName: "Evelyn Lewis", dueDate: "2025-02-20T00:00:00Z" },
      { id: "tsk_602", title: "Voice & tone guidelines", status: "in-progress", priority: "low", assigneeId: "usr_016", assigneeName: "Lucas White", dueDate: "2025-03-26T00:00:00Z" },
      { id: "tsk_603", title: "Collateral template kit", status: "todo", priority: "low", assigneeId: "usr_003", assigneeName: "Isabella Nguyen", dueDate: "2025-04-05T00:00:00Z" },
    ],
    files: [
      { id: "fil_601", name: "logo-rounds-03.fig", type: "fig", size: "6.2 MB", uploadedBy: "Evelyn Lewis", uploadedAt: "2025-02-18T00:00:00Z" },
      { id: "fil_602", name: "voice-draft-v2.doc", type: "doc", size: "210 KB", uploadedBy: "Lucas White", uploadedAt: "2025-03-09T00:00:00Z" },
    ],
    activity: [
      { id: "pac_601", actor: "Lucas White", action: "uploaded", target: "voice-draft-v2.doc", timestamp: "2025-03-09T15:10:00Z" },
      { id: "pac_602", actor: "Isabella Nguyen", action: "approved", target: "Logo exploration rounds", timestamp: "2025-02-21T10:40:00Z" },
    ],
  },
];

/** Look up a project by ID. Returns null for unknown IDs (not-found state). */
export function getProject(id: string): Project | null {
  return projectsData.find((p) => p.id === id) ?? null;
}