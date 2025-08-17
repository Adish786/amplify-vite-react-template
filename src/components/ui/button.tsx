import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline";
}

export function Button({ variant = "default", className, ...props }: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring transition";

  const variants: Record<string, string> = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    />
  );
}
