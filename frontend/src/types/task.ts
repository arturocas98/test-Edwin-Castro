import type { Project } from "./project";
import type { User } from "./user";

export type TaskStatus = "pending" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  project: Project;
  assignedTo?: User | string;
  createdAt: string;
  position: number;
}
