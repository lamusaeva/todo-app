import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Login from "./pages/Login";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodoContext } from "./hooks/useTodoContext";
import type { Session } from "@supabase/supabase-js";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { loading, error } = useTodoContext();

  async function logout() {
  await supabase.auth.signOut()
}

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (authLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-purple-500">Loading...</p>
      </div>
    );

  if (!session) return <Login />;

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-purple-500">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-700">Today</h1>
        <button
          onClick={logout}
          className="text-sm text-gray-400 hover:text-red-400 transition"
        >
          Sign out
        </button>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm p-6">
          <TodoForm />
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;
