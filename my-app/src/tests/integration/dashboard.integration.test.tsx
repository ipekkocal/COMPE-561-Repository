import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DashboardPage from "@/app/dashboard/page";

describe("DashboardPage Integration Tests", () => {
  test("renders all static elements correctly", () => {
    render(<DashboardPage />);

    // Check for header
    expect(
      screen.getByRole("heading", { name: /how it works/i })
    ).toBeInTheDocument();

    // Check for icons
    expect(screen.getByTestId("icon-calendar")).toBeInTheDocument();
    expect(screen.getByTestId("icon-cloud")).toBeInTheDocument();
    expect(screen.getByTestId("icon-linechart")).toBeInTheDocument();

    // Check for buttons
    expect(screen.getByRole("button", { name: /charts/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /data tables/i })).toBeInTheDocument();
  });

  test("buttons are interactive", async () => {
    render(<DashboardPage />);
    const user = userEvent.setup();

    // Simulate clicking "CHARTS" button
    const chartsButton = screen.getByRole("button", { name: /charts/i });
    await user.click(chartsButton);
    // You can add a mock function if it navigates or triggers events

    // Simulate clicking "DATA TABLES" button
    const dataTablesButton = screen.getByRole("button", { name: /data tables/i });
    await user.click(dataTablesButton);
    // You can add a mock function if it navigates or triggers events
  });
});
