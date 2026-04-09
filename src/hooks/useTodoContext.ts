import { useContext, createContext } from "react";
import type { Todo } from "../types";

type TodoContextType = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  addTodo: (title: string) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleTodo: (id: number, completed: boolean) => Promise<void>;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context)
    throw new Error("useTodoContext must be used within TodoProvider");
  return context;
}
