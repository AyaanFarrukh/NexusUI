export interface MessageAttachment {
  name: string;
}

export interface DirectMessage {
  id: string;
  sender: "me" | "them";
  content: string;
  timestamp: string;
  attachments?: MessageAttachment[];
}

export interface Conversation {
  id: string;
  participantName: string;
  participantRole: string;
  unread: number;
  messages: DirectMessage[];
}