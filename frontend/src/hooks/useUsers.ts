// src/hooks/useUsers.ts
import { useState, useEffect } from "react";
import type { User } from "../types/user";
import { getUsers, searchUsers } from "../api/users.api";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);

  useEffect(() => {
    loadAllUsers();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      const timeoutId = setTimeout(() => {
        searchUsers(searchTerm).then(setSearchResults);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const loadAllUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshUsers = () => {
    loadAllUsers();
  };

  return {
    users,
    searchResults: searchTerm.trim() ? searchResults : users,
    loading,
    searchTerm,
    setSearchTerm,
    refreshUsers,
  };
};
