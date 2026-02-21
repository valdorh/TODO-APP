import { useState } from "react";

export function AddTodo({ onAdd }) {
  const [text, setText] = useState("");
  const [deadline, setDedline] = useState("");
  const [showDeadlineInput, setShowDeadlineInput] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, deadline);
      setText("");
      setDedline("");
      setShowDeadlineInput(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 min-w-1/2">
      <div className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 focus-within:ring-2 focus-within:ring-blue-500">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Добавить задачу..."
          className="flex-1 p-3 text-gray-700 dark:bg-page-dark dark:text-txt-dark outline-none placeholder-gray-400"
        />
        <button
          type="submit"
          className="p-3 bg-btn-light hover:bg-btn-light-hv text-white dark:bg-btn-dark hover:dark:bg-btn-dark-hv transition-colors duration-300 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      {showDeadlineInput && (
        <div className="flex items-center gap-2  text-gray-300  cursor-pointer">
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDedline(e.target.value)}
            className="p-2 rounded-md flex-1"
          />
          <button
            className="p-2 text-gray-300 hover:text-gray-500 cursor-pointer"
            type="button"
            onClick={() => {
              setDedline("");
              setShowDeadlineInput(false);
            }}
          >
            Отменить
          </button>
        </div>
      )}
      {!showDeadlineInput && (
        <button
          className="self-start text-blue-300 hover:text-blue-500 cursor-pointer"
          type="button"
          onClick={() => {
            setShowDeadlineInput(true);
          }}
        >
          + Добавить дедлайн
        </button>
      )}
    </form>
  );
}
