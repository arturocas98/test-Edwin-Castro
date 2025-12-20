import { useState, useEffect } from "react";
import type { Task, TaskPriority, TaskStatus } from "../../types/task";
import type { User } from "../../types/user";

interface Props {
  initialData?: Partial<Task>;
  onSubmit: (data: Partial<Task>) => Promise<void>;
  submitText: string;
  currentUserId?: string; // Para excluir al usuario actual si es necesario
}

export default function TaskForm({
  initialData,
  onSubmit,
  submitText,
  currentUserId,
}: Props) {
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
  const [assignedTo, setAssignedTo] = useState<string>(() => {
    if (!initialData?.assignedTo) return "";
    return typeof initialData.assignedTo === "string"
      ? initialData.assignedTo
      : initialData.assignedTo._id;
  });

  const [availableAssignees, setAvailableAssignees] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData?.project?.collaborators) {
      const collaborators = initialData.project.collaborators;
      if (collaborators.length > 0 && typeof collaborators[0] === "object") {
        setAvailableAssignees(collaborators as User[]);
      }
    }
  }, [initialData?.project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true);
      await onSubmit({
        title,
        description,
        status,
        priority,
        assignedTo: assignedTo || undefined,
      });
    } catch {
      setError("Error saving task");
    } finally {
      setLoading(false);
    }
  };

  const getAssignedUserName = () => {    
    if (!assignedTo) return "Unassigned";

    const user = availableAssignees.find((u) => u._id === assignedTo);
    if (user) return user.name;

    if (initialData?.project?.owner === assignedTo) {
      return "Project Owner";
    }
    return "Unknown User";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none min-h-[100px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the task (optional)"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Assign To
        </label>
        <div className="relative">
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none appearance-none"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}>
            <option value="">Unassigned</option>

            {initialData?.project?.owner && (
              <option value={initialData.project.owner}>
                {initialData.project.owner === currentUserId
                  ? "Me (Owner)"
                  : "Project Owner"}
              </option>
            )}

            {availableAssignees.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} {user._id === currentUserId ? "(Me)" : ""}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {assignedTo && (
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>Assigned to: {getAssignedUserName()}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full ${
            priority === "high"
              ? "bg-red-500"
              : priority === "medium"
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        />
        <span className="text-sm text-gray-600">
          {priority === "high"
            ? "High priority"
            : priority === "medium"
            ? "Medium priority"
            : "Low priority"}
        </span>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !title.trim()}
        className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          submitText
        )}
      </button>
    </form>
  );
}
