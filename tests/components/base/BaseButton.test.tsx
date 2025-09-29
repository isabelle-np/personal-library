import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BaseButton } from "../../../src/components/base/BaseButton";

describe("BaseButton", () => {
  it("renders correctly with default props", () => {
    render(<BaseButton>Click Me</BaseButton>);
    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeInTheDocument();
  });

  it("applies variant and size classes", () => {
    render(<BaseButton variant="destructive" size="lg">Delete</BaseButton>);
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveClass("bg-destructive", "h-10");
  });

  it("supports the asChild prop", () => {
    render(
      <BaseButton asChild>
        <a href="#">Link</a>
      </BaseButton>
    );
    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "#");
  });

  it("handles click events", async () => {
    const handleClick = jest.fn();
    render(<BaseButton onClick={handleClick}>Click Me</BaseButton>);
    const button = screen.getByRole("button", { name: "Click Me" });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when the disabled prop is set", () => {
    render(<BaseButton disabled>Disabled</BaseButton>);
    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button).toBeDisabled();
  });
});