import type { Task } from "../types/task";
import axios from "./axios";

const API_URL = import.meta.env.VITE_API_URL;

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getTasksByProject = async (projectId: string): Promise<Task[]> => {
  const { data } = await axios.get(`${API_URL}/tasks?project=${projectId}`, {
    headers: authHeaders(),
  });
  return data;
};

export const createTask = async (
  payload: Partial<Task>
): Promise<Task> => {
  const { data } = await axios.post(
    `${API_URL}/tasks`,
    payload,
    { headers: authHeaders() }
  );
  return data;
};

export const updateTask = async (
  id: string,
  payload: Partial<Task>
): Promise<Task> => {
  const { data } = await axios.put(`${API_URL}/tasks/${id}`, payload, {
    headers: authHeaders(),
  });
  return data;
};

export const deleteTask = async (id: string) => {
  await axios.delete(`${API_URL}/tasks/${id}`, {
    headers: authHeaders(),
  });
};
