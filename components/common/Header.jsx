// components/common/Header.jsx
import React from "react";
import { ArrowLeft } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle"; // Import the DarkModeToggle component

/**
 * Common header component for the Chapter Tracker application.
 * Adapts appearance slightly for mobile.
 *
 * @param {object} props - Component props.
 * @param {string} props.activeSubject - The currently active subject (e.g., "Physics").
 * @param {boolean} props.isMobile - True if the current view is mobile.
 * @param {boolean} props.isDarkMode - True if dark mode is active.
 * @param {function} props.dispatch - The dispatch function from useReducer.
 */
const Header = ({ activeSubject, isMobile, isDarkMode, dispatch }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-3 md:py-6 flex items-center justify-between rounded-md">
      {isMobile ? (
        <div className="flex items-center space-x-3">
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            JEE Main
          </h1>
        </div>
      ) : (
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
            {activeSubject} PYQs
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Chapter-wise Collection of {activeSubject} PYQs
          </p>
        </div>
      )}
      <DarkModeToggle
        isDarkMode={isDarkMode}
        onToggle={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
      />
    </div>
  );
};

export default Header;
