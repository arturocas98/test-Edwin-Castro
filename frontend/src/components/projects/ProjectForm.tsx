import { useState } from "react";
import type { Project } from "../../types/project";
import UserSelector from "../users/UserSelector";

interface Props {
  initialData?: Partial<Project>;
  onSubmit: (data: { name: string; description?: string, collaborators: string[] }) => Promise<void>;
  submitText: string;
}

export default function ProjectForm({
  initialData,
  onSubmit,
  submitText,
}: Props) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );
  const [collaborators, setCollaborators] = useState<string[]>(
    initialData?.collaborators ?? []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Project name is required");
      return;
    }

    try {
      setLoading(true);
      await onSubmit({ name, description , collaborators });
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Name</label>
        <input
          className="w-full mt-1 px-3 py-2 border rounded focus:ring focus:ring-blue-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          className="w-full mt-1 px-3 py-2 border rounded focus:ring focus:ring-blue-300"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <UserSelector
          selectedUsers={collaborators}
          onUsersChange={setCollaborators}
          excludeCurrentUser={true}
          placeholder="Search team members to add as collaborators..."
        />
        <p className="text-xs text-gray-500 mt-1">
          Collaborators will have access to view and edit this project.
        </p>
      </div>

      {collaborators.length > 0 && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-sm text-blue-800 font-medium">
                {collaborators.length} collaborator
                {collaborators.length !== 1 ? "s" : ""} selected
              </p>
              <p className="text-xs text-blue-600 mt-1">
                These users will be able to view all tasks and contribute to the
                project.
              </p>
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
        {loading ? "Saving..." : submitText}
      </button>
    </form>
  );
}
