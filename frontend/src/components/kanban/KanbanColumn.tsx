import type { Task } from "../../types/task";
import KanbanCard from "./KanbanCard";

interface Props {
  title: string;
  status: Task["status"];
  tasks: Task[];
  onDropTask: (taskId: string, status: Task["status"], position: number) => void;
}

const statusColors: Record<Task["status"], string> = {
  pending: "border-blue-400",
  in_progress: "border-yellow-400",
  completed: "border-green-400",
};

export default function KanbanColumn({
  title,
  status,
  tasks,
  onDropTask,
}: Props) {


  const handleDrop = (e: React.DragEvent) => {
    const taskId = e.dataTransfer.getData("taskId");

    const newPosition =
      tasks.length === 0 ? 0 : Math.max(...tasks.map((t) => t.position)) + 1;

    onDropTask(taskId, status, newPosition);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className={`flex flex-col bg-gray-100 rounded-xl p-4 min-h-[500px] border-t-4 ${statusColors[status]}`}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {tasks.map((task) => (
          <div
            key={task._id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("taskId", task._id)}>
            <KanbanCard task={task} />
          </div>
        ))}
      </div>
    </div>
  );
}
