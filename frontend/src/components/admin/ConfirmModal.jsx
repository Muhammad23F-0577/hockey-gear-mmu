const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white border rounded-lg p-6 w-full max-w-md shadow-md">
        
        <h2 className="text-xl font-bold text-black mb-2">
          🏑 {title}
        </h2>

        <p className="text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-black text-white py-2 rounded-md hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm"}
          </button>

          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-black py-2 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;