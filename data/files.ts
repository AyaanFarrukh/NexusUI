import type { FileItem, FolderItem } from "@/types/file";

export const foldersData: FolderItem[] = [
  { id: "fld_001", name: "Design Assets", modifiedAt: "2025-03-14T10:20:00Z", owner: "Isabella Nguyen" },
  { id: "fld_002", name: "Marketing", modifiedAt: "2025-03-13T15:40:00Z", owner: "Mia Johnson" },
  { id: "fld_003", name: "Finance", modifiedAt: "2025-03-11T09:05:00Z", owner: "James Taylor" },
  { id: "fld_004", name: "Product Research", modifiedAt: "2025-03-12T17:25:00Z", owner: "Sofia Davis" },
  { id: "fld_005", name: "Brand Guidelines", modifiedAt: "2025-02-28T11:00:00Z", owner: "Evelyn Lewis" },
];

export const filesData: FileItem[] = [
  { id: "fil_001", name: "hero-banner.png", kind: "image", size: 2_400_000, modifiedAt: "2025-03-14T16:10:00Z", owner: "Isabella Nguyen", folderId: null, starred: true },
  { id: "fil_002", name: "podcast-intro.mp3", kind: "audio", size: 3_200_000, modifiedAt: "2025-03-10T08:30:00Z", owner: "Mia Johnson", folderId: null },
  { id: "fil_003", name: "release-checklist.docx", kind: "document", size: 88_000, modifiedAt: "2025-03-13T12:00:00Z", owner: "Olivia Martin", folderId: null },
  { id: "fil_004", name: "homepage-v3.fig", kind: "design", size: 8_400_000, modifiedAt: "2025-03-14T09:45:00Z", owner: "Isabella Nguyen", folderId: "fld_001", starred: true },
  { id: "fil_005", name: "onboarding-flow.fig", kind: "design", size: 5_100_000, modifiedAt: "2025-03-12T14:20:00Z", owner: "Emma Anderson", folderId: "fld_001" },
  { id: "fil_006", name: "icon-set.svg", kind: "image", size: 96_000, modifiedAt: "2025-03-08T10:15:00Z", owner: "Isabella Nguyen", folderId: "fld_001" },
  { id: "fil_007", name: "campaign-brief.docx", kind: "document", size: 180_000, modifiedAt: "2025-03-13T15:40:00Z", owner: "Mia Johnson", folderId: "fld_002" },
  { id: "fil_008", name: "social-assets.zip", kind: "archive", size: 24_800_000, modifiedAt: "2025-03-09T13:55:00Z", owner: "Lucas White", folderId: "fld_002" },
  { id: "fil_009", name: "q1-report.xlsx", kind: "spreadsheet", size: 340_000, modifiedAt: "2025-03-11T09:05:00Z", owner: "James Taylor", folderId: "fld_003", starred: true },
  { id: "fil_010", name: "budget-2025.xlsx", kind: "spreadsheet", size: 512_000, modifiedAt: "2025-03-05T16:45:00Z", owner: "James Taylor", folderId: "fld_003" },
  { id: "fil_011", name: "user-interviews.mp4", kind: "video", size: 148_000_000, modifiedAt: "2025-03-12T17:25:00Z", owner: "Sofia Davis", folderId: "fld_004" },
  { id: "fil_012", name: "sprint-14-notes.pdf", kind: "document", size: 420_000, modifiedAt: "2025-03-12T11:30:00Z", owner: "Olivia Martin", folderId: "fld_004" },
  { id: "fil_013", name: "api-spec-v4.json", kind: "code", size: 64_000, modifiedAt: "2025-03-11T18:00:00Z", owner: "Ethan Brown", folderId: "fld_004" },
  { id: "fil_014", name: "brand-guidelines.pdf", kind: "document", size: 2_100_000, modifiedAt: "2025-02-28T11:00:00Z", owner: "Evelyn Lewis", folderId: "fld_005", starred: true },
  { id: "fil_015", name: "logo-primary.svg", kind: "image", size: 42_000, modifiedAt: "2025-02-20T09:40:00Z", owner: "Evelyn Lewis", folderId: "fld_005" },
  { id: "fil_016", name: "launch-teaser.mov", kind: "video", size: 96_500_000, modifiedAt: "2025-03-07T14:10:00Z", owner: "Mia Johnson", folderId: "fld_002" },
];