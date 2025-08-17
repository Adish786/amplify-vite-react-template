import * as React from "react";

export function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${className}`}
    />
  );
}
