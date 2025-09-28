import { describe, it, expect } from '@jest/globals';
import {
  createAllBooksCollection,
  getBooksForTab,
  verifyBookCategories,
} from '../src/utils/bookUtils';
import { READ_BOOKS, CURRENTLY_READING_BOOKS, QUEUE_BOOKS } from '../src/data/books';
import { getLibraryForBook } from '../src/utils/libraryUtils';

describe('bookUtils', () => {
  describe('createAllBooksCollection', () => {
    it('creates a unified collection of all books with library assignments', () => {
      const allBooks = createAllBooksCollection();

      // Validate books from READ_BOOKS
      READ_BOOKS.forEach((category) => {
        category.books.forEach((book) => {
          const foundBook = allBooks.find((b) => b.title === book.title);
          expect(foundBook).toBeDefined();
          expect(foundBook?.library).toBe(
            book.library || getLibraryForBook(book.title).shortName
          );
        });
      });

      // Validate books from CURRENTLY_READING_BOOKS
      CURRENTLY_READING_BOOKS.forEach((book) => {
        const foundBook = allBooks.find((b) => b.title === book.title);
        expect(foundBook).toBeDefined();
        expect(foundBook?.library).toBe(
          book.library || getLibraryForBook(book.title).shortName
        );
      });

      // Validate books from QUEUE_BOOKS
      QUEUE_BOOKS.forEach((book) => {
        const foundBook = allBooks.find((b) => b.title === book.title);
        expect(foundBook).toBeDefined();
        expect(foundBook?.library).toBe(
          book.library || getLibraryForBook(book.title).shortName
        );
      });
    });

    it('returns an empty array when there are no books', () => {
      // Mock empty data
      const originalReadBooks = [...READ_BOOKS];
      const originalCurrentlyReading = [...CURRENTLY_READING_BOOKS];
      const originalQueueBooks = [...QUEUE_BOOKS];

      READ_BOOKS.length = 0;
      CURRENTLY_READING_BOOKS.length = 0;
      QUEUE_BOOKS.length = 0;

      const allBooks = createAllBooksCollection();
      expect(allBooks).toEqual([]);

      // Restore original data
      READ_BOOKS.push(...originalReadBooks);
      CURRENTLY_READING_BOOKS.push(...originalCurrentlyReading);
      QUEUE_BOOKS.push(...originalQueueBooks);
    });
  });

  describe('getBooksForTab', () => {
    it('returns all books for the "All" tab', () => {
      const allBooks = getBooksForTab('All');
      expect(allBooks.books.length).toBeGreaterThan(0);
    });

    it('filters books by category for specific tabs', () => {
      const fictionBooks = getBooksForTab('Fiction');
      fictionBooks.books.forEach((book) => {
        expect(book.category).toBe('Fiction');
      });
    });
  });

  describe('verifyBookCategories', () => {
    it('verifies the integrity of book data', () => {
      const results = verifyBookCategories();

      // Validate totalBooks count
      const totalBooks =
        READ_BOOKS.reduce((sum, category) => sum + category.books.length, 0) +
        CURRENTLY_READING_BOOKS.length +
        QUEUE_BOOKS.length;
      expect(results.totalBooks).toBe(totalBooks);

      // Validate no books without categories or libraries
      expect(results.booksWithoutCategory.length).toBe(0);
      expect(results.booksWithoutLibrary.length).toBe(0);

      // Validate category and library counts
      READ_BOOKS.forEach((category) => {
        expect(results.categoryCounts[category.name]).toBe(
          category.books.length
        );
      });
    });
  });
});