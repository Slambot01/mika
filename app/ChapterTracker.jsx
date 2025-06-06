"use client"; // Required for Next.js client components

import React, { useReducer, useMemo } from "react";
// Import state logic from the new hooks file
import { initialState, reducer } from "@/hooks/useChapterReducer";
// Import mock data from its dedicated file
import { mockData } from "@/data/mockData";
// Import utility functions
import { getYearChange } from "@/utils/chapterUtils";

// Import reusable UI components from their new locations
import Header from "@/components/common/Header";
import SubjectTabs from "@/components/mobile/SubjectTabs";
import Sidebar from "@/components/desktop/Sidebar";
import ClassFilter from "@/components/filters/ClassFilter";
import UnitFilter from "@/components/filters/UnitFilter";
import FilterButtons from "@/components/filters/FilterButtons";
import ChapterListDisplay from "@/components/ChapterListDisplay";

function ChapterTracker() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Effect to initialize dark mode from local storage or system preference
  React.useEffect(() => {
    dispatch({ type: "INIT_DARK_MODE" });
  }, []); // Run once on component mount

  // Effect to apply/remove 'dark' class on the root HTML element
  React.useEffect(() => {
    if (state.isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.isDarkMode]); // Re-run when isDarkMode changes

  // Effect to determine if the view is mobile based on window width
  React.useEffect(() => {
    const checkMobile = () => {
      dispatch({ type: "SET_MOBILE", payload: window.innerWidth < 768 });
    };

    checkMobile(); // Check on initial render
    window.addEventListener("resize", checkMobile); // Add resize listener
    return () => window.removeEventListener("resize", checkMobile); // Clean up listener
  }, []);

  // Effect to close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      // Get references to the dropdowns and their toggle buttons using IDs
      const classDropdown = document.getElementById("class-dropdown");
      const unitDropdown = document.getElementById("unit-dropdown");
      const classButton = document.getElementById("class-button");
      const unitButton = document.getElementById("unit-button");

      // Check if the click event target is outside the class dropdown AND its button
      const isClickOutsideClassDropdown =
        classDropdown &&
        !classDropdown.contains(event.target) &&
        classButton &&
        !classButton.contains(event.target);
      // Check if the click event target is outside the unit dropdown AND its button
      const isClickOutsideUnitDropdown =
        unitDropdown &&
        !unitDropdown.contains(event.target) &&
        unitButton &&
        !unitButton.contains(event.target);

      // If class dropdown is open and click is outside both its dropdown and button
      if (state.showClassDropdown && isClickOutsideClassDropdown) {
        dispatch({ type: "CLOSE_DROPDOWNS" });
      }
      // If unit dropdown is open and click is outside both its dropdown and button
      if (state.showUnitDropdown && isClickOutsideUnitDropdown) {
        dispatch({ type: "CLOSE_DROPDOWNS" });
      }
    };
    // Attach event listener to the document
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup function to remove event listener on component unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [state.showClassDropdown, state.showUnitDropdown]); // Re-run effect when dropdown states change

  // Memoized calculation for unique classes and units based on active subject
  const { uniqueClasses, uniqueUnits } = useMemo(() => {
    const subjectData = mockData.filter(
      (item) => item.subject === state.activeSubject
    );
    return {
      uniqueClasses: [...new Set(subjectData.map((item) => item.class))].sort(),
      uniqueUnits: [...new Set(subjectData.map((item) => item.unit))].sort(),
    };
  }, [state.activeSubject]); // Re-calculate when activeSubject changes

  // Memoized filtering and sorting of chapters
  const filteredChapters = useMemo(() => {
    let chapters = mockData.filter(
      (item) => item.subject === state.activeSubject
    );
    if (state.selectedClasses.length > 0) {
      chapters = chapters.filter((item) =>
        state.selectedClasses.includes(item.class)
      );
    }
    if (state.selectedUnits.length > 0) {
      chapters = chapters.filter((item) =>
        state.selectedUnits.includes(item.unit)
      );
    }
    if (state.showWeakChapters) {
      chapters = chapters.filter((item) => item.isWeakChapter);
    }
    if (state.showNotStarted) {
      chapters = chapters.filter((item) => item.status === "Not Started");
    }
    // Sort chapters alphabetically based on the sortAscending state
    chapters.sort((a, b) =>
      state.sortAscending
        ? a.chapter.localeCompare(b.chapter)
        : b.chapter.localeCompare(a.chapter)
    );
    return chapters;
  }, [
    state.activeSubject,
    state.selectedClasses,
    state.selectedUnits,
    state.showWeakChapters,
    state.showNotStarted,
    state.sortAscending,
  ]);

  // Render based on isMobile state
  return (
    <div className="min-h-screen font-sans">
      {" "}
      {/* Removed dark mode class from here, controlled by document.documentElement */}
      {state.isMobile ? (
        // Mobile Layout
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white rounded-md">
          <Header
            activeSubject={state.activeSubject}
            isMobile={state.isMobile}
            isDarkMode={state.isDarkMode}
            dispatch={dispatch}
          />
          <SubjectTabs
            activeSubject={state.activeSubject}
            dispatch={dispatch}
          />
          {/* Mobile Filters Section */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 rounded-md">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              <ClassFilter
                showClassDropdown={state.showClassDropdown}
                onToggleDropdown={() =>
                  dispatch({ type: "TOGGLE_CLASS_DROPDOWN" })
                }
                uniqueClasses={uniqueClasses}
                selectedClasses={state.selectedClasses}
                onToggleClass={(cls) =>
                  dispatch({ type: "TOGGLE_CLASS", payload: cls })
                }
                isMobile={state.isMobile}
              />
              <UnitFilter
                showUnitDropdown={state.showUnitDropdown}
                onToggleDropdown={() =>
                  dispatch({ type: "TOGGLE_UNIT_DROPDOWN" })
                }
                uniqueUnits={uniqueUnits}
                selectedUnits={state.selectedUnits}
                onToggleUnit={(unit) =>
                  dispatch({ type: "TOGGLE_UNIT", payload: unit })
                }
                isMobile={state.isMobile}
              />
              {/* FilterButtons for mobile will handle Not Started, Weak, and their own sort display */}
              <FilterButtons
                showNotStarted={state.showNotStarted}
                onToggleNotStarted={() =>
                  dispatch({ type: "TOGGLE_NOT_STARTED" })
                }
                showWeakChapters={state.showWeakChapters}
                onToggleWeakChapters={() =>
                  dispatch({ type: "TOGGLE_WEAK_CHAPTERS" })
                }
                filteredChaptersCount={filteredChapters.length}
                sortAscending={state.sortAscending}
                onToggleSort={() => dispatch({ type: "TOGGLE_SORT" })}
                isMobile={state.isMobile}
              />
            </div>
            {/* Mobile Sort display moved into FilterButtons component for better encapsulation */}
          </div>
          <ChapterListDisplay
            chapters={filteredChapters}
            isMobile={state.isMobile}
          />
        </div>
      ) : (
        // Desktop Layout
        <div className="flex flex-1 min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white rounded-md">
          <Sidebar activeSubject={state.activeSubject} dispatch={dispatch} />
          <div className="flex-1 flex flex-col">
            <Header
              activeSubject={state.activeSubject}
              isMobile={state.isMobile}
              isDarkMode={state.isDarkMode}
              dispatch={dispatch}
            />
            {/* Desktop Filters Section */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ClassFilter
                    showClassDropdown={state.showClassDropdown}
                    onToggleDropdown={() =>
                      dispatch({ type: "TOGGLE_CLASS_DROPDOWN" })
                    }
                    uniqueClasses={uniqueClasses}
                    selectedClasses={state.selectedClasses}
                    onToggleClass={(cls) =>
                      dispatch({ type: "TOGGLE_CLASS", payload: cls })
                    }
                    isMobile={state.isMobile}
                  />
                  <UnitFilter
                    showUnitDropdown={state.showUnitDropdown}
                    onToggleDropdown={() =>
                      dispatch({ type: "TOGGLE_UNIT_DROPDOWN" })
                    }
                    uniqueUnits={uniqueUnits}
                    selectedUnits={state.selectedUnits}
                    onToggleUnit={(unit) =>
                      dispatch({ type: "TOGGLE_UNIT", payload: unit })
                    }
                    isMobile={state.isMobile}
                  />
                  <FilterButtons
                    showNotStarted={state.showNotStarted}
                    onToggleNotStarted={() =>
                      dispatch({ type: "TOGGLE_NOT_STARTED" })
                    }
                    showWeakChapters={state.showWeakChapters}
                    onToggleWeakChapters={() =>
                      dispatch({ type: "TOGGLE_WEAK_CHAPTERS" })
                    }
                    filteredChaptersCount={filteredChapters.length}
                    sortAscending={state.sortAscending}
                    onToggleSort={() => dispatch({ type: "TOGGLE_SORT" })}
                    isMobile={state.isMobile}
                  />
                </div>
              </div>
            </div>
            <ChapterListDisplay
              chapters={filteredChapters}
              isMobile={state.isMobile}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChapterTracker;
