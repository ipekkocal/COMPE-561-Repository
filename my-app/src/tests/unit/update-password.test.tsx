import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UpdatePasswordPage from "@/app/update-password/page";

describe("UpdatePasswordPage Unit Tests", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  test("renders the update password page correctly", () => {
    render(<UpdatePasswordPage />);

    // Check for the heading
    expect(screen.getByRole("heading", { name: /update password/i })).toBeInTheDocument();

    // Check for input fields
    expect(screen.getByPlaceholderText(/Enter your previousPassword/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your newPassword/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your confirmPassword/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByRole("button", { name: /update password/i })).toBeInTheDocument();
  });

  test("shows an error message if passwords do not match", async () => {
    render(<UpdatePasswordPage />);

    // Fill in mismatched passwords
    fireEvent.change(screen.getByPlaceholderText(/Enter your newPassword/i), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your confirmPassword/i), {
      target: { value: "differentpassword" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /update password/i }));

    // Verify error message
    await waitFor(() =>
      expect(screen.getByText(/Passwords do not match!/i)).toBeInTheDocument()
    );
  });

  test("submits the form successfully with valid data", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
    });

    render(<UpdatePasswordPage />);

    // Fill in form fields with valid data
    fireEvent.change(screen.getByPlaceholderText(/Enter your previousPassword/i), {
      target: { value: "oldpassword123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your newPassword/i), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your confirmPassword/i), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: "test@example.com" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /update password/i }));

    // Verify success message
    await waitFor(() =>
      expect(screen.getByText(/Password updated successfully!/i)).toBeInTheDocument()
    );

    // Verify API call
    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/users/password",
      expect.objectContaining({
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          previousPassword: "oldpassword123",
          newPassword: "newpassword123",
          confirmPassword: "newpassword123",
          username: "testuser",
          email: "test@example.com",
        }),
      })
    );
  });

  test("shows an error message if the API call fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValue({ detail: "Password update failed" }),
    });

    render(<UpdatePasswordPage />);

    // Fill in form fields with valid data
    fireEvent.change(screen.getByPlaceholderText(/Enter your previousPassword/i), {
      target: { value: "oldpassword123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your newPassword/i), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your confirmPassword/i), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: "test@example.com" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /update password/i }));

    // Verify error message
    await waitFor(() =>
      expect(screen.getByText(/Password update failed/i)).toBeInTheDocument()
    );
  });
});
