import type { AIModel } from "@/types/ai";

export const AI_MODELS: AIModel[] = [
  { id: "nexus-4-turbo", name: "Nexus-4 Turbo", description: "Fastest responses for everyday tasks", speed: "Fast" },
  { id: "nexus-4", name: "Nexus-4", description: "Best balance of quality and speed", speed: "Balanced" },
  { id: "nexus-3-mini", name: "Nexus-3 Mini", description: "Lightweight and cost-efficient", speed: "Fast" },
];

export const DEFAULT_SYSTEM_PROMPT =
  "You are Nexus AI, a helpful and concise assistant. Answer clearly, use bullet points when useful, and ask a follow-up question when the request is ambiguous.";