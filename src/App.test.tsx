import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./App";

describe("renders component", () => {
  it("shows Snake text", () => {
    render(<App />);
    expect(screen.getByText(/Snake/i)).toBeInTheDocument();
  });
});
