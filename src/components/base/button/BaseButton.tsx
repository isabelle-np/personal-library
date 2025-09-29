import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../../utils/classNameUtils';

/**
 * Variants for the BaseButton component, defining styles for different button types and sizes.
 */
const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer',
    {
      variants: {
        variant: {
          default: 'bg-primary text-primary-foreground hover:bg-primary/90',
          destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive',
          outline: 'border bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
        },
        size: {
          default: 'h-9 px-4',
          sm: 'h-8 rounded-md px-3',
          lg: 'h-10 rounded-md px-6',
          icon: 'h-9 w-9 rounded-md',
        },
      },
      defaultVariants: {
        variant: 'default',
        size: 'default',
      },
    },
);

/**
 * Type definitions for button variants and sizes.
 */
type ButtonVariant = 'default' | 'destructive' | 'outline';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

/**
 * Props for the BaseButton component.
 */
interface BaseButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/**
 * BaseButton component is a reusable button component with customizable styles and variants.
 *
 * @param {BaseButtonProps} props - The properties for the BaseButton component.
 * @return {JSX.Element} The rendered button component.
 */
function BaseButton({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: BaseButtonProps): React.JSX.Element {
  const Comp = React.useMemo(() => (asChild ? Slot : 'button'), [asChild]);

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      aria-label={props['aria-label'] || 'Button'}
      {...props}
    />
  );
}

/**
 * Exports the BaseButton component and buttonVariants for external use.
 */
export { BaseButton, buttonVariants };
