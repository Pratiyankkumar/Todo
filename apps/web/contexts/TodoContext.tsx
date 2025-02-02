import { ExtendedCreateTodo } from "@/app/today/page";
import React, { createContext, useContext, useState } from "react";

type TodoContextType = {
  todo: ExtendedCreateTodo[] | null;
  saveTodoList: (todo: ExtendedCreateTodo[]) => void;
  getTodo: () => ExtendedCreateTodo[] | null;
};

const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todo, setTodo] = useState<ExtendedCreateTodo[] | null>(null);

  const saveTodoList = (todo: ExtendedCreateTodo[]) => {
    setTodo(todo);
  };

  const getTodo = () => {
    return todo;
  };

  return (
    <TodoContext.Provider value={{ todo, saveTodoList, getTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context)
    throw new Error("Todo context was used outside of todo provide");
  return context;
};
