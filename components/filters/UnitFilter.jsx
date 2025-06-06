// components/filters/UnitFilter.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

/**
 * Unit filter dropdown component.
 *
 * @param {object} props - Component props.
 * @param {boolean} props.showUnitDropdown - State for dropdown visibility.
 * @param {function} props.onToggleDropdown - Function to toggle dropdown visibility.
 * @param {string[]} props.uniqueUnits - Array of unique unit options.
 * @param {string[]} props.selectedUnits - Array of currently selected units.
 * @param {function} props.onToggleUnit - Function to toggle a unit selection.
 * @param {boolean} props.isMobile - True if the current view is mobile.
 */
const UnitFilter = ({
  showUnitDropdown,
  onToggleDropdown,
  uniqueUnits,
  selectedUnits,
  onToggleUnit,
  isMobile,
}) => {
  return (
    <div
      className="relative flex-shrink-0 rounded-md"
      onClick={(e) => e.stopPropagation()} // Prevent closing other dropdowns
    >
      <Button
        id="unit-button"
        variant="outline"
        size="sm"
        className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 ${
          isMobile ? "text-xs" : ""
        } flex items-center rounded-md`}
        onClick={onToggleDropdown}
      >
        <ChevronDown className={`w-3 h-3 ${isMobile ? "mr-1" : "mr-1"}`} />{" "}
        {/* Icon before text */}
        Units
      </Button>
      {showUnitDropdown && (
        <div
          id="unit-dropdown"
          className="absolute top-full mt-1 w-40 md:w-48 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 rounded-md"
        >
          <div className="p-2">
            {uniqueUnits.map((unit) => (
              <label
                key={unit}
                className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer rounded text-xs md:text-sm text-gray-800 dark:text-gray-100"
              >
                <input
                  type="checkbox"
                  checked={selectedUnits.includes(unit)}
                  onChange={() => onToggleUnit(unit)}
                  className="rounded text-blue-600 focus:ring-blue-500 dark:text-blue-400 dark:focus:ring-blue-400"
                />
                <span>{unit}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitFilter;
