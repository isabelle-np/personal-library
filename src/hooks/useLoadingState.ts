import { useState, useEffect, useCallback } from 'react';

interface UseLoadingStateOptions {
  initialDelay?: number;
  transitionDelay?: number;
}

export function useLoadingState(options: UseLoadingStateOptions = {}) {
  const { initialDelay = 800, transitionDelay = 500 } = options;
  const [isLoading, setIsLoading] = useState(true);
  const [loadingKey, setLoadingKey] = useState(0);

  // Handle initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay]);

  // Function to trigger loading for transitions
  const startLoading = useCallback(() => {
    setIsLoading(true);
    setLoadingKey(prev => prev + 1);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, transitionDelay);

    return () => clearTimeout(timer);
  }, [transitionDelay]);

  // Function to stop loading immediately
  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    startLoading,
    stopLoading,
    loadingKey
  };
}