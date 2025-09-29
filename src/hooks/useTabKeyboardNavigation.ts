import { useCallback, useEffect } from 'react';
import { Tabs, TabType } from '../components/navigation/tabs';

interface UseTabKeyboardNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function useTabKeyboardNavigation({ activeTab, onTabChange }: UseTabKeyboardNavigationProps) {
  const tabValues = Object.values(Tabs);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Only handle keyboard events when focus is on a tab
    const target = event.target as HTMLElement;
    if (!target.hasAttribute('role') || target.getAttribute('role') !== 'tab') {
      return;
    }

    const currentIndex = tabValues.indexOf(activeTab);
    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : tabValues.length - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        nextIndex = currentIndex < tabValues.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        nextIndex = tabValues.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex !== currentIndex) {
      onTabChange(tabValues[nextIndex]);

      // Focus the new tab after a brief delay to allow for state updates
      setTimeout(() => {
        const newTab = tabValues[nextIndex];
        const tabId = `${newTab.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}-books-tab`;
        const tabElement = document.getElementById(tabId);
        if (tabElement) {
          tabElement.focus();
        }
      }, 10);
    }
  }, [activeTab, onTabChange, tabValues]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { handleKeyDown };
}