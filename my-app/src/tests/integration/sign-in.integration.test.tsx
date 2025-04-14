import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignInPage from "@/app/sign-in/page";
import { useRouter } from "next/navigation";

// Mock useRouter from Next.js
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SignInPage Integration Test", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();

    // Mock useRouter
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test("renders the sign-in page correctly", () => {
    render(<SignInPage />);

    // Check form inputs
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Check Sign In button
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();

    // Check links
    expect(
      screen.getByRole("link", { name: /create an account/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /change your password/i })
    ).toBeInTheDocument();
  });

  test("handles successful login", async () => {
    // Mock successful API response with user_id
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ token: "test-token", user_id: "12345" }),
    });

    render(<SignInPage />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Wait for navigation
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/product?user_id=12345");
    });

    // Verify API call
    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/users/login",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          username: "testuser",
          password: "password123",
        }),
      })
    );
  });

  test("handles failed login with error message", async () => {
    // Mock failed API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({ detail: "Invalid credentials" }),
    });

    render(<SignInPage />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });

    // Verify API call
    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/users/login",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "wrong@example.com",
          username: "wronguser",
          password: "wrongpassword",
        }),
      })
    );
  });

  test("validates required fields", async () => {
    render(<SignInPage />);

    // Submit form without filling anything
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Wait for validation error
    await waitFor(() => {
      expect(screen.getByLabelText(/email/i)).toHaveAttribute("required");
      expect(screen.getByLabelText(/username/i)).toHaveAttribute("required");
      expect(screen.getByLabelText(/password/i)).toHaveAttribute("required");
    });
  });

  test("navigates to sign-up and forgot-password pages", () => {
    render(<SignInPage />);

    // Check navigation links
    const signUpLink = screen.getByRole("link", { name: /create an account/i });
    const forgotPasswordLink = screen.getByRole("link", {
      name: /change your password/i,
    });

    expect(signUpLink).toHaveAttribute("href", "/sign-up");
    expect(forgotPasswordLink).toHaveAttribute("href", "/forgot-password");
  });
});
