/**
 * @fileoverview Unit tests for the BaseButton component.
 * Tests rendering, props, and event handling.
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BaseButton } from "./BaseButton";

/**
 * Test suite for the BaseButton component.
 */
describe("BaseButton", () => {
  /**
   * Tests that the BaseButton renders correctly with default props.
   */
  it("renders correctly with default props", () => {
    render(<BaseButton>Click Me</BaseButton>);
    const button = screen.getByRole("button", { name: "Button" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary", "text-primary-foreground");
  });

  /**
   * Tests that the BaseButton applies variant and size classes correctly.
   */
  it("applies variant and size classes", () => {
    render(
      <BaseButton variant="destructive" size="lg">
        Delete
      </BaseButton>
    );
    const button = screen.getByRole("button", { name: "Button" });
    expect(button).toHaveClass("bg-destructive", "h-10");
  });

  /**
   * Tests that the BaseButton supports the asChild prop.
   */
  it("supports the asChild prop", () => {
    render(
      <BaseButton asChild>
        <a href="#" aria-label="Link">Link</a>
      </BaseButton>
    );
    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#");
  });

  /**
   * Tests that the BaseButton handles click events correctly.
   */
  it("handles click events", async () => {
    const handleClick = jest.fn();
    render(<BaseButton onClick={handleClick}>Click Me</BaseButton>);
    const button = screen.getByRole("button", { name: "Button" });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  /**
   * Tests that the BaseButton is disabled when the disabled prop is set.
   */
  it("is disabled when the disabled prop is set", () => {
    render(<BaseButton disabled>Disabled</BaseButton>);
    const button = screen.getByRole("button", { name: "Button" });
    expect(button).toBeDisabled();
  });
});