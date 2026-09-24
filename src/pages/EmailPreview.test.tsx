import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EmailPreview from "./EmailPreview";

describe("email preview workspace", () => {
  it("renders grouped navigation and switches templates", () => {
    render(<EmailPreview />);

    expect(screen.getByRole("navigation", { name: "Email templates" })).toBeInTheDocument();
    expect(screen.getByText("Digital assets")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Asset swapped" }));
    expect(screen.getByTitle("Email preview: asset-swapped")).toBeInTheDocument();
  });

  it("filters the sidebar by label", () => {
    render(<EmailPreview />);

    fireEvent.change(screen.getByPlaceholderText("Search templates"), { target: { value: "electricity" } });
    expect(screen.getByRole("button", { name: "Electricity payment" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Welcome to DeeX" })).not.toBeInTheDocument();
  });

  it("offers fit and actual-size preview modes", () => {
    render(<EmailPreview />);

    expect(screen.getByRole("button", { name: "Fit preview" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Show at 100%" }));
    expect(screen.getByRole("button", { name: "Show at 100%" })).toHaveAttribute("aria-pressed", "true");
  });

  it("uses a flat 720px email canvas", () => {
    render(<EmailPreview />);

    const frame = screen.getByTitle("Email preview: welcome");
    expect(frame).toHaveStyle({ width: "720px" });
    expect(frame.parentElement).not.toHaveClass("rounded-xl");
    expect(frame.parentElement?.className).not.toContain("shadow-");
  });
});
