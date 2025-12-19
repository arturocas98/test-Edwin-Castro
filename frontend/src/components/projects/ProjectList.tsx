import { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../../api/projects.api";
import type { Project } from "../../types/project";
import ProjectCard from "./ProjectCard";
import EditProjectModal from "./EditProjectModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

interface Props {
  onProjectCreated?: (project: Project) => void;
}

export default function ProjectList({ onProjectCreated }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState<Project | null>(null);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const handleProjectCreated = (newProject: Project) => {
    // Actualizar la lista de proyectos
    setProjects((prev) => [newProject, ...prev]);

    // Si existe el callback, ejecutarlo
    if (onProjectCreated) {
      onProjectCreated(newProject);
    }
  };

  const handleUpdated = (updated: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p))
    );
  };

  const handleDelete = async () => {
    if (!deleting) return;
    await deleteProject(deleting._id);
    setProjects((prev) => prev.filter((p) => p._id !== deleting._id));
    setDeleting(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <ProjectCard
            key={p._id}
            project={p}
            onEdit={() => setEditing(p)}
            onDelete={() => setDeleting(p)}
          />
        ))}
      </div>

      <EditProjectModal
        project={editing}
        onClose={() => setEditing(null)}
        onUpdated={handleUpdated}
      />

      <DeleteConfirmModal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}
