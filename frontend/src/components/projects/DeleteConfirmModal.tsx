import Modal from "../ui/Modal";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <h3 className="text-lg font-semibold mb-4">Delete project?</h3>

      <p className="text-sm text-gray-600 mb-6">
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="px-4 py-2 border rounded">
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Delete
        </button>
      </div>
    </Modal>
  );
}
