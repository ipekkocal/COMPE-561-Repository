import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UpdateUsernamePage from "@/app/update-username/page";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("UpdateUsernamePage Integration Tests", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  test("renders the UpdateUsernamePage correctly", () => {
    render(<UpdateUsernamePage />);
    expect(screen.getByRole("heading", { name: /Update Username/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your previous username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your new username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Update Username/i })).toBeInTheDocument();
  });

  test("displays error message if form is incomplete", async () => {
    render(<UpdateUsernamePage />);
    fireEvent.click(screen.getByRole("button", { name: /Update Username/i }));
    await waitFor(() => {
      expect(screen.getByText(/Please fill in all the required fields/i)).toBeInTheDocument();
    });
  });

  test("submits the form successfully with valid data", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ username: "newUsername123" }),
    });
    render(<UpdateUsernamePage />);
    fireEvent.change(screen.getByPlaceholderText(/Enter your previous username/i), {
      target: { value: "oldUsername" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your new username/i), {
      target: { value: "newUsername123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Update Username/i }));
    await waitFor(() => {
      expect(screen.getByText(/Username updated successfully to: newUsername123/i)).toBeInTheDocument();
    });
  });

  test("shows error message if API call fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValue({ message: "Failed to update username" }),
    });
    render(<UpdateUsernamePage />);
    fireEvent.change(screen.getByPlaceholderText(/Enter your previous username/i), {
      target: { value: "oldUsername" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your new username/i), {
      target: { value: "newUsername123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Update Username/i }));
    await waitFor(() => {
      expect(screen.getByText(/Error: Failed to update username/i)).toBeInTheDocument();
    });
  });

  test("handles network errors gracefully", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));
    render(<UpdateUsernamePage />);
    fireEvent.change(screen.getByPlaceholderText(/Enter your previous username/i), {
      target: { value: "oldUsername" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your new username/i), {
      target: { value: "newUsername123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Update Username/i }));
    await waitFor(() => {
      expect(screen.getByText(/Error: Network Error/i)).toBeInTheDocument();
    });
  });
});
