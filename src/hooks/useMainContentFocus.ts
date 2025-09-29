import { useRef } from 'react';

export function useMainContentFocus() {
  const mainContentRef = useRef<HTMLDivElement>(null);

  const skipToMainContent = () => {
    mainContentRef.current?.focus();
  };

  return {
    mainContentRef,
    skipToMainContent
  };
}