import { useState } from "react";
import { AddTodo } from "./components/AddTodo";
import { ToggleTheme } from "./components/ToggleTheme";
import { getInitialTheme } from "./helpers/getInitialTheme";
import { toggleTheme } from "./helpers/toggleTheme";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";
import { useTodoManagement } from "./hooks/useTodoManagement";
import { Header } from "./components/Header";
import { TodoList } from "./components/ToduList";
import { TodoFilter } from "./components/TodoFilter";

function App() {
  const [theme, setTheme] = useState(getInitialTheme());
  const [watchedFilter, setWatchedFilter] = useState("all");

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

  const filteredTodos = todos.filter((todo) => {
    if (watchedFilter === "comleted") return todo.completed;
    if (watchedFilter === "actived") return !todo.completed;
    return true;
  });

  return (
    <div
      data-theme={theme}
      className="flex flex-col min-h-screen  justify-center items-center bg-page-light dark:bg-gray-900 p-6"
    >
      <ToggleTheme toggleTheme={() => toggleTheme(setTheme)} theme={theme} />
      <div className="mx-auto flex flex-col gap-3">
        <Header />
        <AddTodo onAdd={onAdd} />
        <TodoFilter
          watchedFilter={watchedFilter}
          setWatchedFilter={setWatchedFilter}
        />
        <TodoList
          todos={filteredTodos}
          onDelete={onDelete}
          toggleComplete={toggleComplete}
          onUpdateTodo={onUpdateTodo}
        />
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
