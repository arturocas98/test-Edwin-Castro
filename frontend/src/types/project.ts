import type { User } from "./user";

export interface Project {
  _id: string;
  name: string;
  description?: string;
  owner: User | string;
  collaborators: User[];
  createdAt: string;
}
