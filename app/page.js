// app/page.js
import ChapterTracker from "@/app/ChapterTracker"; // Adjust path if ChapterTracker.jsx is in a different location relative to app/

/**
 * This is the root page component for your application.
 * It renders the main ChapterTracker application.
 *
 * It must be a default export of a React component.
 */
export default function HomePage() {
  return <ChapterTracker />;
}
