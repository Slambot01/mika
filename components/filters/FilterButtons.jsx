// components/filters/FilterButtons.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ChevronRight } from "lucide-react"; // Removed ArrowDown as it's not used directly

/**
 * Component for the filter and sort buttons (Not Started, Weak, Sort).
 *
 * @param {object} props - Component props.
 * @param {boolean} props.showNotStarted - State for "Not Started" filter.
 * @param {function} props.onToggleNotStarted - Function to toggle "Not Started" filter.
 * @param {boolean} props.showWeakChapters - State for "Weak Chapters" filter.
 * @param {function} props.onToggleWeakChapters - Function to toggle "Weak Chapters" filter.
 * @param {number} props.filteredChaptersCount - Number of chapters currently filtered.
 * @param {boolean} props.sortAscending - State for sorting order.
 * @param {function} props.onToggleSort - Function to toggle sort order.
 * @param {boolean} props.isMobile - True if the current view is mobile.
 */
const FilterButtons = ({
  showNotStarted,
  onToggleNotStarted,
  showWeakChapters,
  onToggleWeakChapters,
  filteredChaptersCount,
  sortAscending,
  onToggleSort,
  isMobile,
}) => {
  return (
    <>
      <Button
        variant={showNotStarted ? "default" : "outline"}
        size="sm"
        className={`flex-shrink-0 ${isMobile ? "text-xs" : ""} rounded-md
          ${
            showNotStarted
              ? "bg-gray-800 text-white hover:bg-gray-700 dark:bg-blue-600 dark:hover:bg-blue-500"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        onClick={onToggleNotStarted}
      >
        Not Started
      </Button>

      <Button
        variant={showWeakChapters ? "default" : "outline"}
        size="sm"
        className={`flex-shrink-0 ${isMobile ? "text-xs" : ""} rounded-md
          ${
            showWeakChapters
              ? "bg-gray-800 text-white hover:bg-gray-700 dark:bg-red-600 dark:hover:bg-red-500"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        onClick={onToggleWeakChapters}
      >
        Weak{isMobile ? "" : " Chapters"}{" "}
        {/* "Weak Chapters" on desktop, "Weak" on mobile */}
      </Button>

      {/* ChevronRight for mobile filters overflow */}
      {isMobile && (
        <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
      )}

      {/* Desktop Sort Button */}
      {!isMobile && (
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Showing all chapters ({filteredChaptersCount})
          </span>
          <Button
            variant="outline"
            size="sm"
            className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center rounded-md"
            onClick={onToggleSort}
          >
            <ArrowUp
              className={`w-3 h-3 mr-1 ${!sortAscending ? "rotate-180" : ""}`}
            />
            Sort
          </Button>
        </div>
      )}

      {/* Mobile Sort display - This was part of the original mobile layout's filter section.
          If it's intended to be distinct from the other filter buttons, it stays separate in ChapterTracker.jsx.
          If it should be part of the filter group's horizontal scroll, integrate it above.
          For now, keeping it as a separate section as per original layout. */}
    </>
  );
};

export default FilterButtons;
