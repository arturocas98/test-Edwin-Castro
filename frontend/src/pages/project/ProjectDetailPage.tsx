import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTasksByProject, updateTask, deleteTask, createTask } from "../../api/tasks.api";
import type { Task } from "../../types/task";
import DashboardLayout from "../../components/layout/DashboardLayout";
import TaskList from "../../components/tasks/TaskList";
import TaskModal from "../../components/tasks/TaskModal";
import TaskFilters from "../../components/tasks/TaskFilters";
import KanbanBoard from "../../components/kanban/KanbanBoard";


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
    const task = await createTask(projectId, data);
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

  const handleStatusChange = async (task: Task, status: Task["status"]) => {
    const updated = await updateTask(task._id, { status });
    setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
  };

  const handleDelete = async (task: Task) => {
    await deleteTask(task._id);
    setTasks((prev) => prev.filter((t) => t._id !== task._id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Project Tasks</h2>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tasks</h2>

        <button
          onClick={() => setCreating(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + New Task
        </button>
      </div>

      <TaskFilters
        status={statusFilter}
        priority={priorityFilter}
        search={search}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onSearchChange={setSearch}
      />

      <TaskList
        tasks={filteredTasks}
        onEdit={(task) => setEditingTask(task)}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      <KanbanBoard tasks={filteredTasks} onStatusChange={handleStatusChange} />

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
    </DashboardLayout>
  );
}
