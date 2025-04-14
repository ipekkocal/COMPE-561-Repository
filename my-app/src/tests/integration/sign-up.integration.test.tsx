import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUpPage from "@/app/sign-up/page";
import { useRouter } from "next/navigation";

// Mock useRouter from Next.js with proper type
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SignUpPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();

    // Properly mock the useRouter to include push
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  test("renders the sign-up form correctly", () => {
    render(<SignUpPage />);

    // Check if all form fields are rendered
    expect(screen.getByPlaceholderText(/enter your first name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your last name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();

    // Check if the sign-up button is rendered
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  test("handles successful sign-up", async () => {
    // Mock a successful API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<SignUpPage />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/enter your first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your username/i), {
      target: { value: "johndoe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: "securepassword123" },
    });

    // Click the sign-up button
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    // Wait for the router to push to the sign-in page
    await waitFor(() => expect(push).toHaveBeenCalledWith("/sign-in"));

    // Verify the API call
    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/users/register",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "johndoe",
          email: "john.doe@example.com",
          password: "securepassword123",
        }),
      })
    );
  });

  test("displays an error message on failed sign-up", async () => {
    // Mock a failed API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValue({ detail: "Username already exists" }),
    });

    render(<SignUpPage />);

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/enter your first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your username/i), {
      target: { value: "johndoe" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: "securepassword123" },
    });

    // Click the sign-up button
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    // Wait for the error message to be displayed
    await waitFor(() =>
      expect(screen.getByText(/username already exists/i)).toBeInTheDocument()
    );

    // Verify the API call
    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/users/register",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "johndoe",
          email: "john.doe@example.com",
          password: "securepassword123",
        }),
      })
    );
  });
});
