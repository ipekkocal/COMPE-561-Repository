import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UpdateUsernamePage from "@/app/update-username/page";
import { useRouter } from "next/navigation";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("UpdateUsernamePage Unit Tests", () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // Mock fetch API
    jest.clearAllMocks(); // Clear mocks between tests

    // Mock useRouter implementation
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  test("renders the update username page correctly", () => {
    render(<UpdateUsernamePage />);

    // Verify rendering
    expect(screen.getByRole("heading", { name: /update username/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your previous username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your new username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /update username/i })).toBeInTheDocument();
  });

  test("displays a success message when the username is updated successfully", async () => {
    // Mock successful API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ username: "newUsername123" }),
    });

    render(<UpdateUsernamePage />);

    // Fill in form fields
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

    // Click the update button
    fireEvent.click(screen.getByRole("button", { name: /update username/i }));

    // Wait for the success message
    await waitFor(() =>
      expect(screen.getByText(/Username updated successfully to: newUsername123/i)).toBeInTheDocument()
    );

    // Verify API call
    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/users/profile",
      expect.objectContaining({
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          previous_user_name: "oldUsername",
          new_user_name: "newUsername123",
          password: "password123",
          email: "test@example.com",
        }),
      })
    );
  });

  test("displays an error message when the API call fails", async () => {
    // Mock failed API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValue({ message: "Failed to update username" }),
    });

    render(<UpdateUsernamePage />);

    // Fill in form fields
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

    // Click the update button
    fireEvent.click(screen.getByRole("button", { name: /update username/i }));

    // Wait for the error message
    await waitFor(() =>
      expect(screen.getByText(/Error: Failed to update username/i)).toBeInTheDocument()
    );
  });

  test("displays an error message when a network error occurs", async () => {
    // Mock a network error
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    render(<UpdateUsernamePage />);

    // Fill in form fields
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

    // Click the update button
    fireEvent.click(screen.getByRole("button", { name: /update username/i }));

    // Wait for the error message
    await waitFor(() =>
      expect(screen.getByText(/Error: Network Error/i)).toBeInTheDocument()
    );
  });
});
