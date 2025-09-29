import React from 'react';

export const Header = () => {
  return (
    <header className="text-center mb-8 sm:mb-12" role="banner">
      <h1 className="mb-4 drop-shadow-lg library-main-title">
        Isabelle's Library
      </h1>
      <p className="max-w-2xl mx-auto library-subtitle">
        A COLLECTION OF MY FAVORITE BOOKS, WHAT I'M CURRENTLY READING,
        AND WHAT'S NEXT IN MY QUEUE.
      </p>
    </header>
  );
};