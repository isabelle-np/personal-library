import { describe, it, expect } from '@jest/globals';
import { getLibraryForBook } from '../../src/utils/libraryUtils';
import { LIBRARIES } from '../../src/data/libraries';

describe('getLibraryForBook', () => {
    it('should assign a library to a valid book title', () => {
        const bookTitle = 'The Great Gatsby';
        const library = getLibraryForBook(bookTitle);
        expect(library).toBeDefined();
        expect(LIBRARIES).toContain(library);
    });

    it('should throw an error if the book title is empty', () => {
        expect(() => getLibraryForBook('')).toThrow('Book title cannot be empty.');
    });

    it('should throw an error if the book title is only whitespace', () => {
        expect(() => getLibraryForBook('   ')).toThrow('Book title cannot be empty.');
    });

    it('should throw an error if no libraries are available', () => {
        const originalLibraries = [...LIBRARIES];
        LIBRARIES.length = 0; // Temporarily clear libraries

        expect(() => getLibraryForBook('The Great Gatsby')).toThrow('No libraries available for assignment.');

        LIBRARIES.push(...originalLibraries); // Restore libraries
    });

    it('should deterministically assign the same library for the same book title', () => {
        const bookTitle = '1984';
        const library1 = getLibraryForBook(bookTitle);
        const library2 = getLibraryForBook(bookTitle);
        expect(library1).toEqual(library2);
    });

    it('should assign different libraries for different book titles', () => {
        const library1 = getLibraryForBook('Book A');
        const library2 = getLibraryForBook('Book B');
        expect(library1).not.toEqual(library2);
    });
});