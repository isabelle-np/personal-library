import React, {
  useMemo,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabType } from "./tabs";
import { useTabKeyboardNavigation } from "../../hooks/useTabKeyboardNavigation";
import { useTabSwipeGestures } from "../../hooks/useTabSwipeGestures";

interface ResponsiveNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const ResponsiveNavigation =
  React.memo<ResponsiveNavigationProps>(
    ({ activeTab, onTabChange }) => {
      const scrollContainerRef = useRef<HTMLDivElement>(null);
      const tabContainerRef = useRef<HTMLDivElement>(null);
      const [showLeftIndicator, setShowLeftIndicator] =
        useState(false);
      const [showRightIndicator, setShowRightIndicator] =
        useState(false);
      const [canScroll, setCanScroll] = useState(false);

      // Add keyboard navigation and swipe gestures
      useTabKeyboardNavigation({ activeTab, onTabChange });
      useTabSwipeGestures({
        activeTab,
        onTabChange,
        containerRef: tabContainerRef as React.RefObject<HTMLDivElement>,
      });

      // Check scroll position and update indicators
      const updateScrollIndicators = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } =
          container;
        const maxScroll = scrollWidth - clientWidth;

        setCanScroll(maxScroll > 0);
        setShowLeftIndicator(scrollLeft > 5);
        setShowRightIndicator(scrollLeft < maxScroll - 5);
      }, []);

      // Handle scroll button clicks
      const scrollTabs = useCallback(
        (direction: "left" | "right") => {
          const container = scrollContainerRef.current;
          if (!container) return;

          const scrollAmount = 200;
          const newScrollLeft =
            direction === "left"
              ? container.scrollLeft - scrollAmount
              : container.scrollLeft + scrollAmount;

          container.scrollTo({
            left: newScrollLeft,
            behavior: "smooth",
          });
        },
        [],
      );

      // Scroll active tab into view
      const scrollToActiveTab = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const activeButton = container.querySelector(
          `[data-tab="${activeTab}"]`,
        ) as HTMLElement;
        if (!activeButton) return;

        const containerRect = container.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();

        const isVisible =
          buttonRect.left >= containerRect.left &&
          buttonRect.right <= containerRect.right;

        if (!isVisible) {
          const scrollOffset =
            buttonRect.left - containerRect.left - 20;
          container.scrollTo({
            left: container.scrollLeft + scrollOffset,
            behavior: "smooth",
          });
        }
      }, [activeTab]);

      // Update indicators on scroll
      useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        container.addEventListener(
          "scroll",
          updateScrollIndicators,
          { passive: true },
        );
        return () =>
          container.removeEventListener(
            "scroll",
            updateScrollIndicators,
          );
      }, [updateScrollIndicators]);

      // Update indicators on resize
      useEffect(() => {
        const handleResize = () => {
          updateScrollIndicators();
          scrollToActiveTab();
        };

        window.addEventListener("resize", handleResize);
        return () =>
          window.removeEventListener("resize", handleResize);
      }, [updateScrollIndicators, scrollToActiveTab]);

      // Initial setup and active tab changes
      useEffect(() => {
        updateScrollIndicators();
        scrollToActiveTab();
      }, [updateScrollIndicators, scrollToActiveTab]);

      const sectionId = useMemo(
        () =>
          `${activeTab.toLowerCase().replace(/\s+/g, "-").replace("&", "and")}-books-panel`,
        [activeTab],
      );

      const tabButtons = useMemo(() => {
        return Object.values(Tabs).map((tab) => {
          const isActive = activeTab === tab;
          const tabId = `${tab.toLowerCase().replace(/\s+/g, "-").replace("&", "and")}-books-tab`;

          return (
            <button
              key={tab}
              data-tab={tab}
              id={tabId}
              onClick={() => onTabChange(tab)}
              className={`
            flex-shrink-0 px-4 py-3 transition-all duration-200 ease-in-out
            library-tab-trigger  rounded-md
            ${
              isActive
                ? "bg-amber-800 text-amber-100 shadow-inner"
                : "text-amber-200 hover:text-amber-100 hover:bg-amber-900/20"
            }
          `}
              role="tab"
              aria-selected={isActive}
              aria-controls={sectionId}
              tabIndex={isActive ? 0 : -1}
            >
              <span className="whitespace-nowrap">{tab}</span>
            </button>
          );
        });
      }, [activeTab, onTabChange, sectionId]);

      return (
        <nav
          className="max-w-5xl mx-auto mb-8 sm:mb-12"
          role="navigation"
          aria-label="Book categories"
        >
          <div className="relative">
            {/* Left scroll indicator */}
            {canScroll && showLeftIndicator && (
              <button
                onClick={() => scrollTabs("left")}
                className="absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-stone-900 to-transparent 
                     flex items-center justify-start pl-2 opacity-80 hover:opacity-100 transition-opacity
                    "
                aria-label="Scroll tabs left"
              >
                <ChevronLeft className="w-5 h-5 text-amber-300" />
              </button>
            )}

            {/* Right scroll indicator */}
            {canScroll && showRightIndicator && (
              <button
                onClick={() => scrollTabs("right")}
                className="absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-stone-900 to-transparent 
                     flex items-center justify-end pr-2 opacity-80 hover:opacity-100 transition-opacity
                     "
                aria-label="Scroll tabs right"
              >
                <ChevronRight className="w-5 h-5 text-amber-300" />
              </button>
            )}

            {/* Tab container */}
            <div
              ref={tabContainerRef}
              className="library-tabs-list justify-center h-14 overflow-x-auto scrollbar-hide 
                   "
              role="tablist"
              aria-label="Book category tabs"
            >
              <div
                ref={scrollContainerRef}
                className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
                onScroll={updateScrollIndicators}
              >
                {tabButtons}
              </div>
            </div>
          </div>
        </nav>
      );
    },
  );

ResponsiveNavigation.displayName = "ResponsiveNavigation";