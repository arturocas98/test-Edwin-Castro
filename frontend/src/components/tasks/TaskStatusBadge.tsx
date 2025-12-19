import type { TaskStatus } from "../../types/task";

const colors: Record<TaskStatus, string> = {
  pending: "bg-gray-200 text-gray-800",
  in_progress: "bg-blue-200 text-blue-800",
  completed: "bg-green-200 text-green-800",
};

export default function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span className={`text-xs px-2 py-1 rounded ${colors[status]}`}>
      {status.replace("_", " ")}
    </span>
  );
}
