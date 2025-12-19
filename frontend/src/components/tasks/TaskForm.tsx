import { useState } from "react";
import type { Task, TaskPriority, TaskStatus } from "../../types/task";

interface Props {
  initialData?: Partial<Task>;
  onSubmit: (data: Partial<Task>) => Promise<void>;
  submitText: string;
}

export default function TaskForm({ initialData, onSubmit, submitText }: Props) {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(
    initialData?.description ?? ""
  );
  const [status, setStatus] = useState<TaskStatus>(
    initialData?.status ?? "pending"
  );
  const [priority, setPriority] = useState<TaskPriority>(
    initialData?.priority ?? "medium"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true);
      await onSubmit({ title, description, status, priority });
    } catch {
      setError("Error saving task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Title</label>
        <input
          className="w-full mt-1 px-3 py-2 border rounded focus:ring focus:ring-blue-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium">Status</label>
          <select
            className="w-full mt-1 border px-2 py-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium">Priority</label>
          <select
            className="w-full mt-1 border px-2 py-2 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
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
