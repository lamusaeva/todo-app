import { useState, useEffect } from "react";
import { TodoContext } from "../hooks/useTodoContext";
import { supabase } from "../lib/supabase";
import type { Todo } from "../types";

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTodos(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Xəta baş verdi");
    } finally {
      setLoading(false);
    }
  }

  async function addTodo(title: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("todos")
      .insert([{ title, completed: false, user_id: user?.id }])
      .select()
      .single();

    if (error) throw error;
    setTodos((prev) => [data, ...prev]);
  }

  async function deleteTodo(id: number) {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) throw error;
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  async function toggleTodo(id: number, completed: boolean) {
    const { error } = await supabase
      .from("todos")
      .update({ completed: !completed })
      .eq("id", id);
    if (error) throw error;
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !completed } : t)),
    );
  }

  return (
    <TodoContext.Provider
      value={{ todos, loading, error, addTodo, deleteTodo, toggleTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}
