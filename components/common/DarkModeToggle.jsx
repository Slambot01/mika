import React from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

/**
 * A reusable dark mode toggle button.
 * It displays a Sun icon in dark mode and a Moon icon in light mode.
 *
 * @param {object} props - Component props.
 * @param {boolean} props.isDarkMode - Current dark mode state.
 * @param {function} props.onToggle - Function to dispatch the TOGGLE_DARK_MODE action.
 */
const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <Button
      variant="ghost"
      className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
      onClick={onToggle}
    >
      {isDarkMode ? (
        <Sun className="w-4 h-4" /> // Show Sun when in dark mode (click to go to light)
      ) : (
        <Moon className="w-4 h-4" /> // Show Moon when in light mode (click to go to dark)
      )}
    </Button>
  );
};

export default DarkModeToggle;
