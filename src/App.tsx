import React, { useState, useMemo } from "react";
import { Header } from "./components/Header";
import { ResponsiveNavigation } from "./components/navigation/ResponsiveNavigation";
import { BookCarousel } from "./components/bookCarousel/BookCarousel";
import { BookCarouselSkeleton } from "./components/bookCarousel/BookCarouselSkeleton";
import { Footer } from "./components/Footer";
import { SkipToContent } from "./components/navigation/SkipToContent";
import { FloatingActionButton } from "./components/aiAnalysis/FloatingActionButton";
import { LazyAIAnalysisModal } from "./components/aiAnalysis/LazyAIAnalysisModal";
import { useMainContentFocus } from "./hooks/useMainContentFocus";
import { useLoadingState } from "./hooks/useLoadingState";
import { getBooksForTab } from "./utils/bookUtils";
import type { TabType } from "./components/navigation/tabs";

/**
 * The main application component for the personal library app.
 * 
 * @returns {JSX.Element} The rendered application component.
 */
export default function App() {
  /**
   * The currently active tab in the application.
   * @type {[TabType, React.Dispatch<React.SetStateAction<TabType>>]}
   */
  const [activeTab, setActiveTab] = useState<TabType>("All");

  /**
   * State to control the visibility of the AI Analysis Modal.
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  /**
   * Custom hook to manage focus for the main content area.
   * @returns {Object} An object containing the main content ref and a function to skip to it.
   */
  const { mainContentRef, skipToMainContent } = useMainContentFocus();

  /**
   * Custom hook to manage the loading state of the application.
   * @returns {Object} An object containing the loading state and a function to start loading.
   */
  const { isLoading, startLoading } = useLoadingState({
    initialDelay: 800,
    transitionDelay: 500,
  });

  /**
   * Handles the click event to open the AI Analysis Modal.
   */
  const handleAnalysisClick = () => {
    setShowAnalysisModal(true);
  };

  /**
   * Closes the AI Analysis Modal.
   */
  const closeAnalysisModal = () => {
    setShowAnalysisModal(false);
  };

  /**
   * Handles tab changes in the navigation.
   * 
   * @param {TabType} tab - The new tab to activate.
   */
  const handleTabChange = (tab: TabType) => {
    try {
      startLoading();
      setActiveTab(tab);
    } catch (error) {
      console.error("Error changing tab:", error);
    }
  };

  /**
   * Fetches book data for the currently active tab.
   * 
   * @returns {Object} An object containing books, a form number generator, and an aria label.
   */
  const bookData = useMemo(() => {
    try {
      return getBooksForTab(activeTab);
    } catch (error) {
      console.error("Error fetching books for tab:", error);
      return { books: [], formNumberGenerator: () => "", ariaLabel: "" };
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 library-app-background">
      <SkipToContent onSkip={skipToMainContent} />
      <FloatingActionButton onClick={handleAnalysisClick} />

      <Header />

      <ResponsiveNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <main
        className="max-w-7xl mx-auto"
        ref={mainContentRef}
        tabIndex={2}
        id="main-content"
        role="main"
        aria-label="Book collection"
      >
        {isLoading ? (
          <BookCarouselSkeleton category={activeTab} itemCount={6} />
        ) : (
          <BookCarousel
            books={bookData.books}
            category={activeTab}
            formNumberGenerator={bookData.formNumberGenerator}
            ariaLabel={bookData.ariaLabel}
          />
        )}
      </main>

      <Footer />

      <LazyAIAnalysisModal
        open={showAnalysisModal}
        onClose={closeAnalysisModal}
      />
    </div>
  );
}