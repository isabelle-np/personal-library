import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  BaseCard,
  BaseCardHeader,
  BaseCardTitle,
  BaseCardDescription,
  BaseCardContent,
  BaseCardFooter,
  BaseCardAction,
} from './BaseCard';

/**
 * Test suite for the BaseCard component and its subcomponents.
 */
describe('BaseCard', () => {
  /**
   * Tests if the BaseCard component renders correctly with default props.
   */
  it('renders correctly with default props', () => {
    render(<BaseCard>Card Content</BaseCard>);
    const card = screen.getByText(/card content/i);
    expect(card).toBeInTheDocument();
  });

  /**
   * Tests if the BaseCard component renders its header, title, description, and action subcomponents correctly.
   */
  it('renders header, title, description, and action correctly', () => {
    render(
        <BaseCard>
          <BaseCardHeader>
            <BaseCardTitle>Title</BaseCardTitle>
            <BaseCardDescription>Description</BaseCardDescription>
            <BaseCardAction>Action</BaseCardAction>
          </BaseCardHeader>
        </BaseCard>
    );
    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/action/i)).toBeInTheDocument();
  });

  /**
   * Tests if the BaseCard component renders its content and footer subcomponents correctly.
   */
  it('renders content and footer correctly', () => {
    render(
        <BaseCard>
          <BaseCardContent>Content</BaseCardContent>
          <BaseCardFooter>Footer</BaseCardFooter>
        </BaseCard>
    );
    expect(screen.getByText(/content/i)).toBeInTheDocument();
    expect(screen.getByText(/footer/i)).toBeInTheDocument();
  });
});