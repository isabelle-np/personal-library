import React, { useCallback } from 'react';

interface SkipToContentProps {
  onSkip: () => void;
}

export const SkipToContent = React.memo<SkipToContentProps>(({ onSkip }) => {
  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onSkip();
  }, [onSkip]);

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-amber-100 text-stone-900 px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 skip-to-content"
    >
      Skip to main content
    </a>
  );
});

SkipToContent.displayName = 'SkipToContent';