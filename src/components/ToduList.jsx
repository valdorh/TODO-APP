import { TodoItem } from "./TodoItem";

export const TodoList = ({ todos, onDelete, toggleComplete, onUpdateTodo }) => {
  return (
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
  );
};
