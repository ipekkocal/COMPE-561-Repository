import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UpdatePasswordPage from "@/app/update-password/page";

describe("UpdatePasswordPage Integration Tests", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  test("renders the UpdatePasswordPage correctly", () => {
    render(<UpdatePasswordPage />);

    expect(screen.getByRole("heading", { name: /update password/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/previous password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /update password/i })).toBeInTheDocument();
  });

  test("displays validation error if passwords do not match", async () => {
    render(<UpdatePasswordPage />);

    fireEvent.change(screen.getByLabelText(/new password/i), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "differentpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /update password/i }));

    await waitFor(() =>
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
    );
  });

  test("submits the form successfully with valid data", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

    render(<UpdatePasswordPage />);

    fireEvent.change(screen.getByLabelText(/previous password/i), {
      target: { value: "oldpassword123" },
    });
    fireEvent.change(screen.getByLabelText(/new password/i), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /update password/i }));

    await waitFor(() =>
      expect(screen.getByText(/password updated successfully/i)).toBeInTheDocument()
    );
  });

  test("shows error message if API call fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValue({ detail: "Password update failed" }),
    });

    render(<UpdatePasswordPage />);

    fireEvent.change(screen.getByLabelText(/previous password/i), {
      target: { value: "oldpassword123" },
    });
    fireEvent.change(screen.getByLabelText(/new password/i), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /update password/i }));

    await waitFor(() =>
      expect(screen.getByText(/password update failed/i)).toBeInTheDocument()
    );
  });

  test("handles network errors gracefully", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(<UpdatePasswordPage />);

    fireEvent.change(screen.getByLabelText(/previous password/i), {
      target: { value: "oldpassword123" },
    });
    fireEvent.change(screen.getByLabelText(/new password/i), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /update password/i }));

    await waitFor(() =>
      expect(screen.getByText(/network error/i)).toBeInTheDocument()
    );
  });
});
