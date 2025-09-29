import React from 'react';
import { LibraryCard } from '../libraryCard/LibraryCard';
import { BaseCarousel, BaseCarouselContent, BaseCarouselItem, BaseCarouselNext, BaseCarouselPrevious } from '../base/carousel/BaseCarousel';
import { BaseCard, BaseCardContent } from '../base/card/BaseCard';
import { CAROUSEL_OPTIONS } from './carouselOptions';

interface BookCarouselSkeletonProps {
  category: string;
  itemCount?: number;
}

export const BookCarouselSkeleton = React.memo<BookCarouselSkeletonProps>(({ 
  category, 
  itemCount = 6 
}) => {
  const sectionId = React.useMemo(() => 
    `${category.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}-books-panel`,
    [category]
  );

  const ariaLabelledBy = React.useMemo(() => 
    `${category.toLowerCase().replace(/\s+/g, '-').replace('&', 'and')}-books-tab`,
    [category]
  );

  const skeletonItems = React.useMemo(() => 
    Array.from({ length: itemCount }).map((_, index) => (
      <BaseCarouselItem 
        key={`skeleton-${index}`} 
        className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3" 
        role="group" 
        aria-label="Loading book card"
      >
        <BaseCard className="bg-transparent border-none shadow-none">
            <BaseCardContent className="p-2">
            <LibraryCard loading={true} book={{ title: '', author: '', checkouts: [], category: '' }} />
            </BaseCardContent>
        </BaseCard>
      </BaseCarouselItem>
    )),
    [itemCount]
  );
  
  return (
    <section 
      className="mb-12 sm:mb-16" 
      id={sectionId}
      role="tabpanel" 
      aria-labelledby={ariaLabelledBy}
      aria-busy="true"
      aria-live="polite"
    >
      <h2 className="sr-only">{category} Books - Loading</h2>
      <BaseCarousel
        opts={CAROUSEL_OPTIONS}
        className="w-full"
        aria-label={`Loading ${category} book cards`}
      >
        <BaseCarouselContent 
          className="-ml-2 md:-ml-4" 
          role="group" 
          aria-label="Loading book cards"
        >
          {skeletonItems}
        </BaseCarouselContent>
        <BaseCarouselPrevious 
          className="hidden sm:flex -left-12 w-12 h-12 library-carousel-button opacity-50 cursor-not-allowed" 
          aria-label="Previous book cards"
          disabled
        />
        <BaseCarouselNext 
          className="hidden sm:flex -right-12 w-12 h-12 library-carousel-button opacity-50 cursor-not-allowed" 
          aria-label="Next book cards"
          disabled
        />
      </BaseCarousel>
    </section>
  );
});

BookCarouselSkeleton.displayName = 'BookCarouselSkeleton';