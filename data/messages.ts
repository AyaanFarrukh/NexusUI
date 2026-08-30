import type { Conversation } from "@/types/message";

export const conversationsData: Conversation[] = [
  {
    id: "cnv_001",
    participantName: "Isabella Nguyen",
    participantRole: "Product Designer",
    unread: 2,
    messages: [
      { id: "msg_101", sender: "them", content: "Hey! I just uploaded the new hero mockups for the redesign.", timestamp: "2025-03-15T08:52:00Z", attachments: [{ name: "homepage-v3.fig" }] },
      { id: "msg_102", sender: "me", content: "Nice, downloading them now. The spacing on the pricing section looks much better.", timestamp: "2025-03-15T09:01:00Z" },
      { id: "msg_103", sender: "them", content: "Right? I also tightened the mobile breakpoints. Can you review before standup?", timestamp: "2025-03-15T09:10:00Z" },
      { id: "msg_104", sender: "them", content: "No rush, but the client call moved up to 2pm 🙂", timestamp: "2025-03-15T09:11:00Z" },
    ],
  },
  {
    id: "cnv_002",
    participantName: "Jackson Lee",
    participantRole: "Frontend Engineer",
    unread: 0,
    messages: [
      { id: "msg_201", sender: "me", content: "The iOS nav overlap is fixed — PR #482 is up.", timestamp: "2025-03-14T17:20:00Z" },
      { id: "msg_202", sender: "them", content: "Reviewed and approved. Shipping it with the next build.", timestamp: "2025-03-14T17:44:00Z" },
    ],
  },
  {
    id: "cnv_003",
    participantName: "Olivia Martin",
    participantRole: "Project Lead",
    unread: 1,
    messages: [
      { id: "msg_301", sender: "them", content: "Sprint 14 planning notes are ready. Capacity looks tight this time.", timestamp: "2025-03-14T10:05:00Z", attachments: [{ name: "sprint-14-notes.pdf" }] },
      { id: "msg_302", sender: "me", content: "Thanks — I'll rebalance the task list today.", timestamp: "2025-03-14T10:32:00Z" },
      { id: "msg_303", sender: "them", content: "Perfect. Also, can you own the accessibility audit review?", timestamp: "2025-03-14T10:35:00Z" },
    ],
  },
  {
    id: "cnv_004",
    participantName: "Ethan Brown",
    participantRole: "Tech Lead",
    unread: 0,
    messages: [
      { id: "msg_401", sender: "me", content: "Do we have staging keys for the Salesforce sandbox?", timestamp: "2025-03-13T14:12:00Z" },
      { id: "msg_402", sender: "them", content: "Yes — rotated them last week. Check the vault under /integrations/salesforce.", timestamp: "2025-03-13T14:30:00Z" },
    ],
  },
  {
    id: "cnv_005",
    participantName: "Mia Johnson",
    participantRole: "Product Manager",
    unread: 0,
    messages: [
      { id: "msg_501", sender: "them", content: "Q2 campaign assets are finalized. Launching Monday!", timestamp: "2025-03-12T09:48:00Z" },
    ],
  },
];

/** Canned replies used to simulate the other side responding. */
export const simulatedReplies = [
  "Sounds good — I'll take a look shortly.",
  "Great, thanks for the update!",
  "Can we sync on this tomorrow morning?",
  "Perfect, shipping it now 🚀",
];