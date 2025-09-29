import { useCallback, useEffect, useRef } from 'react';
import { Tabs, TabType } from '../components/navigation/tabs';

interface UseTabSwipeGesturesProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export function useTabSwipeGestures({ activeTab, onTabChange, containerRef }: UseTabSwipeGesturesProps) {
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    const touch = event.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
    isDragging.current = false;
  }, []);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!containerRef.current) return;

    const touch = event.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartX.current);
    const deltaY = Math.abs(touch.clientY - touchStartY.current);

    // If horizontal movement is greater than vertical, prevent vertical scroll
    if (deltaX > deltaY && deltaX > 10) {
      isDragging.current = true;
      event.preventDefault();
    }
  }, [containerRef]);

  const handleTouchEnd = useCallback((event: TouchEvent) => {
    if (!isDragging.current) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = Math.abs(touch.clientY - touchStartY.current);
    
    // Only trigger swipe if horizontal movement is significant and vertical is minimal
    if (Math.abs(deltaX) > 50 && deltaY < 100) {
      const currentIndex = Tabs.indexOf(activeTab);
      let nextIndex = currentIndex;

      if (deltaX > 0 && currentIndex > 0) {
        // Swipe right - go to previous tab
        nextIndex = currentIndex - 1;
      } else if (deltaX < 0 && currentIndex < Tabs.length - 1) {
        // Swipe left - go to next tab
        nextIndex = currentIndex + 1;
      }

      if (nextIndex !== currentIndex) {
        onTabChange(Tabs[nextIndex]);
      }
    }

    isDragging.current = false;
  }, [activeTab, onTabChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add passive listeners for better performance
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, containerRef]);

  return { isDragging: isDragging.current };
}