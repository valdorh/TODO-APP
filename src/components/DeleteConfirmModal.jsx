export function DeleteConfirmModal({ onConfirm, onCancel, message }) {
  return (
    <>
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>
        <div className="relative flex h-full items-center justify-center p-4 z-5">
          <div className="relative p-6 rounded-lg shadow-xl max-w-md w-full mx-4 bg-white/80 text-gray-800 dark:bg-gray-800 dark:text-white">
            <button
              type="button"
              onClick={onCancel}
              aria-label="Close modal"
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors cursor-pointer"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-center">
              Подтверждение удаления
            </h3>
            <p className="mb-6 text-center">{message}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-md text-gray-200 bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
              >
                Отмена
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md transition-colors cursor-pointer shadow-lg"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
