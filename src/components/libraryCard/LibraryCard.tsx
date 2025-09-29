import React from 'react';
import type { Book } from '../../data/books';
import { LIBRARIES } from '../../data/libraries';
import { getStampColor, getRandomOffset, getRandomRotation, getTypewriterFont, DEFAULT_LIBRARY } from '../../utils/cardUtils';
import { FORM_NUMBER_BASE } from "./formConstants";

// Define the props for the LibraryCard component using TypeScript interface
interface LibraryCardProps {
  book: Book; // The book object containing details about the book
  formNumber?: string; // The form number associated with the library card
  cardId?: string; // The unique identifier for the card
  category?: string; // The category of the book
  loading?: boolean; // Indicates whether the card is in a loading state
}

/**
 * A skeleton component for the LibraryCard, used to display a loading state.
 * @returns {JSX.Element} The rendered LibraryCardSkeleton component.
 */
export function LibraryCardSkeleton() {
  return (
    <div 
      className="w-full max-w-md mx-auto bg-stone-50 border-2 border-stone-200 shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300 cursor-pointer hover:shadow-xl"
      role="button"
    >
      <div className="bg-stone-100 border-b border-stone-300 p-3">
        <div className="flex justify-between items-center mb-2">
          <div className="h-4 w-12 library-skeleton rounded" />
          <div className="h-5 w-32 library-skeleton rounded" />
          <div className="h-5 w-8 library-skeleton rounded" />
        </div>
      </div>
      <div className="p-4 bg-stone-50">
        <div className="mb-4">
          <div className="h-3 w-12 library-skeleton rounded mb-1" />
          <div className="h-4 w-full library-skeleton rounded mb-2" />
          <div className="h-3 w-8 library-skeleton rounded mb-1" />
          <div className="h-4 w-4/5 library-skeleton rounded" />
        </div>
        <div className="border-t-2 border-b border-gray-400 py-2 mb-2">
          <div className="grid grid-cols-2 text-sm">
            <div className="h-4 w-8 library-skeleton rounded mx-auto" />
            <div className="h-4 w-16 library-skeleton rounded mx-auto" />
          </div>
        </div>
        <div className="space-y-1">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="grid grid-cols-2 py-1 border-b border-gray-300">
              <div className="px-2">
                <div className="h-4 w-16 library-skeleton rounded" />
              </div>
              <div className="px-2">
                <div className="h-4 w-12 library-skeleton rounded" />
              </div>
            </div>
          ))}
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={`empty-${index}`} className="grid grid-cols-2 py-2 border-b border-gray-300">
              <div className="px-2"></div>
              <div className="px-2"></div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-400">
          <div className="text-center">
            <div className="h-3 w-24 library-skeleton rounded mx-auto mb-2" />
            <div className="h-3 w-full library-skeleton rounded mb-1" />
            <div className="h-3 w-3/4 library-skeleton rounded mx-auto" />
          </div>
        </div>
        <div className="mt-4 pt-2 border-t border-gray-400">
          <div className="text-center">
            <div className="h-3 w-32 library-skeleton rounded mx-auto mb-1" />
            <div className="h-3 w-48 library-skeleton rounded mx-auto" />
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-2 w-8 h-8 bg-stone-200 rounded-full opacity-30"></div>
      <div className="absolute bottom-4 left-3 w-6 h-6 bg-stone-300 rounded-full opacity-20"></div>
    </div>
  );
}

/**
 * A component that renders a library card for a book. Displays book details, checkouts, and additional information.
 * @param {LibraryCardProps} props - The props for the LibraryCard component.
 * @param {Book} props.book - The book object containing details about the book.
 * @param {string} [props.formNumber="76"] - The form number associated with the library card.
 * @param {string} [props.cardId] - The unique identifier for the card.
 * @param {string} [props.category] - The category of the book.
 * @param {boolean} [props.loading=false] - Indicates whether the card is in a loading state.
 * @returns {JSX.Element} The rendered LibraryCard component.
 */
export function LibraryCard({ book, formNumber = "76", cardId, category, loading = false }: LibraryCardProps) {
  if (loading) {
    return <LibraryCardSkeleton />;
  }

  // Added error handling for undefined book properties
  const effectiveCategory = book?.category || category || "B";
  const assignedLibrary = book?.library ? 
    LIBRARIES.find(lib => lib.shortName === book.library) : 
    LIBRARIES[0]; // fallback to Library of Congress

  // Memoize utility functions to improve performance
  const memoizedGetRandomOffset = React.useCallback(getRandomOffset, []);
  const memoizedGetRandomRotation = React.useCallback(getRandomRotation, []);
  const memoizedGetTypewriterFont = React.useCallback(getTypewriterFont, []);

  /**
   * Handles the click event for the library card. Opens the book's Goodreads URL in a new tab.
   */
  const handleCardClick = () => {
    window.open(book.goodreadsUrl, '_blank', 'noopener,noreferrer');
  };

  // Extract onKeyDown handler into a separate function
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleCardClick();
    }
  };

  // Define a constant for the maximum number of checkout rows
  const MAX_CHECKOUT_ROWS = 8;

  // Replace magic number with the constant
  const emptyRows = Math.max(0, MAX_CHECKOUT_ROWS - (book?.checkouts?.length || 0));

  // Add a fallback check for book.checkouts to ensure it is defined and an array
  const checkouts = Array.isArray(book.checkouts) ? book.checkouts : [];

  return (
    <div 
      className="w-full max-w-md mx-auto bg-stone-50 border-2 border-stone-200 shadow-lg transform rotate-1 hover:rotate-0 transition-transform duration-300 cursor-pointer hover:shadow-xl"
      style={{ textDecoration: 'none' }}
      onClick={handleCardClick}
      role="button"
      aria-label={`Open details for ${book.title} by ${book.author}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Card Header */}
      <div className="bg-stone-100 border-b border-stone-300 p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600" style={{ fontFamily: "'Courier New', Courier, monospace" }}>{effectiveCategory}</span>
          <span className="text-lg tracking-wider text-gray-800" style={{ fontFamily: "'American Typewriter', 'Courier New', monospace" }}>Library Book Card</span>
          <span className="text-lg text-gray-700" style={{ fontFamily: "'Consolas', 'Courier New', monospace" }}>{book.deweyNumber || "780"}</span>
        </div>
      </div>

      {/* Book Information */}
      <div className="p-4 bg-stone-50">
        <div className="mb-4">
          <div className="text-gray-700 text-sm mb-1" style={{ fontFamily: "'Lucida Console', 'Courier New', monospace" }}>Author:</div>
          <div className="text-gray-800 border-b border-gray-400 pb-1 mb-2" style={{ fontFamily: "'American Typewriter', 'Courier New', monospace" }}>
            {book.author}
          </div>
          <div className="text-gray-700 text-sm mb-1" style={{ fontFamily: "'Lucida Console', 'Courier New', monospace" }}>Title:</div>
          <div className="text-gray-800 border-b border-gray-400 pb-1" style={{ fontFamily: "'American Typewriter', 'Courier New', monospace" }}>
            {book.title}
          </div>
        </div>

        {/* Checkout Table Header */}
        <div className="border-t-2 border-b border-gray-400 py-2 mb-2">
          <div className="grid grid-cols-2 text-sm text-gray-700">
            <div className="text-center border-r border-gray-400" style={{ fontFamily: "'Courier New', Courier, monospace" }}>DATE</div>
            <div className="text-center" style={{ fontFamily: "'Courier New', Courier, monospace" }}>ISSUED TO</div>
          </div>
        </div>

        {/* Checkout Records */}
        <div className="space-y-1">
          {checkouts.map((checkout, index) => {
            const xOffset = memoizedGetRandomOffset(checkout.date, 'x');
            const yOffset = memoizedGetRandomOffset(checkout.date, 'y');
            const rotation = memoizedGetRandomRotation(checkout.date);
            const typewriterFont = memoizedGetTypewriterFont(checkout.date);
            return (
              <div key={index} className="grid grid-cols-2 py-1 border-b border-gray-300">
                <div 
                  className={`text-sm ${getStampColor(checkout.color)} px-2 relative`}
                  style={{
                    transform: `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`,
                    fontFamily: typewriterFont,
                  }}
                >
                  {checkout.date}
                </div>
                <div className="text-sm text-gray-700 px-2 italic" style={{ fontFamily: "'Monaco', 'Courier New', monospace" }}>
                  {checkout.borrower || ""}
                </div>
              </div>
            );
          })}
          {/* Empty rows for authenticity */}
          {Array.from({ length: emptyRows }).map((_, index) => (
            <div key={`empty-${index}`} className="grid grid-cols-2 py-2 border-b border-gray-300">
              <div className="px-2"></div>
              <div className="px-2"></div>
            </div>
          ))}
        </div>

        {/* Quote Section */}
        {book.quote && (
          <div className="mt-4 pt-3 border-t border-gray-400">
            <div className="text-center">
              <div className="text-gray-600 text-xs mb-2 italic" style={{ fontFamily: "'Consolas', 'Courier New', monospace" }}>
                NOTABLE PASSAGE
              </div>
              <div className="text-gray-800 text-sm italic leading-relaxed px-2" style={{ fontFamily: "'Monaco', 'Courier New', monospace" }}>
                "{book.quote}"
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-2 border-t border-gray-400">
          <div className="text-xs text-gray-600 text-center" style={{ fontFamily: "'Consolas', 'Courier New', monospace" }}>
            {assignedLibrary?.name || DEFAULT_LIBRARY.name}
            <br />
            {assignedLibrary?.address || DEFAULT_LIBRARY.address}
          </div>
        </div>
      </div>

      {/* Aging effects */}
      <div className="absolute top-2 right-2 w-8 h-8 bg-stone-200 rounded-full opacity-30"></div>
      <div className="absolute bottom-4 left-3 w-6 h-6 bg-stone-300 rounded-full opacity-20"></div>
    </div>
  );
}