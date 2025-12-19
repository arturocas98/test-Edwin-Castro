import type { Project } from "../../types/project";
import { useNavigate } from "react-router-dom";

interface Props {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProjectCard({ project, onEdit, onDelete }: Props) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3
        onClick={() => navigate(`/projects/${project._id}`)}
        className="cursor-pointer hover:underline">
        {project.name}
      </h3>

      {project.description && (
        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
      )}

      <div className="flex gap-3 mt-4 text-sm">
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
