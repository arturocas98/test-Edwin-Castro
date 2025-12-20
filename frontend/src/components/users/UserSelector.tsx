import { useState, useEffect } from "react";
import type { User } from "../../types/user";
import { getUsers } from "../../api/users.api";

interface Props {
  selectedUsers: User[]; // Cambié el tipo de selectedUsers a User[]
  onUsersChange: (users: User[]) => void; // Cambié onUsersChange para recibir un array de User
  excludeCurrentUser?: boolean;
  currentUserId?: string;
  placeholder?: string;
  className?: string;
}

export default function UserSelector({
  selectedUsers,
  onUsersChange,
  excludeCurrentUser = true,
  currentUserId,
  placeholder = "Search users by name or email...",
  className = "",
}: Props) {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const isCurrentUser = excludeCurrentUser && user._id === currentUserId;
    const isAlreadySelected = selectedUsers.some(
      (selectedUser) => selectedUser._id === user._id
    );
    return matchesSearch && !isCurrentUser && !isAlreadySelected;
  });

  const handleAddUser = (user: User) => {
    if (!selectedUsers.some((selectedUser) => selectedUser._id === user._id)) {
      onUsersChange([...selectedUsers, user]);
      setSearch("");
      setShowDropdown(false);
    }
  };

  const handleRemoveUser = (user: User) => {
    onUsersChange(
      selectedUsers.filter((selectedUser) => selectedUser._id !== user._id)
    );
  };

  return (
    <div className={`relative ${className}`}>
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Add Collaborators
        </label>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          />
          {loading && (
            <div className="absolute right-3 top-3">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>

        {showDropdown && search.trim() && filteredUsers.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                onClick={() => handleAddUser(user)} // Cambié aquí para pasar el objeto completo
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Add
                </button>
              </div>
            ))}
          </div>
        )}

        {showDropdown &&
          search.trim() &&
          filteredUsers.length === 0 &&
          !loading && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4">
              <p className="text-gray-500 text-center">No users found</p>
            </div>
          )}
      </div>

      {selectedUsers.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Selected Collaborators ({selectedUsers.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedUsers.map((user) => {
              if (!user) return null;
              return (
                <div
                  key={user._id}
                  className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-blue-600">{user.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveUser(user)} // Pasamos el objeto completo
                    className="ml-2 text-blue-400 hover:text-blue-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}
