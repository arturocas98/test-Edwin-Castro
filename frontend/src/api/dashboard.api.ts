import axios from "./axios";

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  tasksByStatus: {
    pending: number;
    in_progress: number;
    completed: number;
  };
  tasksByPriority: {
    low: number;
    medium: number;
    high: number;
  };
  recentTasks: {
    _id: string;
    title: string;
    status: string;
    updatedAt: string;
  }[];
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await axios.get("/dashboard/stats", {
    headers: authHeaders(),
  });
  return data;
};
