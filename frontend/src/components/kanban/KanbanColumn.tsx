import type { Task } from "../../types/task";
import KanbanCard from "./KanbanCard";
import { useState } from "react";

interface Props {
  title: string;
  status: Task["status"];
  tasks: Task[];
  onDropTask: (taskId: string, status: Task["status"], position: number) => void;
}

const statusColors: Record<Task["status"], { bg: string; border: string; text: string; accent: string }> = {
  pending: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    accent: "bg-blue-500"
  },
  in_progress: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    accent: "bg-yellow-500"
  },
  completed: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    accent: "bg-green-500"
  },
};

export default function KanbanColumn({
  title,
  status,
  tasks,
  onDropTask,
}: Props) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    
    const taskId = e.dataTransfer.getData("taskId");
    const newPosition = tasks.length > 0 
      ? Math.max(...tasks.map((t) => t.position)) + 1 
      : 0;

    onDropTask(taskId, status, newPosition);
  };

  // Ordenar tareas por posición
  const sortedTasks = [...tasks].sort((a, b) => a.position - b.position);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col flex-shrink-0 w-full md:w-80 rounded-xl transition-all duration-200 ${
        statusColors[status].bg
      } ${statusColors[status].border} ${
        isDraggingOver ? "ring-2 ring-offset-2 ring-blue-400 scale-[1.02]" : ""
      }`}
    >
      <div className={`sticky top-0 z-10 p-4 rounded-t-xl ${statusColors[status].bg} border-b ${statusColors[status].border}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${statusColors[status].accent}`}></div>
            <h3 className={`font-semibold text-sm uppercase tracking-wide ${statusColors[status].text}`}>
              {title}
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[status].text} ${statusColors[status].border} border`}>
              {tasks.length}
            </span>
            
            <button
              className={`p-1 rounded-lg hover:bg-white/50 transition-colors ${statusColors[status].text}`}
              title={`Add task to ${title}`}
              onClick={() => {/* Implementar lógica para agregar tarea */}}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${statusColors[status].accent} transition-all duration-300`}
            style={{ width: `${status === 'completed' ? '100%' : status === 'in_progress' ? '50%' : '10%'}` }}
          ></div>
        </div>
      </div>

      <div className={`flex-1 p-3 space-y-3 overflow-y-auto min-h-[200px] max-h-[calc(100vh-250px)] ${
        sortedTasks.length === 0 ? "flex items-center justify-center" : ""
      }`}>
        {sortedTasks.length === 0 ? (
          <div className="text-center py-8 px-4">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${statusColors[status].border} border-2 mb-3`}>
              <svg 
                className={`w-6 h-6 ${statusColors[status].text}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                />
              </svg>
            </div>
            <p className={`text-sm ${statusColors[status].text} font-medium`}>No tasks here</p>
            <p className="text-xs text-gray-500 mt-1">Drop tasks or create new ones</p>
          </div>
        ) : (
          sortedTasks.map((task) => (
            <div
              key={task._id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("taskId", task._id);
                e.dataTransfer.setData("sourceStatus", status);
                e.currentTarget.classList.add("opacity-50");
              }}
              onDragEnd={(e) => {
                e.currentTarget.classList.remove("opacity-50");
              }}
              className="transform transition-transform hover:-translate-y-0.5"
            >
              <KanbanCard 
                task={task} 
              />
            </div>
          ))
        )}
        
        {isDraggingOver && tasks.length > 0 && (
          <div className="relative">
            <div className="absolute inset-0 border-2 border-dashed border-blue-400 rounded-lg pointer-events-none"></div>
          </div>
        )}
      </div>
    </div>
  );
}
