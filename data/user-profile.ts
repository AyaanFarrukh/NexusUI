import { usersData } from "@/data/users";
import type { UserRole, UserStatus } from "@/types/user";

export interface ProfileActivity {
  id: string;
  action: string;
  target: string;
  timestamp: string;
  type: "create" | "update" | "delete" | "login" | "comment";
}

export interface ProfileProject {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold";
  progress: number;
  role: string;
}

export interface ProfileTransaction {
  id: string;
  description: string;
  amount: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

export interface ProfileNote {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  joinedAt: string;
  lastActive: string;
  bio: string;
  location: string;
  department: string;
  stats: { label: string; value: string; change?: string; trend?: "up" | "down" }[];
  activity: ProfileActivity[];
  projects: ProfileProject[];
  transactions: ProfileTransaction[];
  notes: ProfileNote[];
}

/* ─── Content pools (rotated per user so every profile feels unique) ─── */

const BIOS = [
  "Senior product manager with 8+ years of experience leading cross-functional teams. Passionate about building user-centric products and mentoring junior team members.",
  "Full-stack engineer who loves shipping fast, accessible interfaces. Currently focused on design systems and developer tooling.",
  "Growth marketer obsessed with experiments, funnels, and clear reporting. Believes every decision should be backed by data.",
  "Operations specialist keeping projects, budgets, and people aligned. Known for calm communication and sharp follow-through.",
];

const LOCATIONS = [
  "San Francisco, CA",
  "Austin, TX",
  "New York, NY",
  "Seattle, WA",
  "Denver, CO",
  "Chicago, IL",
];

const DEPARTMENTS = [
  "Product & Design",
  "Engineering",
  "Marketing",
  "Operations",
  "Finance",
];

const ACTIVITY_POOL: ProfileActivity[] = [
  { id: "act_001", action: "Created project", target: "Q2 Marketing Campaign", timestamp: "2025-03-14T14:22:00Z", type: "create" },
  { id: "act_002", action: "Commented on", target: "Website Redesign Proposal", timestamp: "2025-03-14T10:15:00Z", type: "comment" },
  { id: "act_003", action: "Updated task", target: "Fix authentication flow", timestamp: "2025-03-13T16:45:00Z", type: "update" },
  { id: "act_004", action: "Logged in", target: "via Chrome on macOS", timestamp: "2025-03-13T09:00:00Z", type: "login" },
  { id: "act_005", action: "Deleted file", target: "old-wireframes-v1.fig", timestamp: "2025-03-12T11:30:00Z", type: "delete" },
  { id: "act_006", action: "Created document", target: "Sprint 14 Retrospective Notes", timestamp: "2025-03-11T15:20:00Z", type: "create" },
  { id: "act_007", action: "Updated profile", target: "Changed department assignment", timestamp: "2025-03-10T08:45:00Z", type: "update" },
];

const PROJECTS_POOL: ProfileProject[] = [
  { id: "prj_001", name: "Website Redesign", description: "Complete overhaul of the marketing website with new brand guidelines.", status: "active", progress: 72, role: "Project Lead" },
  { id: "prj_002", name: "Mobile App v2.0", description: "Major update to the iOS and Android applications.", status: "active", progress: 45, role: "Product Manager" },
  { id: "prj_003", name: "API Integration Suite", description: "Building third-party integration connectors for enterprise clients.", status: "on-hold", progress: 30, role: "Contributor" },
  { id: "prj_004", name: "Onboarding Flow", description: "Redesigned user onboarding to reduce drop-off rates.", status: "completed", progress: 100, role: "Project Lead" },
];

const TRANSACTIONS_POOL: ProfileTransaction[] = [
  { id: "txn_001", description: "Enterprise Plan Subscription", amount: "$299.00", date: "2025-03-01T00:00:00Z", status: "completed" },
  { id: "txn_002", description: "Additional Storage Add-on", amount: "$49.00", date: "2025-02-15T00:00:00Z", status: "completed" },
  { id: "txn_003", description: "Premium Support Package", amount: "$99.00", date: "2025-02-01T00:00:00Z", status: "pending" },
  { id: "txn_004", description: "Team Seat Expansion", amount: "$150.00", date: "2025-01-20T00:00:00Z", status: "completed" },
  { id: "txn_005", description: "Enterprise Plan Subscription", amount: "$299.00", date: "2025-01-01T00:00:00Z", status: "failed" },
];

const NOTES_POOL: ProfileNote[] = [
  { id: "note_001", content: "Has been instrumental in the Q1 product launch. Consider for team lead promotion in the next review cycle.", author: "James Wilson", createdAt: "2025-02-28T10:00:00Z" },
  { id: "note_002", content: "Requested additional tooling licenses for the team. Approved and provisioned.", author: "Sarah Chen", createdAt: "2025-02-15T14:30:00Z" },
  { id: "note_003", content: "Great collaboration with the design team this sprint. Communication skills are a strong asset.", author: "Olivia Martin", createdAt: "2025-01-30T09:15:00Z" },
];

/* Rotate an array by N positions so each user gets a different ordering. */
function rotate<T>(arr: T[], by: number): T[] {
  const n = arr.length;
  return arr.map((_, i) => arr[(i + by) % n]);
}

/**
 * Look up a user by ID and build a full profile.
 * Returns null when the ID does not exist (page shows a "not found" state).
 */
export function getUserProfile(id: string): UserProfile | null {
  const index = usersData.findIndex((u) => u.id === id);
  if (index === -1) return null;

  const user = usersData[index];
  const seed = index + 1;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: `+1 (555) ${String(200 + seed * 3).slice(0, 3)}-${String(1000 + seed * 137).slice(0, 4)}`,
    role: user.role,
    status: user.status,
    joinedAt: user.registeredAt,
    lastActive: user.lastActive,
    bio: BIOS[index % BIOS.length],
    location: LOCATIONS[index % LOCATIONS.length],
    department: DEPARTMENTS[index % DEPARTMENTS.length],
    stats: [
      { label: "Projects", value: String(4 + ((seed * 3) % 12)), change: "+2 this quarter", trend: "up" },
      { label: "Tasks Completed", value: String(120 + seed * 23), change: "+45 this month", trend: "up" },
      {
        label: "Hours Logged",
        value: (800 + seed * 55).toLocaleString(),
        change: seed % 2 === 0 ? "-12 vs last month" : "+30 vs last month",
        trend: seed % 2 === 0 ? "down" : "up",
      },
      { label: "Team Members", value: String(2 + (seed % 7)), change: "+1 this month", trend: "up" },
    ],
    activity: rotate(ACTIVITY_POOL, seed % ACTIVITY_POOL.length),
    projects: rotate(PROJECTS_POOL, seed % PROJECTS_POOL.length),
    transactions: rotate(TRANSACTIONS_POOL, seed % TRANSACTIONS_POOL.length),
    notes: rotate(NOTES_POOL, seed % NOTES_POOL.length),
  };
}