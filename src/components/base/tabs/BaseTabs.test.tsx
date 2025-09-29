import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {
  BaseTabs,
  BaseTabsList,
  BaseTabsTrigger,
  BaseTabsContent,
} from "../../../src/components/base/tabs/BaseTabs";

describe("BaseTabs", () => {
  it("renders tabs and their content correctly", () => {
    render(
      <BaseTabs defaultValue="tab1">
        <BaseTabsList>
          <BaseTabsTrigger value="tab1">Tab 1</BaseTabsTrigger>
          <BaseTabsTrigger value="tab2">Tab 2</BaseTabsTrigger>
        </BaseTabsList>
        <BaseTabsContent value="tab1">Content 1</BaseTabsContent>
        <BaseTabsContent value="tab2">Content 2</BaseTabsContent>
      </BaseTabs>
    );

    expect(screen.getByText(/tab 1/i)).toBeInTheDocument();
    expect(screen.getByText(/tab 2/i)).toBeInTheDocument();
    expect(screen.getByText(/content 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/content 2/i)).not.toBeInTheDocument();
  });

  it("switches content when a different tab is clicked", async () => {
    const user = userEvent.setup();
    render(
      <BaseTabs defaultValue="tab1">
        <BaseTabsList>
          <BaseTabsTrigger value="tab1">Tab 1</BaseTabsTrigger>
          <BaseTabsTrigger value="tab2">Tab 2</BaseTabsTrigger>
        </BaseTabsList>
        <BaseTabsContent value="tab1">Content 1</BaseTabsContent>
        <BaseTabsContent value="tab2">Content 2</BaseTabsContent>
      </BaseTabs>
    );

    const tab2 = screen.getByText(/tab 2/i);
    await user.click(tab2);

    expect(screen.getByText(/content 2/i, { selector: '[data-state="active"]' })).toBeInTheDocument();
    expect(screen.queryByText(/content 1/i, { selector: '[data-state="active"]' })).not.toBeInTheDocument();
  });
});