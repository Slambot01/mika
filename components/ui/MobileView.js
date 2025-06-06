// components/mobile/MobileView.jsx - Mobile view component

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
// Corrected import paths based on your project structure and @/ alias
import { ACTION_TYPES, SUBJECTS } from "@/types";
import {
  getChapterIcon,
  getYearChange,
  getTotalQuestions,
} from "@/utils/chapterUtils";

const MobileView = ({
  state,
  dispatch,
  uniqueClasses,
  uniqueUnits,
  filteredChapters,
}) => {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white rounded-md">
      {/* Mobile Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between rounded-md">
        <div className="flex items-center space-x-3">
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            JEE Main
          </h1>
        </div>
        <Button
          variant="ghost"
          className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
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
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4 rounded-md">
        <div className="flex items-center justify-center space-x-6">
          {subjectTabs.map((tab, index) => (
            <div
              key={index}
              className={`flex flex-col items-center cursor-pointer ${
                tab.active ? "opacity-100" : "opacity-60"
              }`}
              onClick={() =>
                dispatch({
                  type: ACTION_TYPES.SET_ACTIVE_SUBJECT,
                  payload: tab.subject,
                })
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

      {/* Mobile Filters */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 rounded-md">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {/* Class Filter */}
          <div
            className="relative flex-shrink-0 rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="outline"
              size="sm"
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-xs flex items-center rounded-md"
              onClick={() =>
                dispatch({ type: ACTION_TYPES.TOGGLE_CLASS_DROPDOWN })
              }
            >
              {/* ChevronDown moved in front of text */}
              <ChevronDown className="w-3 h-3 mr-1" />
              Class
            </Button>
            {state.showClassDropdown && (
              <div className="absolute top-full mt-1 w-32 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 rounded-md">
                <div className="p-2">
                  {uniqueClasses.map((cls) => (
                    <label
                      key={cls}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer rounded text-xs text-gray-800 dark:text-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={state.selectedClasses.includes(cls)}
                        onChange={() =>
                          dispatch({
                            type: ACTION_TYPES.TOGGLE_CLASS,
                            payload: cls,
                          })
                        }
                        className="rounded text-blue-600 focus:ring-blue-500 dark:text-blue-400 dark:focus:ring-blue-400"
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
            className="relative flex-shrink-0 rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="outline"
              size="sm"
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-xs flex items-center rounded-md"
              onClick={() =>
                dispatch({ type: ACTION_TYPES.TOGGLE_UNIT_DROPDOWN })
              }
            >
              {/* ChevronDown moved in front of text */}
              <ChevronDown className="w-3 h-3 mr-1" />
              Units
            </Button>
            {state.showUnitDropdown && (
              <div className="absolute top-full mt-1 w-40 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 rounded-md">
                <div className="p-2">
                  {uniqueUnits.map((unit) => (
                    <label
                      key={unit}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer rounded text-xs text-gray-800 dark:text-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={state.selectedUnits.includes(unit)}
                        onChange={() =>
                          dispatch({
                            type: ACTION_TYPES.TOGGLE_UNIT,
                            payload: unit,
                          })
                        }
                        className="rounded text-blue-600 focus:ring-blue-500 dark:text-blue-400 dark:focus:ring-blue-400"
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
            className={`flex-shrink-0 text-xs rounded-md ${
              state.showNotStarted
                ? "bg-gray-800 text-white hover:bg-gray-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => dispatch({ type: ACTION_TYPES.TOGGLE_NOT_STARTED })}
          >
            Not Started
          </Button>

          <Button
            variant={state.showWeakChapters ? "default" : "outline"}
            size="sm"
            className={`flex-shrink-0 text-xs rounded-md ${
              state.showWeakChapters
                ? "bg-gray-800 text-white hover:bg-gray-700 dark:bg-red-600 dark:hover:bg-red-500"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() =>
              dispatch({ type: ACTION_TYPES.TOGGLE_WEAK_CHAPTERS })
            }
          >
            Weak
          </Button>

          <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
        </div>

        {/* Mobile Chapter Count and Sort (separate section for mobile) */}
        <div className="flex items-center justify-between w-full mt-3">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Showing all chapters ({filteredChapters.length})
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            onClick={() => dispatch({ type: ACTION_TYPES.TOGGLE_SORT })}
          >
            <ArrowUp
              className={`w-3 h-3 mr-1 ${
                !state.sortAscending ? "rotate-180" : ""
              }`}
            />
            Sort
          </Button>
        </div>
      </div>

      {/* Mobile Chapter List */}
      <div className="p-4">
        <div className="space-y-3">
          {filteredChapters.map((chapter, index) => {
            const totalQs = getTotalQuestions(chapter.yearWiseQuestionCount); // Using the new helper
            const yearChange = getYearChange(chapter);

            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 rounded-md"
              >
                <div className="flex items-start space-x-3">
                  {getChapterIcon(chapter.chapter)}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm leading-5 mb-2">
                      {chapter.chapter}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        <span>
                          2025: {chapter.yearWiseQuestionCount[2025]}s{" "}
                          {yearChange > 0 ? "↑" : yearChange < 0 ? "↓" : ""}
                        </span>
                        <span className="mx-2">|</span>
                        <span>
                          2024: {chapter.yearWiseQuestionCount[2024]}s
                        </span>
                      </div>
                      <div className="text-sm text-gray-900 dark:text-white font-medium">
                        {chapter.questionSolved}/{totalQs} Qs
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {filteredChapters.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No chapters found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileView;
