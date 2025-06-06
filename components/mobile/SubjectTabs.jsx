// components/mobile/SubjectTabs.jsx
import React from "react";

/**
 * Mobile subject tabs for quick subject switching.
 *
 * @param {object} props - Component props.
 * @param {string} props.activeSubject - The currently active subject.
 * @param {function} props.dispatch - The dispatch function from useReducer.
 */
const SubjectTabs = ({ activeSubject, dispatch }) => {
  const tabs = [
    { name: "Phy", subject: "Physics", bgColor: "bg-orange-500" },
    { name: "Chem", subject: "Chemistry", bgColor: "bg-green-500" },
    { name: "Math", subject: "Mathematics", bgColor: "bg-blue-500" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 rounded-md">
      <div className="flex items-center justify-center space-x-6">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`flex flex-col items-center cursor-pointer ${
              activeSubject === tab.subject ? "opacity-100" : "opacity-60"
            }`}
            onClick={() =>
              dispatch({ type: "SET_ACTIVE_SUBJECT", payload: tab.subject })
            }
          >
            <div
              className={`w-10 h-10 ${tab.bgColor} rounded-lg flex items-center justify-center mb-1 rounded-md`}
            >
              <span className="text-white text-xs font-medium">
                {tab.subject.charAt(0)}
              </span>
            </div>
            <span className="text-xs text-gray-700 dark:text-gray-300">
              {tab.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectTabs;
