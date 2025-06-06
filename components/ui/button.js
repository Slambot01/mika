import React from "react";

export function Button({
  variant = "default",
  className = "",
  children,
  ...props
}) {
  let baseClass = "px-4 py-2 rounded border transition-colors";
  if (variant === "ghost") {
    baseClass += " bg-transparent hover:bg-gray-200";
  } else if (variant === "outline") {
    baseClass += " bg-white border-gray-300 hover:bg-gray-100";
  } else {
    baseClass += " bg-blue-500 text-white";
  }
  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
