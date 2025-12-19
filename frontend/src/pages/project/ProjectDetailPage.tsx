import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTasksByProject,
  updateTask,
  deleteTask,
  createTask,
} from "../../api/tasks.api";
import type { Task } from "../../types/task";
import TaskList from "../../components/tasks/TaskList";
import TaskModal from "../../components/tasks/TaskModal";
import TaskFilters from "../../components/tasks/TaskFilters";
import KanbanBoard from "../../components/kanban/KanbanBoard";


type ViewMode = "list" | "kanban";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [creating, setCreating] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | Task["status"]>(
    "all"
  );
  const [priorityFilter, setPriorityFilter] = useState<
    "all" | Task["priority"]
  >("all");
  const [search, setSearch] = useState("");

  const [viewMode, setViewMode] = useState<ViewMode>("kanban");

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description?.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleCreate = async (data: Partial<Task>) => {
    if (!projectId) return;
    const task = await createTask({ ...data, project: projectId });
    setTasks((prev) => [task, ...prev]);
  };

  const handleUpdate = async (data: Partial<Task>) => {
    if (!editingTask) return;
    const updated = await updateTask(editingTask._id, data);
    setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
  };

  useEffect(() => {
    if (!projectId) return;

    getTasksByProject(projectId)
      .then(setTasks)
      .finally(() => setLoading(false));
  }, [projectId]);

  const handleStatusChange = async (
    taskId: string,
    status: Task["status"],
    position: number
  ) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, status, position } : t))
    );

    try {
      await updateTask(taskId, { status, position });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (task: Task) => {
    await deleteTask(task._id);
    setTasks((prev) => prev.filter((t) => t._id !== task._id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Project Tasks</h2>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCreating(true)}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Task
          </button>
        </div>
      </div>

      <TaskFilters
        status={statusFilter}
        priority={priorityFilter}
        search={search}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onSearchChange={setSearch}
      />

      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center px-3 py-2 rounded-md transition-colors ${
              viewMode === "list"
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            title="List View">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            List
          </button>

          <button
            onClick={() => setViewMode("kanban")}
            className={`flex items-center px-3 py-2 rounded-md transition-colors ${
              viewMode === "kanban"
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
            title="Kanban View">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Kanban
          </button>
        </div>
      </div>

      <div className="mt-4">
        {viewMode === "list" ? (
          <TaskList
            tasks={filteredTasks}
            onEdit={(task) => setEditingTask(task)}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <KanbanBoard
            tasks={filteredTasks}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      <TaskModal
        task={creating ? ({} as Task) : null}
        title="New Task"
        submitText="Create"
        onClose={() => setCreating(false)}
        onSubmit={handleCreate}
      />

      <TaskModal
        task={editingTask}
        title="Edit Task"
        submitText="Update"
        onClose={() => setEditingTask(null)}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
