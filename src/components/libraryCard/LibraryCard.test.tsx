import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LibraryCard, LibraryCardSkeleton } from './LibraryCard';
import type { Book } from '../../data/books'; 
import '@testing-library/jest-dom';

describe('LibraryCardSkeleton', () => {
  it('renders the skeleton component correctly', () => {
    render(<LibraryCardSkeleton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('LibraryCard', () => {
  const mockBook: Book = {
    title: 'Test Book',
    author: 'Test Author',
    category: 'Fiction',
    library: 'LOC',
    goodreadsUrl: 'https://goodreads.com/test-book',
    checkouts: [
      { date: '2025-09-01', borrower: 'John Doe', color: 'red' },
      { date: '2025-09-15', borrower: 'Jane Smith', color: 'blue' },
    ],
    quote: 'This is a test quote.',
    deweyNumber: '123.45',
  };

  it('renders the library card with book details', () => {
    render(<LibraryCard book={mockBook} />);

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('123.45')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('renders the skeleton when loading is true', () => {
    render(<LibraryCard book={mockBook} loading={true} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events to open Goodreads URL', () => {
    window.open = jest.fn();
    render(<LibraryCard book={mockBook} />);

    fireEvent.click(screen.getByRole('button'));
    expect(window.open).toHaveBeenCalledWith('https://goodreads.com/test-book', '_blank', 'noopener,noreferrer');
  });

  it('renders fallback values when book properties are missing', () => {
    const incompleteBook = { title: 'Incomplete Book', author: 'Unknown Author' } as Book;
    render(<LibraryCard book={incompleteBook} />);

    expect(screen.getByText('Incomplete Book')).toBeInTheDocument();
    expect(screen.getByText('Unknown Author')).toBeInTheDocument();
    expect(screen.getByText('780')).toBeInTheDocument(); // Default Dewey number
  });
});