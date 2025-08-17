import { Schema } from "../amplify/data/resource";
import TodoItem from "./TodoItem";
import { Card, CardContent } from "./ui/Card";

interface TodoListProps {
  todos: Array<Schema["Todo"]["type"]>; // ✅ Array instead of single Todo
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  return (
    <Card className="shadow-md">
      <CardContent className="space-y-3 pt-4">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center">
            ✨ No todos yet. Add one above!
          </p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}
