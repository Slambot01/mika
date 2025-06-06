// components/ChapterListDisplay.jsx
import React from "react";
import { getChapterIcon, getYearChange } from "@/utils/chapterUtils"; // Import utilities

/**
 * Displays a list of chapters.
 *
 * @param {object} props - Component props.
 * @param {array} props.chapters - Array of chapter objects to display.
 * @param {boolean} props.isMobile - True if the current view is mobile.
 */
const ChapterListDisplay = ({ chapters, isMobile }) => {
  return (
    <div className={`flex-1 ${isMobile ? "p-4" : "p-6"} rounded-md`}>
      <div className="space-y-3">
        {chapters.map((chapter, index) => {
          const totalQs = Object.values(chapter.yearWiseQuestionCount).reduce(
            (a, b) => a + b,
            0
          );
          const yearChange = getYearChange(chapter);

          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-sm transition-shadow rounded-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getChapterIcon(chapter.chapter)}
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                      {chapter.chapter}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center space-x-8 text-sm">
                  {/* Year comparison */}
                  <div className="text-gray-600 dark:text-gray-400">
                    <span>
                      2025: {chapter.yearWiseQuestionCount[2025]}s{" "}
                      {yearChange > 0 ? "↑" : yearChange < 0 ? "↓" : ""}
                    </span>
                    <span className="mx-2">|</span>
                    <span>2024: {chapter.yearWiseQuestionCount[2024]}s</span>
                  </div>

                  {/* Total questions */}
                  <div className="text-gray-900 dark:text-white font-medium">
                    {chapter.questionSolved}/{totalQs} Qs
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {chapters.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No chapters found matching your filters.
        </div>
      )}
    </div>
  );
};

export default ChapterListDisplay;
