import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";

interface TodoFormProps {
  onAdd: (content: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input
        placeholder="Enter a new todo..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit">
        <Plus className="w-4 h-4 mr-1" /> Add
      </Button>
    </form>
  );
}
