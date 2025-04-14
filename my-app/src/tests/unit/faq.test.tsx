import { render, screen, fireEvent } from '@testing-library/react';
import FAQPage from '@/app/faq/page'; 
import { Pen } from 'lucide-react';

// Mock the necessary components and hooks
jest.mock('lucide-react', () => ({
  Pen: jest.fn(() => <div data-testid="icon-pen" />),
}));

// Mock SiteHeader and SiteFooter components to avoid issues with routing or external dependencies
jest.mock('@/components/site-header', () => ({
  SiteHeader: jest.fn(() => <div data-testid="mock-header" />),
}));

jest.mock('@/components/site-footer', () => ({
  SiteFooter: jest.fn(() => <div data-testid="mock-footer" />),
}));

// Mock next/router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

describe('FAQPage', () => {
  test('renders all FAQs', () => {
    render(<FAQPage />);

    // Verify the first FAQ question and answer are displayed
    expect(screen.getByText(/What types of businesses can benefit from Forecastly?/i)).toBeInTheDocument();
    expect(screen.getByText(/Forecastly is designed to meet the needs/i)).toBeInTheDocument();

    // Verify the second FAQ question and answer are displayed
    expect(screen.getByText(/How does Forecastly ensure accurate sales predictions?/i)).toBeInTheDocument();
    expect(screen.getByText(/Forecastly leverages advanced machine learning/i)).toBeInTheDocument();

    // Verify the third FAQ question and answer are displayed
    expect(screen.getByText(/Is Forecastly easy to use for beginners?/i)).toBeInTheDocument();
    expect(screen.getByText(/Absolutely! Forecastly features an intuitive/i)).toBeInTheDocument();
  });

  test('renders the Pen icon next to each question', () => {
    render(<FAQPage />);

    // Verify the Pen icon appears next to each question
    expect(screen.getAllByTestId('icon-pen')).toHaveLength(3); // Should be 3, one for each FAQ question
  });

  test('adds a new FAQ question', () => {
    render(<FAQPage />);

    // Type a new question
    const newQuestionInput = screen.getByPlaceholderText(/Enter your question/i);
    fireEvent.change(newQuestionInput, { target: { value: 'What is the price of Forecastly?' } });

    // Submit the new question
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Verify the new question has been added to the list of FAQs
    expect(screen.getByText(/What is the price of Forecastly?/i)).toBeInTheDocument();
    expect(screen.getByText(/This answer will be added later./i)).toBeInTheDocument();
  });

  test('does not add an empty question', () => {
    render(<FAQPage />);

    // Try submitting an empty question
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    // Verify the FAQ list hasn't changed (no empty question added)
    expect(screen.queryByText(/This answer will be added later./i)).not.toBeInTheDocument();
  });
});
