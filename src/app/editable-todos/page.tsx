"use client";

import { KeyboardEvent, useState } from "react";
import { Check, Plus, Trash, X } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const handleAddTask = () => {
    const newTodo: TodoInterface = {
      id: `${Date.now()}`,
      title: todo,
      isCompleted: false,
    };
    setTodos((prevState: TodoInterface[]) => [...prevState, newTodo]);
    setTodo("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
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
    if (!currentTodo.isCompleted) {
      setEditTodo(currentTodo);
      setEditTodoTitle(currentTodo.title);
    }
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
    <div className="flex flex-col items-start justify-start max-w-2xl mx-auto w-full min-h-screen mt-10 px-2">
      <h1 className="font-bold text-2xl py-4">Your To Do</h1>
      <div className="flex justify-center items-center w-full gap-2">
        <input
          name="task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border-b border-neutral-200 focus:border-none w-full"
          placeholder="Add your task"
        />
        <button onClick={handleAddTask}>
          <Plus />
        </button>
      </div>
      <div className="flex flex-col items-start justify-center w-full gap-2 mt-4">
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
                      <X className="" />
                    </button>
                    <button onClick={handleSaveEdit}>
                      <Check />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={currentTodo.isCompleted}
                      onChange={() => handleMarkAsComplete(currentTodo.id)}
                      className=""
                    />

                    <p
                      className={cn(
                        "text-lg",
                        currentTodo.isCompleted ? "line-through" : ""
                      )}
                      onDoubleClick={() => handleEditTodo(currentTodo)}
                    >
                      {currentTodo.title}
                    </p>
                  </div>
                  <button onClick={() => handleDeleteTodo(currentTodo.id)}>
                    <Trash className="size-4 mr-1" />
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
