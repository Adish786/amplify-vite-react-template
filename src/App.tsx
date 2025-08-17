import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Card, CardHeader, CardTitle } from "./components/ui/Card";
import { Button } from "./components/ui/button";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { LogOut } from "lucide-react";


const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { user, signOut } = useAuthenticator();

  useEffect(() => {
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
      error: (err) => console.error("❌ Subscription error", err),
    });

    return () => subscription.unsubscribe();
  }, []);

  async function createTodo(content: string) {
    try {
      await client.models.Todo.create({ content });
    } catch (error) {
      console.error("Failed to create todo", error);
    }
  }

  async function updateTodo(id: string, content: string) {
    try {
      await client.models.Todo.update({ id, content });
    } catch (error) {
      console.error("Failed to update todo", error);
    }
  }

  async function deleteTodo(id: string) {
    try {
      await client.models.Todo.delete({ id });
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">
              {user?.signInDetails?.loginId}’s Todo List 📝
            </CardTitle>
            <Button variant="destructive" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </Button>
          </CardHeader>
        </Card>

        {/* Create Form */}
        <TodoForm onAdd={createTodo} />

        {/* Todo List */}
        <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
      </div>
    </main>
  );
}

export default App;
