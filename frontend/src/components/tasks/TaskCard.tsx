import type { Task } from "../../types/task";
import TaskStatusBadge from "./TaskStatusBadge";

interface Props {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: Task["status"]) => void;
}

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) {
  return (
    <div className="bg-white rounded shadow p-4 space-y-2">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">{task.title}</h4>
        <TaskStatusBadge status={task.status} />
      </div>

      {task.description && (
        <p className="text-sm text-gray-600">{task.description}</p>
      )}

      <div className="flex gap-2 text-sm">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(e.target.value as Task["status"])}
          className="border rounded px-2 py-1">
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button onClick={onEdit} className="text-blue-600 hover:underline">
          Edit
        </button>

        <button onClick={onDelete} className="text-red-600 hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
}
