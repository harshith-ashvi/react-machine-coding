"use client";

import { useEffect, useState } from "react";
import { Check, Plus, Trash, X } from "lucide-react";

type TodoInterface = {
  id: string;
  title: string;
  isCompleted: boolean;
};

const EditableToDos = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [editTodo, setEditTodo] = useState<TodoInterface | null>(null);
  const [editTodoTitle, setEditTodoTitle] = useState("");

  useEffect(() => {}, []);

  const handleAddTodo = () => {
    const newTodo: TodoInterface = {
      id: `${Date.now()}`,
      title: todo,
      isCompleted: false,
    };
    setTodos((prevState: TodoInterface[]) => [...prevState, newTodo]);
    setTodo("");
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prevState) => {
      const filteredTodos = prevState.filter((todo) => todo.id !== id);
      return filteredTodos;
    });
  };

  const handleMarkAsComplete = (id: string) => {
    setTodos((prevState) => {
      const filteredTodos = prevState.map((todo) => {
        if (todo.id !== id) return todo;
        return { ...todo, isCompleted: !todo.isCompleted };
      });
      return filteredTodos;
    });
  };

  const handleEditTodo = (currentTodo: TodoInterface) => {
    setEditTodo(currentTodo);
    setEditTodoTitle(currentTodo.title);
  };

  const handleEditTodoTitle = (title: string) => {
    setEditTodoTitle(title);
  };

  const handleCancelEdit = () => {
    setEditTodo(null);
    setEditTodoTitle("");
  };

  const handleSaveEdit = () => {
    setTodos((prevState) => {
      const filteredTodos = prevState.map((todo) => {
        if (todo.id !== editTodo?.id) return todo;
        return { ...todo, title: editTodoTitle };
      });
      return filteredTodos;
    });
    handleCancelEdit();
  };

  return (
    <div className="flex flex-col items-center justify-start max-w-6xl mx-auto w-full min-h-screen mt-10">
      <div className="flex items-center w-full  gap-2">
        <input
          name="task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>
          <Plus />
        </button>
      </div>
      <div className="flex flex-col items-start justify-center">
        {todos.map((currentTodo) => {
          return (
            <div
              key={currentTodo.id}
              className="flex items-center justify-between w-full"
            >
              {editTodo?.id === currentTodo.id ? (
                <div className="flex items-center justify-between">
                  <input
                    value={editTodoTitle}
                    onChange={(e) => handleEditTodoTitle(e.target.value)}
                  />
                  <div className="flex items-center gap-1">
                    <button onClick={handleCancelEdit}>
                      <X />
                    </button>
                    <button onClick={handleSaveEdit}>
                      <Check />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={currentTodo.isCompleted}
                      onChange={() => handleMarkAsComplete(currentTodo.id)}
                    />

                    <p onDoubleClick={() => handleEditTodo(currentTodo)}>
                      {currentTodo.title}
                    </p>
                  </div>
                  <button onClick={() => handleDeleteTodo(currentTodo.id)}>
                    <Trash />
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditableToDos;
