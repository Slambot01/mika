// components/ChapterList.js - Chapter list component

import React from "react";
import {
  getChapterIcon,
  getYearChange,
  getTotalQuestions,
} from "../utils/chapterUtils";

const ChapterList = ({ chapters }) => {
  if (chapters.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No chapters found matching your filters.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {chapters.map((chapter, index) => {
        const yearChange = getYearChange(chapter);
        const totalQs = getTotalQuestions(chapter);

        return (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getChapterIcon(chapter.chapter)}
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">
                    {chapter.chapter}
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-8 text-sm">
                {/* Year comparison */}
                <div className="text-gray-600">
                  <span>
                    2025: {chapter.yearWiseQuestionCount[2025]}s{" "}
                    {yearChange > 0 ? "↑" : yearChange < 0 ? "↓" : ""}
                  </span>
                  <span className="mx-2">|</span>
                  <span>2024: {chapter.yearWiseQuestionCount[2024]}s</span>
                </div>

                {/* Total questions */}
                <div className="text-gray-900 font-medium">
                  {totalQs}/205 Qs
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChapterList;
