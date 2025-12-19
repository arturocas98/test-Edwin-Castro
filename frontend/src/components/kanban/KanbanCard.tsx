import type { Task } from "../../types/task";

interface Props {
  task: Task;
}

export default function KanbanCard({ task }: Props) {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", task._id);
        e.dataTransfer.setData("fromStatus", task.status);
        e.dataTransfer.setData("fromPosition", String(task.position));
      }}
      className="bg-white rounded shadow p-3 cursor-move hover:shadow-md transition">
      <h4 className="font-semibold text-sm">{task.title}</h4>

      {task.description && (
        <p className="text-xs text-gray-500 mt-1">{task.description}</p>
      )}

      <span
        className={`inline-block mt-2 text-xs px-2 py-1 rounded
          ${
            task.priority === "high"
              ? "bg-red-100 text-red-700"
              : task.priority === "medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}>
        {task.priority}
      </span>
    </div>
  );
}
