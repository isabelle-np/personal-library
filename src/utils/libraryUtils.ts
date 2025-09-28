import { Library, LIBRARIES } from '../data/libraries';

/**
 * Assigns a library to a book title using a deterministic hashing algorithm.
 *
 * @param bookTitle The title of the book to assign a library to.
 * @returns The library assigned to the given book title.
 * @throws If the book title is empty or if no libraries are available.
 *
 * @example
 * const library = getLibraryForBook('The Great Gatsby');
 * console.log(library.name); // Outputs the name of the assigned library.
 */
export function getLibraryForBook(bookTitle: string): Library {
  // Validate input.
  if (!bookTitle || bookTitle.trim() === '') {
    throw new Error('Book title cannot be empty.');
  }

  // Ensure libraries array is not empty.
  if (LIBRARIES.length === 0) {
    throw new Error('No libraries available for assignment.');
  }

  // Create a simple hash from the book title for consistent assignment.
  let hash = 0;
  for (let i = 0; i < bookTitle.length; i++) {
    const char = bookTitle.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer.
  }

  // Use the hash to select a library.
  const libraryIndex = Math.abs(hash) % LIBRARIES.length;
  return LIBRARIES[libraryIndex];
}