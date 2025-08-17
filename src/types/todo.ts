// src/types/todo.ts

export interface Todo {
  id: string;
  content: string;
  completed?: boolean; // optional, in case you want to support it later
  createdAt?: string;
  updatedAt?: string;
}
