import {
  READ_BOOKS,
  CURRENTLY_READING_BOOKS,
  QUEUE_BOOKS,
  type Book,
} from "../data/books";
import { getLibraryForBook } from "../utils/libraryUtils";
import { FORM_NUMBER_BASE } from "../constants";
import type { TabType } from "../constants";

/**
 * Represents a collection of books with additional metadata.
 */
interface BookCollection {
  /**
   * Array of books in the collection.
   */
  books: Book[];

  /**
   * Function to generate a form number for a book based on its index.
   */
  formNumberGenerator: (index: number) => string;

  /**
   * ARIA label for accessibility purposes.
   */
  ariaLabel: string;
}

/**
 * Memoized collections of books categorized by tabs.
 * Used to optimize performance by avoiding redundant computations.
 */
const memoizedCollections = new Map<TabType, BookCollection>();

/**
 * Creates a unified collection of all books with embedded categories and library assignments.
 * @returns {Book[]} Array of all books with library assignments.
 */
export const createAllBooksCollection = (): Book[] => {
  const allBooks: Book[] = [];

  // Add books from categories with their category already embedded
  READ_BOOKS.forEach((category) => {
    const booksWithLibraries = category.books.map((book) => ({
      ...book,
      library: book.library || getLibraryForBook(book.title).shortName,
    }));
    allBooks.push(...booksWithLibraries);
  });

  // Add currently reading books with library assignments
  const currentlyReadingWithLibraries = CURRENTLY_READING_BOOKS.map((book) => ({
    ...book,
    library: book.library || getLibraryForBook(book.title).shortName,
  }));
  allBooks.push(...currentlyReadingWithLibraries);

  // Add queue books with library assignments
  const queueBooksWithLibraries = QUEUE_BOOKS.map((book) => ({
    ...book,
    library: book.library || getLibraryForBook(book.title).shortName,
  }));
  allBooks.push(...queueBooksWithLibraries);

  return allBooks;
};

// Pre-compute all books for "All" tab
const ALL_BOOKS: Book[] = createAllBooksCollection();

/**
 * Pre-computes a form number generator for the "All" tab.
 * @returns {(index: number) => string} Function to generate form numbers for books in the "All" tab.
 */
const createAllBooksFormGenerator = () => {
  const categoryOffsets: number[] = [];
  let offset = 0;

  // Track offsets for main categories
  for (const category of READ_BOOKS) {
    categoryOffsets.push(offset);
    offset += category.books.length;
  }

  // Add offsets for special categories
  const currentlyReadingOffset = offset;
  offset += CURRENTLY_READING_BOOKS.length;
  const queueOffset = offset;

  return (index: number) => {
    // Check main categories
    for (
      let categoryIndex = 0;
      categoryIndex < categoryOffsets.length;
      categoryIndex++
    ) {
      const currentOffset = categoryOffsets[categoryIndex];
      const nextOffset =
        categoryOffsets[categoryIndex + 1] ??
        currentlyReadingOffset;

      if (index >= currentOffset && index < nextOffset) {
        const bookIndex = index - currentOffset;
        return `${FORM_NUMBER_BASE + categoryIndex}${bookIndex}`;
      }
    }

    // Check currently reading
    if (
      index >= currentlyReadingOffset &&
      index < queueOffset
    ) {
      const bookIndex = index - currentlyReadingOffset;
      return `CR${bookIndex + 1}`;
    }

    // Check queue
    if (index >= queueOffset) {
      const bookIndex = index - queueOffset;
      return `Q${bookIndex + 1}`;
    }

    return `${FORM_NUMBER_BASE}${index}`;
  };
};

/**
 * Filters books by a specific category.
 * @param {Book[]} books - Array of books to filter.
 * @param {TabType} targetCategory - The target category to filter by.
 * @returns {Book[]} Array of books belonging to the target category.
 */
const getBooksByCategory = (
  books: Book[],
  targetCategory: TabType,
): Book[] => {
  if (targetCategory === "All") {
    return books;
  }
  return books.filter(
    (book) => book.category === targetCategory,
  );
};

/**
 * Initializes memoized collections for all tabs.
 * Pre-computes book collections and form number generators for each tab.
 */
const initializeCollections = () => {
  // All books collection
  memoizedCollections.set("All", {
    books: ALL_BOOKS,
    formNumberGenerator: createAllBooksFormGenerator(),
    ariaLabel: "All books carousel",
  });

  // Category-specific collections
  const tabs: TabType[] = [
    "Fiction",
    "Non-Fiction",
    "Business & Tech",
    "Currently Reading",
    "Queue",
  ];

  tabs.forEach((tab) => {
    const categoryBooks = getBooksByCategory(ALL_BOOKS, tab);

    // Generate appropriate form numbers based on category
    let formNumberGenerator: (index: number) => string;

    if (tab === "Currently Reading") {
      formNumberGenerator = (index: number) => `CR${index + 1}`;
    } else if (tab === "Queue") {
      formNumberGenerator = (index: number) => `Q${index + 1}`;
    } else {
      // For Fiction, Non-Fiction, Business & Tech
      const categoryIndex = READ_BOOKS.findIndex(
        (cat) => cat.name === tab,
      );
      formNumberGenerator = (index: number) =>
        `${FORM_NUMBER_BASE + categoryIndex}${index}`;
    }

    memoizedCollections.set(tab, {
      books: categoryBooks,
      formNumberGenerator,
      ariaLabel: `${tab} books carousel`,
    });
  });
};

// Initialize collections on module load
initializeCollections();

/**
 * Retrieves the book collection for a specific tab.
 * @param {TabType} tab - The tab to retrieve the book collection for.
 * @returns {BookCollection} The book collection for the specified tab.
 */
export function getBooksForTab(tab: TabType): BookCollection {
  const cached = memoizedCollections.get(tab);
  if (cached) {
    return cached;
  }

  // Fallback for any unexpected tabs
  return {
    books: [],
    formNumberGenerator: (index: number) =>
      `${FORM_NUMBER_BASE}${index}`,
    ariaLabel: "Books carousel",
  };
}

/**
 * Retrieves the size of the memoized collections cache.
 * @returns {number} The number of memoized collections.
 */
export const getCollectionCacheSize = () =>
  memoizedCollections.size;

/**
 * Retrieves all books in the "All" tab.
 * @returns {Book[]} Array of all books.
 */
export const getAllBooks = () => ALL_BOOKS;

/**
 * Verifies the integrity of book data.
 * @returns {object} An object containing verification results, including errors and counts.
 */
export const verifyBookCategories = () => {
  const results = {
    totalBooks: ALL_BOOKS.length,
    booksWithoutCategory: ALL_BOOKS.filter(
      (book) => !book.category,
    ),
    booksWithoutLibrary: ALL_BOOKS.filter(
      (book) => !book.library,
    ),
    categoryCounts: {} as Record<string, number>,
    libraryCounts: {} as Record<string, number>,
    errors: [] as string[],
  };

  // Count books by category and library
  ALL_BOOKS.forEach((book) => {
    if (book.category) {
      results.categoryCounts[book.category] =
        (results.categoryCounts[book.category] || 0) + 1;
    } else {
      results.errors.push(
        `Book \"${book.title}\" by ${book.author} is missing category`,
      );
    }

    if (book.library) {
      results.libraryCounts[book.library] =
        (results.libraryCounts[book.library] || 0) + 1;
    } else {
      results.errors.push(
        `Book \"${book.title}\" by ${book.author} is missing library assignment`,
      );
    }
  });

  return results;
};