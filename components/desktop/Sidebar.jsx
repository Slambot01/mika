// components/desktop/Sidebar.jsx
import React from "react";
import {
  CheckCircle,
  Atom,
  FlaskConical,
  Calculator,
  ChevronDown,
} from "lucide-react";

/**
 * Desktop sidebar component for subject selection and JEE Main info.
 *
 * @param {object} props - Component props.
 * @param {string} props.activeSubject - The currently active subject.
 * @param {function} props.dispatch - The dispatch function from useReducer.
 */
const Sidebar = ({ activeSubject, dispatch }) => {
  const subjects = [
    {
      name: "Physics PYQs",
      subjectKey: "Physics",
      icon: Atom,
      bgColor: "bg-orange-500",
    },
    {
      name: "Chemistry PYQs",
      subjectKey: "Chemistry",
      icon: FlaskConical,
      bgColor: "bg-green-500",
    },
    {
      name: "Mathematics PYQs",
      subjectKey: "Mathematics",
      icon: Calculator,
      bgColor: "bg-blue-500",
    },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col rounded-md">
      {/* JEE Main Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 rounded-md">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
            <CheckCircle className="w-3 h-3 text-white" />
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">
            JEE Main
          </span>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
          <div>2025 - 2009 | 173 Papers | 15825 Qs</div>
        </div>
      </div>

      {/* Subjects List */}
      <div className="flex-1 p-4 space-y-2">
        {subjects.map((subject, index) => {
          const IconComponent = subject.icon;
          const isActive = activeSubject === subject.subjectKey;
          return (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors rounded-md
                ${
                  isActive
                    ? "bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:border-orange-800"
                    : "hover:bg-gray-50 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              onClick={() =>
                dispatch({
                  type: "SET_ACTIVE_SUBJECT",
                  payload: subject.subjectKey,
                })
              }
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-5 h-5 ${subject.bgColor} rounded flex items-center justify-center`}
                >
                  <IconComponent className="w-3 h-3 text-white" />
                </div>
                <span className="font-medium text-sm">{subject.name}</span>
              </div>
              <ChevronDown className="w-3 h-3" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
