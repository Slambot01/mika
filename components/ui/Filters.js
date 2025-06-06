// components/Filters.js - Filters component

import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowUp, ArrowDown } from "lucide-react";
import { ACTION_TYPES } from "../types";

const Filters = ({
  state,
  dispatch,
  uniqueClasses,
  uniqueUnits,
  filteredChaptersCount,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Class Filter */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="outline"
              size="sm"
              className="bg-white border-gray-300 text-gray-700 inline-flex items-center"
              onClick={() =>
                dispatch({ type: ACTION_TYPES.TOGGLE_CLASS_DROPDOWN })
              }
            >
              <span>Class</span>
              <ChevronDown className="w-4 h-3 ml-1" />
            </Button>
            {state.showClassDropdown && (
              <div className="absolute top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="p-2">
                  {uniqueClasses.map((cls) => (
                    <label
                      key={cls}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 cursor-pointer rounded text-sm"
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
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="outline"
              size="sm"
              className="bg-white border-gray-300 text-gray-700 inline-flex items-center"
              onClick={() =>
                dispatch({ type: ACTION_TYPES.TOGGLE_UNIT_DROPDOWN })
              }
            >
              <span>Units</span>
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
            {state.showUnitDropdown && (
              <div className="absolute top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <div className="p-2">
                  {uniqueUnits.map((unit) => (
                    <label
                      key={unit}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 cursor-pointer rounded text-sm"
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
            className={
              state.showNotStarted
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-white border-gray-300 text-gray-700"
            }
            onClick={() => dispatch({ type: ACTION_TYPES.TOGGLE_NOT_STARTED })}
          >
            Not Started
          </Button>

          <Button
            variant={state.showWeakChapters ? "default" : "outline"}
            size="sm"
            className={
              state.showWeakChapters
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-white border-gray-300 text-gray-700"
            }
            onClick={() =>
              dispatch({ type: ACTION_TYPES.TOGGLE_WEAK_CHAPTERS })
            }
          >
            Weak Chapters
          </Button>
        </div>

        {/* Right side - Showing count and Sort */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Showing all chapters ({filteredChaptersCount})
          </span>
          <Button
            variant="outline"
            size="sm"
            className="bg-white border-gray-300 text-gray-700 inline-flex items-center"
            onClick={() => dispatch({ type: ACTION_TYPES.TOGGLE_SORT })}
          >
            <span>Sort</span>
            <ArrowUp
              className={`w-3 h-3 ml-1 ${
                !state.sortAscending ? "rotate-180" : ""
              }`}
            />
            <ArrowDown
              className={`w-3 h-3 ml-0 ${
                state.sortAscending ? "" : "rotate-180"
              }`}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
