import Modal from "../ui/Modal";
import type { Project } from "../../types/project";
import { updateProject } from "../../api/projects.api";
import ProjectForm from "./ProjectForm";

interface Props {
  project: Project | null;
  onClose: () => void;
  onUpdated: (project: Project) => void;
}

export default function EditProjectModal({
  project,
  onClose,
  onUpdated,
}: Props) {
  if (!project) return null;

  const handleUpdate = async (data: { name: string; description?: string }) => {
    const updated = await updateProject(project._id, data);
    onUpdated(updated);
    onClose();
  };

  return (
    <Modal open={!!project} onClose={onClose}>
      <h3 className="text-xl font-semibold mb-4">Edit Project</h3>

      <ProjectForm
        initialData={project}
        submitText="Update"
        onSubmit={handleUpdate}
      />
    </Modal>
  );
}
