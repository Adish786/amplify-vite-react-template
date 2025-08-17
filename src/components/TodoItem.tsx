import { useState } from "react";
import { Todo } from "../types/todo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Edit, Trash2, Save, X } from "lucide-react";

interface TodoItemProps {
    todo: Todo;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(todo.content);

  const handleSave = () => {
    if (!content.trim()) return;
    onUpdate(todo.id, content);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border">
      {isEditing ? (
        <div className="flex items-center space-x-2 w-full">
          <Input value={content} onChange={(e) => setContent(e.target.value)} />
          <Button className="px-2 py-1 bg-green-500 text-white rounded" onClick={handleSave}>
            <Save className="w-4 h-4" />
          </Button>
          <Button
            className="px-2 py-1 bg-gray-300 text-gray-800 rounded"
            onClick={() => {
              setIsEditing(false);
              setContent(todo.content);
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <>
          <span className="text-gray-800">{todo.content}</span>
          <div className="flex space-x-2">
            <Button
              className="p-2 bg-blue-500 text-white rounded"
              onClick={() => setIsEditing(true)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              className="p-2 bg-red-500 text-white rounded"
              onClick={() => onDelete(todo.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
