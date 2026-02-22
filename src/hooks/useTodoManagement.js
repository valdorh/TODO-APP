import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "todos";
const API_URL = "https://6996cc7f7d178643657552bc.mockapi.io/api/v1/todos";

export const useTodoManagement = () => {
  const [todos, setTodos] = useState([]);
  const [isDeletingCompleted, setIsDeletingCompleted] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const savedTodos = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_KEY) || "[]",
        );
        setTodos(savedTodos);
      } catch (error) {
        console.log(new Error(error));
      }
      try {
        const response = await fetch(API_URL);

        if (response.ok) {
          const serverTodos = await response.json();
          setTodos(serverTodos);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(serverTodos));
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };
    loadInitialData();
  }, []);

  const onAdd = async (text, deadline) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createAt: new Date().toISOString(),
      deadline: deadline || null,
      order: todos.length + 1,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      const createdTodo = await response.json();

      const syncedTodos = updatedTodos.map((todo) =>
        todo.id === newTodo.id ? createdTodo : todo,
      );
      setTodos(syncedTodos);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(syncedTodos));
    } catch (error) {
      console.error("Ошибка добавления задачи: ", error);
      setTodos(todos);
    }
  };

  const toggleComplete = async (id) => {
    const todoUpdate = todos.find((todo) => todo.id === id);
    if (!todoUpdate) return;

    const updatedTodo = { ...todoUpdate, completed: !todoUpdate.completed };

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo,
    );
    setTodos(updatedTodos);

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Ошибка изменения: ", error);
      setTodos(todos);
    }
  };

  const onUpdateTodo = async (id, updateText, updateDeadline) => {
    //console.log(id, updateText, updateDeadline);
    const todoUpdate = todos.find((todo) => todo.id === id);
    if (!todoUpdate) return;

    const updatedTodo = {
      ...todoUpdate,
      text: updateText,
      deadline: updateDeadline,
    };
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo,
    );
    setTodos(updatedTodos);

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Ошибка изменения: ", error);
      setTodos(todos);
    }
  };

  const onDelete = async (id) => {
    const previousTodos = [...todos];
    const updateTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updateTodos);

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
    } catch (error) {
      console.error("Ошибка удаления: ", error);
      setTodos(previousTodos);
    }
  };

  const onDeleteCompleted = async () => {
    const failedIds = [];
    const originalTodos = [...todos];
    const completedIds = originalTodos
      .filter((todo) => todo.completed)
      .map((todo) => todo.id);
    const activeTodos = originalTodos.filter((todo) => !todo.completed);

    setTodos(activeTodos);

    for (const id of completedIds) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          failedIds.push(id);
        }
      } catch (error) {
        console.error(`Ошибка удаления задачи: ${id}`, error);
        failedIds.push(id);
      }
    }

    const nextTodos =
      failedIds.length > 0
        ? originalTodos.filter(
            (todo) => !todo.completed || failedIds.includes(todo.id),
          )
        : activeTodos;

    setTodos(nextTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextTodos));
    setIsDeletingCompleted(false);
  };

  return {
    todos,
    onAdd,
    toggleComplete,
    onUpdateTodo,
    onDelete,
    onDeleteCompleted,
    isDeletingCompleted,
    setIsDeletingCompleted,
  };
};
