import { FaTrash } from "react-icons/fa";

export default function ConfirmDeleteDialog({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
      <div className="bg-white px-8 py-6 rounded-lg text-center space-y-6 shadow-lg w-full max-w-md">
        <h3 className="text-black font-medium text-lg">
          Are you sure to Delete this Student?
        </h3>

        <div className="flex items-center justify-between">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 text-blue-600 border border-blue-600 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          {/* Delete Button */}
          <button
            onClick={onConfirm}
            className="flex items-center gap-3 px-5 py-2 bg-blue-600 text-white border border-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            <FaTrash />
            <span>Yes, Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

