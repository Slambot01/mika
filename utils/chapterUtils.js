// utils/chapterUtils.js
import React from "react"; // Import React for JSX in getChapterIcon
import {
  BookOpen,
  Calculator,
  Zap,
  Target,
  Globe,
  Activity,
  RotateCcw,
  Compass,
  Atom,
  FlaskConical,
  ArrowUp,
} from "lucide-react";

// Map chapter names to Lucide icons
export const chapterIconMap = {
  "Mathematics in Physics": Calculator,
  "Units and Dimensions": Target,
  "Motion In One Dimension": ArrowUp,
  "Motion in Two Dimensions": Activity,
  "Laws of Motion": Zap,
  Gravitation: Globe,
  "Centre of Mass Equilibrium and Momentum": Compass,
  // Note: Sun icon is typically used for dark mode toggle, avoiding reuse here.
  "Rotational Motion": RotateCcw,
};

// Helper function to get the correct icon for a chapter
export const getChapterIcon = (chapterName) => {
  const Icon = chapterIconMap[chapterName] || BookOpen; // Default to BookOpen if not found
  return <Icon className="w-4 h-4 text-orange-500 dark:text-orange-300" />;
};

// Helper to calculate year-over-year question count change
export const getYearChange = (chapter) => {
  // Ensure the years exist in the data to prevent errors
  const currentYearQs = chapter.yearWiseQuestionCount[2025] || 0;
  const previousYearQs = chapter.yearWiseQuestionCount[2024] || 0;
  return currentYearQs - previousYearQs;
};
