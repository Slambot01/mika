// hooks/useChapterReducer.js

// Initial state for filters and UI toggles
export const initialState = {
  activeSubject: "Physics",
  selectedClasses: [],
  selectedUnits: [],
  showClassDropdown: false,
  showUnitDropdown: false,
  sortAscending: true,
  showWeakChapters: false,
  showNotStarted: false,
  isDarkMode: false, // Default to false, will be initialized from localStorage/system
  isMobile: false,
};

// Reducer function to manage state changes
export function reducer(state, action) {
  switch (action.type) {
    case "SET_ACTIVE_SUBJECT":
      return {
        ...state,
        activeSubject: action.payload,
        selectedClasses: [], // Reset filters on subject change
        selectedUnits: [],
        showClassDropdown: false, // Close dropdowns on subject change
        showUnitDropdown: false,
      };
    case "TOGGLE_CLASS_DROPDOWN":
      return {
        ...state,
        showClassDropdown: !state.showClassDropdown,
        showUnitDropdown: false,
      }; // Close other dropdown
    case "TOGGLE_UNIT_DROPDOWN":
      return {
        ...state,
        showUnitDropdown: !state.showUnitDropdown,
        showClassDropdown: false,
      }; // Close other dropdown
    case "TOGGLE_CLASS":
      return {
        ...state,
        selectedClasses: state.selectedClasses.includes(action.payload)
          ? state.selectedClasses.filter((c) => c !== action.payload)
          : [...state.selectedClasses, action.payload],
      };
    case "TOGGLE_UNIT":
      return {
        ...state,
        selectedUnits: state.selectedUnits.includes(action.payload)
          ? state.selectedUnits.filter((u) => u !== action.payload)
          : [...state.selectedUnits, action.payload],
      };
    case "TOGGLE_SORT":
      return { ...state, sortAscending: !state.sortAscending };
    case "TOGGLE_WEAK_CHAPTERS":
      return { ...state, showWeakChapters: !state.showWeakChapters };
    case "TOGGLE_NOT_STARTED":
      return { ...state, showNotStarted: !state.showNotStarted };
    case "TOGGLE_DARK_MODE":
      // Invert dark mode state and store preference
      const newDarkModeState = !state.isDarkMode;
      if (typeof window !== "undefined") {
        // Ensure localStorage is available (client-side)
        localStorage.setItem("darkMode", newDarkModeState ? "true" : "false");
      }
      return { ...state, isDarkMode: newDarkModeState };
    case "CLOSE_DROPDOWNS":
      return { ...state, showClassDropdown: false, showUnitDropdown: false };
    case "SET_MOBILE":
      return { ...state, isMobile: action.payload };
    case "INIT_DARK_MODE":
      // Initialize dark mode from local storage or system preference
      if (typeof window !== "undefined") {
        // Ensure localStorage/window is available
        const storedDarkMode = localStorage.getItem("darkMode");
        if (storedDarkMode !== null) {
          return { ...state, isDarkMode: storedDarkMode === "true" };
        }
        // Fallback to system preference if no stored value
        return {
          ...state,
          isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
        };
      }
      return state; // Return current state if window is not defined (server-side render)
    default:
      return state;
  }
}
