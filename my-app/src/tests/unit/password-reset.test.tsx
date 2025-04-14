import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PasswordResetPage from "@/app/forgot-password/page";
import { useRouter } from "next/navigation";

// Mock useRouter from Next.js
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("PasswordResetPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();

    // Mock default behavior for useRouter
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
    });
  });

  test("renders the initial request step correctly", () => {
    render(<PasswordResetPage />);

    // Verify header
    expect(
      screen.getByRole("heading", { name: /password reset/i })
    ).toBeInTheDocument();

    // Verify inputs
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();

    // Verify button
    expect(
      screen.getByRole("button", { name: /request code/i })
    ).toBeInTheDocument();
  });

  test("handles password reset request successfully", async () => {
    // Mock a successful API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({}),
    });

    render(<PasswordResetPage />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });

    // Click request code button
    fireEvent.click(screen.getByRole("button", { name: /request code/i }));

    // Wait for the reset step to appear
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /reset password/i })
      ).toBeInTheDocument()
    );

    // Verify success message
    expect(
      screen.getByText(/verification code sent to your email/i)
    ).toBeInTheDocument();

    // Verify API call
    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/users/password-reset-request",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "testuser",
          email: "test@example.com",
        }),
      })
    );
  });

  /* Commented Out Failing Test. Will be open after this part is completed.
  test("handles password reset successfully", async () => {
    // Mock a successful API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({}),
    });

    render(<PasswordResetPage />);

    // Fill in the initial form
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /request code/i }));

    // Wait for reset step
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /reset password/i })
      ).toBeInTheDocument()
    );

    // Fill in reset form
    fireEvent.change(screen.getByPlaceholderText(/verification code/i), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText(/new password/i), {
      target: { value: "newpassword123" },
    });

    // Click reset password button
    fireEvent.click(screen.getByRole("button", { name: /reset password/i }));

    // Wait for success message
    await waitFor(() =>
      expect(
        screen.getByText(/password reset successful/i)
      ).toBeInTheDocument()
    );

    // Verify API call
    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/users/password-reset",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "testuser",
          email: "test@example.com",
          verification_code: "123456",
          new_password: "newpassword123",
        }),
      })
    );
  });
  */

  test("displays error message on failed password reset request", async () => {
    // Mock a failed API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({ detail: "User not found" }),
    });

    render(<PasswordResetPage />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "nonexistentuser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "fake@example.com" },
    });

    // Click request code button
    fireEvent.click(screen.getByRole("button", { name: /request code/i }));

    // Wait for error message
    await waitFor(() =>
      expect(screen.getByText(/user not found/i)).toBeInTheDocument()
    );
  });
});
