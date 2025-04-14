import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/about/page'; // Assuming the About page is under `app/about/page.tsx`
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

// Mocking the SiteHeader and SiteFooter components to check if they render
jest.mock('@/components/site-header', () => ({
  SiteHeader: jest.fn(() => <header data-testid="site-header">Header</header>),
}));

jest.mock('@/components/site-footer', () => ({
  SiteFooter: jest.fn(() => <footer data-testid="site-footer">Footer</footer>),
}));

describe('AboutPage', () => {
  test('renders all elements on the page', () => {
    render(<AboutPage />);

    // Header and Footer components should render
    expect(screen.getByTestId('site-header')).toBeInTheDocument();
    expect(screen.getByTestId('site-footer')).toBeInTheDocument();

    // Title should be rendered correctly
    expect(screen.getByRole('heading', { name: /about forecastly/i })).toBeInTheDocument();

    // Sections should render
    expect(screen.getByRole('heading', { name: /our mission/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /who we are/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /why choose forecastly/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /what sets us apart/i })).toBeInTheDocument();
  });

  test('renders the content of each section', () => {
    render(<AboutPage />);

    // Content under "Our Mission"
    expect(screen.getByText(/At FORECASTLY, we empower businesses with actionable insights into future sales trends/i)).toBeInTheDocument();

    // Content under "Who We Are"
    expect(screen.getByText(/We are a dedicated team of developers, data scientists, and sales enthusiasts/i)).toBeInTheDocument();

    // Content under "Why Choose FORECASTLY"
    expect(screen.getByText(/Accurate Predictions/)).toBeInTheDocument();
    expect(screen.getByText(/User-Friendly Design/)).toBeInTheDocument();
    expect(screen.getByText(/Tailored Insights/)).toBeInTheDocument();
    expect(screen.getByText(/Inclusive Platform/)).toBeInTheDocument();

    // Content under "What Sets Us Apart"
    expect(screen.getByText(/FORECASTLY goes beyond simple projections/i)).toBeInTheDocument();
  });

  test('renders the call-to-action message', () => {
    render(<AboutPage />);

    // Check for the call-to-action text at the end of the page
    expect(screen.getByText(/Start your journey with FORECASTLY today/i)).toBeInTheDocument();
  });
});
