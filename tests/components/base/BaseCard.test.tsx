import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BaseCard, BaseCardHeader, BaseCardTitle, BaseCardDescription, BaseCardContent, BaseCardFooter } from "../../../src/components/base/BaseCard";

describe("BaseCard", () => {
  it("renders correctly with default props", () => {
    render(<BaseCard>Card Content</BaseCard>);
    const card = screen.getByText(/card content/i);
    expect(card).toBeInTheDocument();
  });

  it("renders header, title, and description correctly", () => {
    render(
      <BaseCard>
        <BaseCardHeader>
          <BaseCardTitle>Title</BaseCardTitle>
          <BaseCardDescription>Description</BaseCardDescription>
        </BaseCardHeader>
      </BaseCard>
    );
    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
  });

  it("renders content and footer correctly", () => {
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