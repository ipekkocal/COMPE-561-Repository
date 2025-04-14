import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SiteHeader } from '@/components/site-header';
import { useRouter } from 'next/navigation';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('lucide-react', () => ({
  Search: jest.fn(() => <div data-testid="search-icon" />),
}));

jest.mock('@/components/ui/input', () => ({
  Input: jest.fn((props) => <input {...props} />),
}));

describe('SiteHeader', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  /*
  test('renders all header elements', () => {
    render(<SiteHeader />);

    // Check if all essential elements are rendered
    const aboutLinks = screen.getAllByRole('link', { name: /about/i });
    expect(aboutLinks).toHaveLength(1); // Ensure there's only one expected "About" link
    expect(aboutLinks[0]).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /user/i })).toBeInTheDocument();
  });
  */

  test('toggles dropdown menu visibility on button click', () => {
    render(<SiteHeader />);

    // Open dropdown
    fireEvent.click(screen.getByRole('button', { name: /user/i }));
    expect(screen.getByText(/Update Username/i)).toBeInTheDocument();

    // Close dropdown
    fireEvent.click(screen.getByRole('button', { name: /user/i }));
    expect(screen.queryByText(/Update Username/i)).not.toBeInTheDocument();
  });

  /*
  test('calls logout function and redirects to sign-in page', async () => {
    render(<SiteHeader />);

    // Open dropdown
    fireEvent.click(screen.getByRole('button', { name: /user/i }));

    // Simulate logout click
    fireEvent.click(screen.getByText(/Logout/i));

    // Ensure redirection occurs
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/sign-in'));
  });
  */

  test('renders and interacts with the search input', () => {
    render(<SiteHeader />);

    const searchInput = screen.getByPlaceholderText(/search.../i);

    // Interact with the search box
    fireEvent.change(searchInput, { target: { value: 'Forecasting' } });
    expect(searchInput).toHaveValue('Forecasting');
  });

  test('closes dropdown when clicking outside', () => {
    render(<SiteHeader />);

    // Open dropdown
    fireEvent.click(screen.getByRole('button', { name: /user/i }));
    expect(screen.getByText(/Update Username/i)).toBeInTheDocument();

    // Simulate clicking outside
    fireEvent.mouseDown(document);
    expect(screen.queryByText(/Update Username/i)).not.toBeInTheDocument();
  });
});
