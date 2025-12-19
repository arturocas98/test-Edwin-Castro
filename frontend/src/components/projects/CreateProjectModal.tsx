import Modal from "../ui/Modal";
import { createProject } from "../../api/projects.api";
import ProjectForm from "./ProjectForm";
import type { Project } from "../../types/project";

interface Props {
  open: boolean;
  onClose: () => void;
  onProjectCreated: (project: Project) => void;
}

export default function CreateProjectModal({
  open,
  onClose,
  onProjectCreated,
}: Props) {
  const handleCreate = async (data: { name: string; description?: string }) => {
    try {
      const newProject = await createProject(data);
      onProjectCreated(newProject);
      onClose();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h3 className="text-xl font-semibold mb-4">Create New Project</h3>

      <ProjectForm
        initialData={{ name: "", description: "" }}
        submitText="Create Project"
        onSubmit={handleCreate}
      />
    </Modal>
  );
}
