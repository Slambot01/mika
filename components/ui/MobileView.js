// components/MobileView.js - Mobile view component

import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Sun,
  Moon,
  ChevronDown,
  ArrowUp,
  ChevronRight,
} from "lucide-react";
import { ACTION_TYPES, SUBJECTS } from "../types";
import { getChapterIcon, getYearChange, getTotalQuestions } from "../utils/chapterUtils";

const MobileView = ({ state, dispatch, uniqueClasses, uniqueUnits, filteredChapters }) => {
  const subjectTabs = [
    {
      name: "Phy",
      subject: SUBJECTS.PHYSICS,
      bgColor: "bg-orange-500",
      active: state.activeSubject === SUBJECTS.PHYSICS,
    },
    {
      name: "Chem",
      subject: SUBJECTS.CHEMISTRY,
      bgColor: "bg-green-500",
      active: state.activeSubject === SUBJECTS.CHEMISTRY,
    },
    {
      name: "Math",
      subject: SUBJECTS.MATHEMATICS,
      bgColor: "bg-blue-500",
      active: state.activeSubject === SUBJECTS.MATHEMATICS,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
          <h1 className="text-lg font-semibold text-gray-900">JEE Main</h1>
        </div>
        <Button
          variant="ghost"
          className="text-gray-700 hover:bg-gray-100"
          onClick={() => dispatch({ type: ACTION_TYPES.TOGGLE_DARK_MODE })}
        >
          {state.isDarkMode ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Mobile Subject Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-center space-x-6">
          {subjectTabs.map((tab, index) => (
            <div
              key={index}
              className={`flex flex-col items-center cursor-pointer ${
                tab.active ? "opacity-100" : "opacity-60"
              }`}
              onClick={() =>
                dispatch({ type: ACTION_TYPES.SET_ACTIVE_SUBJECT, payload: tab.subject })
              }
            >
              <div
                className={`w-10 h-10 ${tab.bgColor} rounded-lg flex items-center justify-center mb-1`}
              >
                <span className="text-white text-xs font-medium">
                  {tab.subject.charAt(0)}
                </span>
              </div>
              <span className="text-xs text-gray-700">{tab.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {/* Class Filter */}
          <div
            className="relative flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="outline"
              size="sm"
              className="bg-white border-gray-300 text-gray-700 text-xs"
              onClick={() => dispatch({ type: ACTION_TYPES.TOGGLE_CLASS_DROPDOWN })}
            >
              Class
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
            {state.showClassDropdown && (
              <div className="absolute top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="p-2">
                  {uniqueClasses.map((cls) => (
                    <label
                      key={cls}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 cursor-pointer rounded text-xs"
                    >
                      <input
                        type="checkbox"
                        checked={state.selectedClasses.includes(cls)}
                        onChange={() =>
                          dispatch({ type: ACTION_TYPES.TOGGLE_CLASS, payload: cls })
                        }
                        className="rounded"
                      />
                      <span>{cls}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Units Filter */}
          <div
            className="relative flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="outline"
              size="sm"
              className="bg-white border-gray-300 text-gray-700 text-xs"
              onClick={() => dispatch({ type: ACTION_TYPES.TOGGLE_UNIT_DROPDOWN })}
            >
              Units
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
            {state.showUnitDropdown && (
              <div className="absolute top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="p-2">
                  {uniqueUnits.map((unit) => (
                    <label
                      key={unit}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 cursor-pointer rounded text-xs"
                    >
                      <input
                        type="checkbox"
                        checked={state.selectedUnits.includes(unit)}
                        onChange={() =>
                          dispatch({ type: ACTION_TYPES.TOGGLE_UNIT, payload: unit })
                        }
                        className="rounded"
                      />
                      <span>{unit}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Filter Buttons */}
          <Button
            variant={state.showNotStarted ? "default" : "outline"}
            size="sm"
            className={`flex-shrink-0 text-xs ${
              state.showNotStarted
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-white border-gray-300 text-gray-700"
            }`}
            onClick={() => dispatch({ type: ACTION_TYPES.TOGGLE_NOT_STARTED })}
          >
            Not Started
          </Button>

          <Button
            variant={state.showWeakChapters ? "default" : "outline"}
            size="sm"
            className={`flex-shrink-0 text-xs ${
              state.showWeakChapters
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-white border-gray-300 text-gray-700"
            }`}
            onClick={() => dispatch({ type: ACTION_TYPES.TOGGLE_WEAK_CHAPTERS })}
          >
            Weak
          </Button>

          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
        </div>
      </div>

      {/* Mobile Chapter Count and Sort */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Showing all chapters ({filteredChapters.length})
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 text-sm font-medium"
            onClick={() => dispatch({ type: ACTION_TYPES.TOGGLE_SORT })}
          >
            <ArrowUp
              className={`