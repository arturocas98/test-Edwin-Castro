import type { TaskPriority, TaskStatus } from "../../types/task";

interface Props {
  status: TaskStatus | "all";
  priority: TaskPriority | "all";
  search: string;
  onStatusChange: (value: TaskStatus | "all") => void;
  onPriorityChange: (value: TaskPriority | "all") => void;
  onSearchChange: (value: string) => void;
}

export default function TaskFilters({
  status,
  priority,
  search,
  onStatusChange,
  onPriorityChange,
  onSearchChange,
}: Props) {
  return (
    <div className="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Search task..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border rounded px-3 py-2 flex-1"
      />

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as TaskStatus | "all")}
        className="border rounded px-3 py-2">
        <option value="all">All statuses</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={priority}
        onChange={(e) =>
          onPriorityChange(e.target.value as TaskPriority | "all")
        }
        className="border rounded px-3 py-2">
        <option value="all">All priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}
