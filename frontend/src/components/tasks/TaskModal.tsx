import Modal from "../ui/Modal";
import TaskForm from "./TaskForm";
import type { Task } from "../../types/task";

interface Props {
  task: Task | null;
  onClose: () => void;
  onSubmit: (data: Partial<Task>) => Promise<void>;
  title: string;
  submitText: string;
}

export default function TaskModal({
  task,
  onClose,
  onSubmit,
  title,
  submitText,
}: Props) {
  return (
    <Modal open={!!task} onClose={onClose}>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>

      <TaskForm
        initialData={task ?? undefined}
        submitText={submitText}
        onSubmit={async (data) => {
          await onSubmit(data);
          onClose();
        }}
      />
    </Modal>
  );
}
