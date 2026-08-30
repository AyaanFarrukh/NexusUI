export type AIRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: AIRole;
  content: string;
  createdAt: string;
  model?: string;
  tokens?: number;
  error?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  messages: ChatMessage[];
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  speed: "Fast" | "Balanced";
}

export interface AISettings {
  modelId: string;
  temperature: number;
  systemPrompt: string;
}

export interface UsageStats {
  conversations: number;
  messages: number;
  tokens: number;
}