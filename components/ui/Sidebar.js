// components/Sidebar.js - Sidebar component

import React from "react";
import {
  CheckCircle,
  ChevronDown,
  Atom,
  FlaskConical,
  Calculator,
} from "lucide-react";
import { ACTION_TYPES, SUBJECTS } from "../types";

const Sidebar = ({ state, dispatch }) => {
  const subjects = [
    {
      name: "Physics PYQs",
      icon: Atom,
      bgColor: "bg-orange-500",
      active: state.activeSubject === SUBJECTS.PHYSICS,
      subject: SUBJECTS.PHYSICS,
    },
    {
      name: "Chemistry PYQs",
      icon: FlaskConical,
      bgColor: "bg-green-500",
      active: state.activeSubject === SUBJECTS.CHEMISTRY,
      subject: SUBJECTS.CHEMISTRY,
    },
    {
      name: "Mathematics PYQs",
      icon: Calculator,
      bgColor: "bg-blue-500",
      active: state.activeSubject === SUBJECTS.MATHEMATICS,
      subject: SUBJECTS.MATHEMATICS,
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* JEE Main Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
            <CheckCircle className="w-3 h-3 text-white" />
          </div>
          <span className="font-semibold text-gray-900">JEE Main</span>
        </div>
        <div className="text-xs text-gray-600 space-y-1">
          <div>2025 - 2009 | 173 Papers | 15825 Qs</div>
        </div>
      </div>

      {/* Subjects List */}
      <div className="flex-1 p-4 space-y-2">
        {subjects.map((subject, index) => {
          const IconComponent = subject.icon;
          return (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                subject.active
                  ? "bg-orange-50 text-orange-700 border border-orange-200"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
              onClick={() =>
                dispatch({
                  type: ACTION_TYPES.SET_ACTIVE_SUBJECT,
                  payload: subject.subject,
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
