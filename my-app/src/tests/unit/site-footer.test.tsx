import { render, screen, fireEvent } from '@testing-library/react';
import { SiteFooter } from '@/components/site-footer';
import { AuthProvider } from '@/components/auth-context'; // Import the AuthProvider to wrap the component

jest.mock('lucide-react', () => ({
  Instagram: jest.fn(() => <div data-testid="instagram-icon" />),
  Twitter: jest.fn(() => <div data-testid="twitter-icon" />),
  Facebook: jest.fn(() => <div data-testid="facebook-icon" />),
}));

describe('SiteFooter', () => {
  test('renders all footer elements', () => {
    render(
      <AuthProvider>
        <SiteFooter />
      </AuthProvider>
    );

    // Check if all essential footer sections are rendered
    expect(screen.getByText(/my account/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/our mission/i)).toBeInTheDocument();
    expect(screen.getByText(/faq/i)).toBeInTheDocument();
  });

  test('renders social media icons and shows their names on hover', () => {
    render(
      <AuthProvider>
        <SiteFooter />
      </AuthProvider>
    );

    // Verify social media icons are present
    expect(screen.getByTestId('instagram-icon')).toBeInTheDocument();
    expect(screen.getByTestId('twitter-icon')).toBeInTheDocument();
    expect(screen.getByTestId('facebook-icon')).toBeInTheDocument();

    // Hover over Instagram icon and check if name appears
    fireEvent.mouseEnter(screen.getByTestId('instagram-icon'));
    expect(screen.getByText(/Instagram/i)).toBeInTheDocument();

    // Hover over Twitter icon and check if name appears
    fireEvent.mouseEnter(screen.getByTestId('twitter-icon'));
    expect(screen.getByText(/Twitter/i)).toBeInTheDocument();

    // Hover over Facebook icon and check if name appears
    fireEvent.mouseEnter(screen.getByTestId('facebook-icon'));
    expect(screen.getByText(/Facebook/i)).toBeInTheDocument();
  });

  test('has working links', () => {
    render(
      <AuthProvider>
        <SiteFooter />
      </AuthProvider>
    );

    // Check if links navigate to the correct routes
    expect(screen.getByRole('link', { name: /sign in/i }).getAttribute('href')).toBe('/sign-in');
    expect(screen.getByRole('link', { name: /sign up/i }).getAttribute('href')).toBe('/sign-up');
    expect(screen.getByRole('link', { name: /our mission/i }).getAttribute('href')).toBe('/about#our-mission');
    expect(screen.getByRole('link', { name: /faq/i }).getAttribute('href')).toBe('/faq');
  });
});
