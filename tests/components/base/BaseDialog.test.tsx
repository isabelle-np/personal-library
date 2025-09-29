import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {
  BaseDialog,
  BaseDialogTrigger,
  BaseDialogContent,
  BaseDialogTitle,
  BaseDialogDescription,
  BaseDialogClose,
} from "../../../src/components/base/BaseDialog";

describe("BaseDialog", () => {
  it("renders dialog content when open", () => {
    render(
      <BaseDialog>
        <BaseDialogTrigger>Open Dialog</BaseDialogTrigger>
        <BaseDialogContent>
          <BaseDialogTitle>Dialog Title</BaseDialogTitle>
          <BaseDialogDescription>Dialog Description</BaseDialogDescription>
          <BaseDialogClose>Close</BaseDialogClose>
        </BaseDialogContent>
      </BaseDialog>
    );

    const trigger = screen.getByText("Open Dialog");

    act(() => {
      trigger.click();
    });

    expect(screen.getByText("Dialog Title")).toBeInTheDocument();
    expect(screen.getByText("Dialog Description")).toBeInTheDocument();

    const closeButton = screen.getAllByText("Close").find(
      (el) => el.getAttribute("data-slot") === "dialog-close"
    );
    expect(closeButton).toBeInTheDocument();

    act(() => {
      closeButton?.click();
    });
  });

  it("closes the dialog when close button is clicked", () => {
    render(
      <BaseDialog>
        <BaseDialogTrigger>Open Dialog</BaseDialogTrigger>
        <BaseDialogContent>
          <BaseDialogTitle>Dialog Title</BaseDialogTitle>
          <BaseDialogClose>Close</BaseDialogClose>
        </BaseDialogContent>
      </BaseDialog>
    );

    const trigger = screen.getByText("Open Dialog");

    act(() => {
      trigger.click();
    });

    const closeButton = screen.getAllByText("Close").find(
      (el) => el.getAttribute("data-slot") === "dialog-close"
    );

    act(() => {
      closeButton?.click();
    });

    expect(screen.queryByText("Dialog Title")).not.toBeInTheDocument();
  });
});