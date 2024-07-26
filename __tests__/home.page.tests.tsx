import { render, screen, fireEvent, act } from "@testing-library/react";
import Home from "../app/page";
import React from "react";
import storageService from "../app/storage/storage-service";

describe("Page", () => {
  it("renders initial state unchanged", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  it("should start the timer and switch to fasting/eating mode after clicking the button", async () => {
    const { container } = render(<Home />);

    expect(container).toMatchSnapshot();

    // Start fasting
    const button = screen.getByRole("button", { name: /Start fasting/i });
    await act(async () => {
      fireEvent.click(button);
    });

    expect(container).toMatchSnapshot();

    const startFastingTime = storageService.getStartFastingTime();
    expect(startFastingTime).toBeInstanceOf(Promise<Date>);

    // Stop fasting / start eating
    await act(async () => {
      fireEvent.click(button);
    });

    expect(container).toMatchSnapshot();

    const startEatingTime = storageService.getStartEatingTime();
    expect(startEatingTime).toBeInstanceOf(Promise<Date>);

    // Reset timer
    const resetButton = screen.getByRole("button", { name: /Reset timer/i });
    await act(async () => {
      fireEvent.click(resetButton);
    });

    expect(container).toMatchSnapshot();

    expect(storageService.getStartFastingTime()).toBeInstanceOf(Promise<{}>);
    expect(storageService.getStartEatingTime()).toBeInstanceOf(Promise<{}>);
  });
});
