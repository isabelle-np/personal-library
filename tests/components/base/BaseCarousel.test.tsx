import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {
  BaseCarousel,
  BaseCarouselContent,
  BaseCarouselItem,
  BaseCarouselPrevious,
  BaseCarouselNext,
} from "../../../src/components/base/BaseCarousel";

// Mock embla-carousel to prevent errors during testing
jest.mock("embla-carousel-react", () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({})),
    useEmblaCarousel: jest.fn(() => [jest.fn(), { scrollNext: jest.fn(), scrollPrev: jest.fn(), canScrollNext: jest.fn(() => true), canScrollPrev: jest.fn(() => true), on: jest.fn(), off: jest.fn() }]),
  };
});

describe("BaseCarousel", () => {
  xit("renders correctly with default props", () => {
    render(
      <BaseCarousel>
        <BaseCarouselContent>
          <BaseCarouselItem>Slide 1</BaseCarouselItem>
          <BaseCarouselItem>Slide 2</BaseCarouselItem>
        </BaseCarouselContent>
      </BaseCarousel>
    );
    expect(screen.getByText(/slide 1/i)).toBeInTheDocument();
    expect(screen.getByText(/slide 2/i)).toBeInTheDocument();
  });

  xit("renders navigation buttons", () => {
    render(
      <BaseCarousel>
        <BaseCarouselPrevious>Previous</BaseCarouselPrevious>
        <BaseCarouselNext>Next</BaseCarouselNext>
      </BaseCarousel>
    );
    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });

  xit("disables navigation buttons when scrolling is not possible", () => {
    render(
      <BaseCarousel>
        <BaseCarouselPrevious>Previous</BaseCarouselPrevious>
        <BaseCarouselNext>Next</BaseCarouselNext>
      </BaseCarousel>
    );
    const prevButton = screen.getByRole("button", { name: /previous/i });
    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  xit("calls scrollNext and scrollPrev when navigation buttons are clicked", async () => {
    const user = userEvent.setup();
    const mockScrollNext = jest.fn();
    const mockScrollPrev = jest.fn();

    jest.mock("embla-carousel-react", () => {
      return {
        __esModule: true,
        default: jest.fn(() => ({})),
        useEmblaCarousel: jest.fn(() => [jest.fn(), { scrollNext: mockScrollNext, scrollPrev: mockScrollPrev, canScrollNext: jest.fn(() => true), canScrollPrev: jest.fn(() => true), on: jest.fn(), off: jest.fn() }]),
      };
    });

    render(
      <BaseCarousel>
        <BaseCarouselPrevious>Previous</BaseCarouselPrevious>
        <BaseCarouselNext>Next</BaseCarouselNext>
      </BaseCarousel>
    );

    const prevButton = screen.getByRole("button", { name: /previous/i });
    const nextButton = screen.getByRole("button", { name: /next/i });

    await user.click(prevButton);
    await user.click(nextButton);

    expect(mockScrollPrev).toHaveBeenCalled();
    expect(mockScrollNext).toHaveBeenCalled();
  });

  xit("handles horizontal and vertical orientations", () => {
    const { rerender } = render(
      <BaseCarousel orientation="horizontal">
        <BaseCarouselContent>
          <BaseCarouselItem>Slide 1</BaseCarouselItem>
        </BaseCarouselContent>
      </BaseCarousel>
    );
    expect(screen.getByRole("region")).toHaveAttribute("data-orientation", "horizontal");

    rerender(
      <BaseCarousel orientation="vertical">
        <BaseCarouselContent>
          <BaseCarouselItem>Slide 1</BaseCarouselItem>
        </BaseCarouselContent>
      </BaseCarousel>
    );
    expect(screen.getByRole("region")).toHaveAttribute("data-orientation", "vertical");
  });

  xit("handles keyboard navigation", async () => {
    const user = userEvent.setup();
    const mockScrollNext = jest.fn();
    const mockScrollPrev = jest.fn();

    jest.mock("embla-carousel-react", () => {
      return {
        __esModule: true,
        default: jest.fn(() => ({})),
        useEmblaCarousel: jest.fn(() => [jest.fn(), { scrollNext: mockScrollNext, scrollPrev: mockScrollPrev, canScrollNext: jest.fn(() => true), canScrollPrev: jest.fn(() => true), on: jest.fn(), off: jest.fn() }]),
      };
    });

    render(
      <BaseCarousel>
        <BaseCarouselContent>
          <BaseCarouselItem>Slide 1</BaseCarouselItem>
        </BaseCarouselContent>
      </BaseCarousel>
    );

    const carousel = screen.getByRole("region");

    await user.keyboard("{ArrowRight}");
    expect(mockScrollNext).toHaveBeenCalled();

    await user.keyboard("{ArrowLeft}");
    expect(mockScrollPrev).toHaveBeenCalled();
  });

  xit("handles empty content gracefully", () => {
    render(<BaseCarousel />);
    expect(screen.getByRole("region")).toBeInTheDocument();
  });

  xit("applies correct CSS classes based on orientation", () => {
    const { rerender } = render(
      <BaseCarousel orientation="horizontal">
        <BaseCarouselContent>
          <BaseCarouselItem>Slide 1</BaseCarouselItem>
        </BaseCarouselContent>
      </BaseCarousel>
    );
    expect(screen.getByRole("region")).toHaveClass("relative");

    rerender(
      <BaseCarousel orientation="vertical">
        <BaseCarouselContent>
          <BaseCarouselItem>Slide 1</BaseCarouselItem>
        </BaseCarouselContent>
      </BaseCarousel>
    );
    expect(screen.getByRole("region")).toHaveClass("relative");
  });
});