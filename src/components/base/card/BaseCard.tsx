import * as React from 'react';
import {cn} from '../../../utils/classNameUtils';
import {cva} from 'class-variance-authority';

// Extend the cardVariants to include additional styles found in LibraryCard and LibraryCardSkeleton
const cardVariants = cva(
    'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border',
    {
      variants: {
        padding: {
          default: 'p-6',
          none: 'p-0',
        },
        background: {
          default: 'bg-card',
          stone50: 'bg-stone-50',
          stone100: 'bg-stone-100',
        },
        border: {
          default: 'border',
          stone200: 'border-2 border-stone-200',
          stone300: 'border-b border-stone-300',
        },
        shadow: {
          none: 'shadow-none',
          default: 'shadow-lg',
          hover: 'hover:shadow-xl',
        },
        transform: {
          default: 'transform',
          rotate1: 'rotate-1',
          hoverRotate: 'hover:rotate-0',
        },
      },
      defaultVariants: {
        padding: 'default',
        background: 'default',
        border: 'default',
        shadow: 'none',
        transform: 'default',
      },
    }
);

const cardHeaderVariants = cva(
    '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6'
);

const cardTitleVariants = cva('leading-none');

const cardDescriptionVariants = cva('text-muted-foreground');

const cardActionVariants = cva(
    'col-start-2 row-span-2 row-start-1 self-start justify-self-end'
);

const cardContentVariants = cva('px-6 [&:last-child]:pb-6');

const cardFooterVariants = cva('flex items-center px-6 pb-6 [.border-t]:pt-6');

/**
 * BaseCard component serves as a container with customizable padding and styles.
 * @param {string} className - Additional class names to apply.
 * @param {"default" | "none"} [padding="default"] - Padding variant for the card.
 * @param {React.ComponentProps<"div">} props - Other props to pass to the div element.
 */
function BaseCard({className, padding, ...props}: React.ComponentProps<'div'> & {padding?: 'default' | 'none'}) {
  return (
      <div
          data-slot="card"
          className={cn(cardVariants({padding}), className)}
          {...props}
      />
  );
}

/**
 * BaseCardHeader component represents the header section of the card.
 * @param {string} className - Additional class names to apply.
 * @param {React.ComponentProps<"div">} props - Other props to pass to the div element.
 */
function BaseCardHeader({className, ...props}: React.ComponentProps<'div'>) {
  return (
      <div
          data-slot="card-header"
          className={cn(cardHeaderVariants(), className)}
          {...props}
      />
  );
}

/**
 * BaseCardTitle component represents the title section of the card.
 * @param {string} className - Additional class names to apply.
 * @param {React.ComponentProps<"div">} props - Other props to pass to the div element.
 */
function BaseCardTitle({className, ...props}: React.ComponentProps<'div'>) {
  return (
      <h4
          data-slot="card-title"
          className={cn(cardTitleVariants(), className)}
          {...props}
      />
  );
}

/**
 * BaseCardDescription component represents the description section of the card.
 * @param {string} className - Additional class names to apply.
 * @param {React.ComponentProps<"div">} props - Other props to pass to the div element.
 */
function BaseCardDescription({className, ...props}: React.ComponentProps<'div'>) {
  return (
      <p
          data-slot="card-description"
          className={cn(cardDescriptionVariants(), className)}
          {...props}
      />
  );
}

/**
 * BaseCardAction component represents the action section of the card.
 * @param {string} className - Additional class names to apply.
 * @param {React.ComponentProps<"div">} props - Other props to pass to the div element.
 */
function BaseCardAction({className, ...props}: React.ComponentProps<'div'>) {
  return (
      <div
          data-slot="card-action"
          className={cn(cardActionVariants(), className)}
          {...props}
      />
  );
}

/**
 * BaseCardContent component represents the content section of the card.
 * @param {string} className - Additional class names to apply.
 * @param {React.ComponentProps<"div">} props - Other props to pass to the div element.
 */
function BaseCardContent({className, ...props}: React.ComponentProps<'div'>) {
  return (
      <div
          data-slot="card-content"
          className={cn(cardContentVariants(), className)}
          {...props}
      />
  );
}

/**
 * BaseCardFooter component represents the footer section of the card.
 * @param {string} className - Additional class names to apply.
 * @param {React.ComponentProps<"div">} props - Other props to pass to the div element.
 */
function BaseCardFooter({className, ...props}: React.ComponentProps<'div'>) {
  return (
      <div
          data-slot="card-footer"
          className={cn(cardFooterVariants(), className)}
          {...props}
      />
  );
}

export {
  BaseCard,
  BaseCardHeader,
  BaseCardFooter,
  BaseCardTitle,
  BaseCardAction,
  BaseCardDescription,
  BaseCardContent,
};
