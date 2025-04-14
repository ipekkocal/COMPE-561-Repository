import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import SignInPage from '@/app/sign-in/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SignInPage', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
    global.fetch = jest.fn(); // Ensure `fetch` is mocked before each test
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore any mocks to avoid test pollution
  });

  test('submits the form successfully', async () => {
    // Mock fetch for successful login
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ user_id: '123' }), // Mock response with user_id
    });

    render(<SignInPage />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Wait for navigation to be triggered
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/product?user_id=123'));

    // Verify fetch was called with correct arguments
    expect(global.fetch).toHaveBeenCalledWith(
      'http://127.0.0.1:8000/users/login',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          username: 'testuser',
          password: 'password123',
        }),
      })
    );
  });

  test('displays error message on failed login', async () => {
    // Mock fetch for failed login
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({ detail: 'Invalid credentials' }),
    });

    render(<SignInPage />);

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Verify the error message is displayed
    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();

    // Verify push was not called
    expect(mockPush).not.toHaveBeenCalled();
  });
});
