import type{ Task } from "../../types/task";
import KanbanColumn from "./KanbanColumn";

interface Props {
  tasks: Task[];
  onStatusChange: (taskId: string, status: Task["status"], position: number) => void;
}

export default function KanbanBoard({ tasks, onStatusChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <KanbanColumn
        title="Pending"
        status="pending"
        tasks={tasks
          .filter((t) => t.status === "pending")
          .sort((a, b) => a.position - b.position)}
        onDropTask={onStatusChange}
      />

      <KanbanColumn
        title="In Progress"
        status="in_progress"
        tasks={tasks
          .filter((t) => t.status === "in_progress")
          .sort((a, b) => a.position - b.position)}
        onDropTask={onStatusChange}
      />

      <KanbanColumn
        title="Completed"
        status="completed"
        tasks={tasks
          .filter((t) => t.status === "completed")
          .sort((a, b) => a.position - b.position)}
        onDropTask={onStatusChange}
      />
    </div>
  );
}
