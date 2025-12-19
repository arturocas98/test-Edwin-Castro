import axios from "axios";
import type { Project } from "../types/project";
import type { PaginatedResponse } from "../types/api";

const API_URL = import.meta.env.VITE_API_URL;

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getProjects = async (): Promise<Project[]> => {
  const { data } = await axios.get<PaginatedResponse<Project>>(`${API_URL}/projects`, {
    headers: authHeaders(),
  });
  return data.data;
};

export const createProject = async (
  payload: Pick<Project, "name" | "description">
): Promise<Project> => {
  const { data } = await axios.post(`${API_URL}/projects`, payload, {
    headers: authHeaders(),
  });

  return data;
};

export const updateProject = async (
  id: string,
  payload: { name: string; description?: string }
) => {
  const { data } = await axios.put(`${API_URL}/projects/${id}`, payload, {
    headers: authHeaders(),
  });

  return data;
};

export const deleteProject = async (id: string) => {
  await axios.delete(`${API_URL}/projects/${id}`, {
    headers: authHeaders(),
  });
};
