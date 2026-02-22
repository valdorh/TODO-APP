import { useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { AddTodo } from "./components/AddTodo";
import { ToggleTheme } from "./components/ToggleTheme";
import { getInitialTheme } from "./helpers/getInitialTheme";
import { toggleTheme } from "./helpers/toggleTheme";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";
import { useTodoManagement } from "./hooks/useTodoManagement";
import { Header } from "./components/Header";

function App() {
  const [theme, setTheme] = useState(getInitialTheme());

  const {
    todos,
    toggleComplete,
    onUpdateTodo,
    onDelete,
    onDeleteCompleted,
    setIsDeletingCompleted,
    isDeletingCompleted,
    onAdd,
  } = useTodoManagement();

  const hasCompletedTodo = todos.some((todo) => todo.completed);

  return (
    <div
      data-theme={theme}
      className="flex flex-col min-h-screen  justify-center items-center bg-page-light dark:bg-page-dark p-6"
    >
      <ToggleTheme toggleTheme={() => toggleTheme(setTheme)} theme={theme} />
      <div className="mx-auto flex flex-col gap-3">
        <Header />
        <AddTodo onAdd={onAdd} />

        <div className="flex flex-col gap-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onToggleComplete={toggleComplete}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </div>
      </div>
      {hasCompletedTodo && (
        <button
          onClick={() => setIsDeletingCompleted(true)}
          className="px-4 py-1.5 mt-4 rounded-md bg-red-500 text-white hover:bg-red-700 transition-colors cursor-pointer"
        >
          Удалить выбранные
        </button>
      )}
      {isDeletingCompleted && (
        <DeleteConfirmModal
          message={`Вы уверенны, что хотите удалить все (${1}) задачи?`}
          onConfirm={onDeleteCompleted}
        />
      )}
    </div>
  );
}

export default App;
