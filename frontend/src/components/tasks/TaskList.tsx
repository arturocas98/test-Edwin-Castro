import type { Task } from "../../types/task";
import TaskCard from "./TaskCard";

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (task: Task, status: Task["status"]) => void;
}

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}: Props) {
  if (tasks.length === 0) {
    return <p className="text-sm text-gray-500">No tasks yet</p>;
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task)}
          onStatusChange={(status) => onStatusChange(task, status)}
        />
      ))}
    </div>
  );
}
