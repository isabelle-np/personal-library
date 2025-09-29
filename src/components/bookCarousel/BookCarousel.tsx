import React, { useMemo } from 'react';
import { LibraryCard } from '../libraryCard/LibraryCard';
import { BaseCarousel, BaseCarouselContent, BaseCarouselItem, BaseCarouselNext, BaseCarouselPrevious } from '../base/carousel/BaseCarousel';
import { BaseCard, BaseCardContent } from '../base/card/BaseCard';
import { CAROUSEL_OPTIONS } from "./carouselOptions";
import type { Book } from '../../data/books';

interface BookCarouselProps {
  books: Book[];
  category: string;
  formNumberGenerator: (index: number) => string;
  ariaLabel: string;
}

export const BookCarousel = React.memo<BookCarouselProps>(({ 
  books, 
  category, 
  formNumberGenerator, 
  ariaLabel 
}) => {
  const sectionId = useMemo(() => 
    `${category.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}-books-panel`,
    [category]
  );

  const ariaLabelledBy = useMemo(() => 
    `${category.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}-books-tab`,
    [category]
  );

  const bookItems = useMemo(() => 
    books.map((book, index) => {
      // Use book's embedded category for unique keys and IDs, fallback to prop category
      const bookCategory = book.category || category;
      const uniqueKey = `${bookCategory}-${book.title.replace(/\s+/g, '-')}-${index}`;
      const cardId = `${bookCategory}-${index}`;
      
      return (
        <BaseCarouselItem 
          key={uniqueKey} 
          className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3" 
          role="group" 
          aria-label={`${book.title} by ${book.author}`}
        >
          <BaseCard className="bg-transparent border-none shadow-none">
            <BaseCardContent className="p-2">
              <LibraryCard 
                book={book} 
                formNumber={formNumberGenerator(index)}
                cardId={cardId}
                category={bookCategory}
              />
            </BaseCardContent>
          </BaseCard>
        </BaseCarouselItem>
      );
    }),
    [books, category, formNumberGenerator]
  );
  
  return (
    <section 
      className="mb-12 sm:mb-16" 
      id={sectionId}
      role="tabpanel" 
      aria-labelledby={ariaLabelledBy}
    >
      <h2 className="sr-only">{category} Books</h2>
      <BaseCarousel
        opts={CAROUSEL_OPTIONS}
        className="w-full"
        aria-label={ariaLabel}
      >
        <BaseCarouselContent 
          className="-ml-2 md:-ml-4" 
          role="group" 
          aria-label={`${category} book cards`}
        >
          {bookItems}
        </BaseCarouselContent>
        <BaseCarouselPrevious 
          className="hidden sm:flex -left-12 w-12 h-12 library-carousel-button" 
          aria-label="Previous book cards"
        />
        <BaseCarouselNext 
          className="hidden sm:flex -right-12 w-12 h-12 library-carousel-button" 
          aria-label="Next book cards"
        />
      </BaseCarousel>
    </section>
  );
});

BookCarousel.displayName = 'BookCarousel';