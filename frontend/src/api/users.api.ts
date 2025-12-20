import type { User } from "../types/user";
import axios from "./axios";

const API_URL = import.meta.env.VITE_API_URL;
const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get(`${API_URL}/users`, {
    headers: authHeaders(),
  });
  return data;
};

export const searchUsers = async (query: string): Promise<User[]> => {
  const { data } = await axios.get(`${API_URL}/users/search?q=${query}`, {
    headers: authHeaders(),
  });
  return data;
};

export const getUsersByIds = async (ids: string[]): Promise<User[]> => {
  if (ids.length === 0) return [];

  const response = await axios.get(`${API_URL}/users/by-ids`, {
    params: { ids: ids.join(",") },
  });
  return response.data;
};
