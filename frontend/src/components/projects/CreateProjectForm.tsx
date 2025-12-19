import { useState } from "react";
import { createProject } from "../../api/projects.api";
import type { Project } from "../../types/project";

interface Props {
  onCreated: (project: Project) => void;
}

export default function CreateProjectForm({ onCreated }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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
      const project = await createProject({ name, description });
      onCreated(project);
    } catch {
      setError("Error creating project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className="text-xl font-semibold mb-4">New Project</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Description</label>
          <textarea
            className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </>
  );
}
