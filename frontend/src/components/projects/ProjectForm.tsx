import { useState } from "react";
import type { Project } from "../../types/project";

interface Props {
  initialData?: Partial<Project>;
  onSubmit: (data: { name: string; description?: string }) => Promise<void>;
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
      await onSubmit({ name, description });
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

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
        {loading ? "Saving..." : submitText}
      </button>
    </form>
  );
}
