export type UserStatus = "active" | "inactive" | "pending";
export type UserRole = "admin" | "editor" | "viewer" | "billing";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  registeredAt: string;
  lastActive: string;
}