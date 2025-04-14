import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PasswordResetPage from "@/app/forgot-password/page";
import { useRouter } from "next/navigation";
import fetchMock from "jest-fetch-mock";

// Mock `useRouter` from Next.js
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Enable fetch mocking
fetchMock.enableMocks();

describe("PasswordResetPage Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock useRouter implementation
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(), // Mock push function
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    fetchMock.resetMocks();
  });

  test("allows user to request a verification code", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    render(<PasswordResetPage />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /request code/i }));

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /reset password/i })
      ).toBeInTheDocument()
    );

    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/users/password-reset-request",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "testuser", email: "test@example.com" }),
      })
    );
  });

  test("allows user to reset their password", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    render(<PasswordResetPage />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /request code/i }));

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /reset password/i })
      ).toBeInTheDocument()
    );

    fireEvent.change(screen.getByPlaceholderText(/verification code/i), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText(/new password/i), {
      target: { value: "newpassword123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /reset password/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/password reset successful/i)
      ).toBeInTheDocument()
    );

    expect(fetchMock).toHaveBeenCalledWith(
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

  test("displays error message when request fails", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ detail: "Invalid username or email" }),
      { status: 400 }
    );

    render(<PasswordResetPage />);

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "invaliduser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "invalid@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /request code/i }));

    await waitFor(() =>
      expect(screen.getByText(/invalid username or email/i)).toBeInTheDocument()
    );
  });
});
