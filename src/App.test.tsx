import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

/**
 * Test suite for the App component.
 */
describe("App Component", () => {
  /**
   * Tests if the App component renders the header, navigation, and footer elements.
   */
  test("renders header, navigation, and footer", () => {
    render(<App />);

    expect(screen.getByRole("banner")).toBeInTheDocument(); // Header
    expect(screen.getByRole("navigation")).toBeInTheDocument(); // Navigation
    expect(screen.getByRole("contentinfo")).toBeInTheDocument(); // Footer
  });

  /**
   * Tests if the loading skeleton is displayed when the App is in a loading state.
   */
  test("displays loading skeleton when loading", () => {
    render(<App />);

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  /**
   * Tests if the AI Analysis Modal opens and closes correctly when interacting with the FAB button.
   */
  test("opens and closes AI Analysis Modal", () => {
    render(<App />);

    const fabButton = screen.getByRole("button", { name: /open analysis/i });
    fireEvent.click(fabButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  /**
   * Tests if changing tabs fetches and displays the correct books.
   */
  test("changes tab and fetches books", () => {
    render(<App />);

    const tabButton = screen.getByRole("button", { name: /fiction/i });
    fireEvent.click(tabButton);

    expect(screen.getByLabelText(/fiction books/i)).toBeInTheDocument();
  });
});