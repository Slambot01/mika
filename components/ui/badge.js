import React from "react";

export function Badge({ variant = "default", className = "", children }) {
  let baseClass = "inline-block px-2 py-1 text-xs rounded";
  if (variant === "secondary") {
    baseClass += " bg-gray-200 text-gray-800";
  } else {
    baseClass += " bg-blue-100 text-blue-800";
  }
  return <span className={`${baseClass} ${className}`}>{children}</span>;
}
