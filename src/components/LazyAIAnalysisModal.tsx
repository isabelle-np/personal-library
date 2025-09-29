import React, { Suspense, lazy } from 'react';

// Lazy load the AI Analysis Modal since it's only needed when clicked
const AIAnalysisModal = lazy(() =>
  import('./AIAnalysisModal').then((module) => ({ default: module.AIAnalysisModal }))
);

interface LazyAIAnalysisModalProps {
  open: boolean;
  onClose: () => void;
}

export const LazyAIAnalysisModal = React.memo<LazyAIAnalysisModalProps>(({ open, onClose }) => {
  // Only render when needed
  if (!open) return null;

  return (
    <Suspense fallback={<div className="sr-only">Loading analysis...</div>}>
      <AIAnalysisModal open={open} onClose={onClose} />
    </Suspense>
  );
});

LazyAIAnalysisModal.displayName = 'LazyAIAnalysisModal';