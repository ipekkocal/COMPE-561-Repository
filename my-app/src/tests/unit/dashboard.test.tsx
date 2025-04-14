import { render, screen } from '@testing-library/react';
import DashboardPage from '@/app/dashboard/page';
import { Button } from '@/components/ui/button'; // Import Button for mocking
import { Calendar, Cloud, LineChart } from 'lucide-react'; // Import icons for mocking

jest.mock('@/components/ui/button', () => ({
  Button: jest.fn(({ children }) => <button>{children}</button>),
}));

jest.mock('lucide-react', () => ({
  Calendar: jest.fn(() => <div data-testid="icon-calendar" />),
  Cloud: jest.fn(() => <div data-testid="icon-cloud" />),
  LineChart: jest.fn(() => <div data-testid="icon-linechart" />),
}));

describe('DashboardPage', () => {
  test('renders the page with all elements', () => {
    render(<DashboardPage />);

    // Header
    expect(
      screen.getByRole('heading', { name: /how it works/i })
    ).toBeInTheDocument();

    // Icons
    expect(screen.getByTestId('icon-calendar')).toBeInTheDocument();
    expect(screen.getByTestId('icon-cloud')).toBeInTheDocument();
    expect(screen.getByTestId('icon-linechart')).toBeInTheDocument();

    // Buttons
    expect(
      screen.getByRole('button', { name: /charts/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /data tables/i })
    ).toBeInTheDocument();
  });

  test('renders connection paths between icons', () => {
    render(<DashboardPage />);

    // Check for SVG paths (querying by aria-label)
    const svgPaths = screen.getAllByLabelText(/connection path/i);
    expect(svgPaths).toHaveLength(2); // Two connection paths
  });

  test('button interaction', () => {
    render(<DashboardPage />);

    const chartsButton = screen.getByRole('button', { name: /charts/i });
    const dataTablesButton = screen.getByRole('button', { name: /data tables/i });

    // Ensure buttons render with correct text
    expect(chartsButton).toBeInTheDocument();
    expect(dataTablesButton).toBeInTheDocument();
  });
});
