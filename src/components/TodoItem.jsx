import { useState } from "react";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

export const TodoItem = ({
  todo,
  onDelete,
  onToggleComplete,
  onUpdateTodo,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDeadline, setEditDeadline] = useState(todo.deadline || "");

  const handleDelete = () => {
    onDelete(todo.id);
    setIsDeleting(false);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onUpdateTodo(todo.id, editText, editDeadline);
      setIsEditing(false);
    }
  };

  return (
    <div
      className="group flex items-center min-w-100
    justify-between px-4 py-2 gap-3 bg-white dark:bg-page-dark rounded-lg  shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
    >
      <div className="flex gap-3 w-full">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`p-1  rounded-full border-2 flex my-auto cursor-pointer ${
            todo.completed
              ? "border-green-500 bg-green-500"
              : "border-gray-300 hover:border-gray-400"
          } transition-colors duration-300`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4  ${
              todo.completed ? "text-white" : "text-transparent"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
        {isEditing ? (
          <div className="flex flex-col  gap-2  pr-6 justify-items-stretch w-full">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              className=" w-full dark:bg-gray-700 bg-gray-200 border border-gray-300 dark:border-gray-400 rounded-md px-2 py-1  text-gray-700 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <div className=" flex  justify-between  gap-2">
              <input
                type="datetime-local"
                value={editDeadline}
                onChange={(e) => setEditDeadline(e.target.value)}
                className='dark:bg-gray-700 bg-gray-200 border border-gray-300 dark:border-gray-400 rounded-md px-2 py-1 text-gray-700 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"'
              />
              <div className="flex  gap-2 ">
                <button
                  onClick={handleSave}
                  className="text-green-400 hover:text-green-200 transition-colors cursor-pointer"
                  aria-label="Save date"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    className="w-6 h-6"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                  aria-label="Cancel edit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    className=""
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col cursor-pointer"
            onDoubleClick={() => setIsEditing(true)}
          >
            <span
              className={`text-1 ${
                todo.completed
                  ? "line-through text-gray-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {todo.text}
            </span>
            <span className="text-xs text-gray-400 ">
              От: {new Date(todo.createAt).toLocaleString()}
            </span>
            {todo.deadline && (
              <span
                className={`text-xs ${
                  todo.completed
                    ? " text-transparent hover:text-gray-400"
                    : new Date(todo.deadline) < new Date()
                      ? "text-red-500"
                      : "text-gray-700 dark:text-gray-300"
                }`}
              >
                До:{" "}
                {new Date(todo.deadline).toLocaleString("ru-RU", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="">
        <button
          onClick={() => setIsDeleting(true)}
          className=" opacity-20 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-300 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
      {isDeleting && (
        <DeleteConfirmModal
          onConfirm={handleDelete}
          onCancel={() => setIsDeleting(false)}
          message={"Вы уверенны, что хотите удалить задачу?"}
        />
      )}
    </div>
  );
};
