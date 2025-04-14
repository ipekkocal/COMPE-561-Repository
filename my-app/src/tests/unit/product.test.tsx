import { render, screen, fireEvent } from "@testing-library/react";
import ProductPage from "@/app/product/page";
import { useRouter, useSearchParams } from "next/navigation";

// Mocking useRouter and useSearchParams hooks from Next.js
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("ProductPage", () => {
  // Mock return value for useRouter
  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
  };

  // Mock return value for useSearchParams
  const mockSearchParams = {
    get: jest.fn(() => "123"), // Mock userId
  };

  // Setup mocks
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  test("handles file upload", () => {
    render(<ProductPage />);

    // Select file input element by its test id
    const fileInput = screen.getByTestId("file-input") as HTMLInputElement;

    // Create a mock file
    const file = new File(["dummy content"], "sales_data.csv", { type: "text/csv" });

    // Simulate file upload
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Assert that the file is correctly selected
    expect(fileInput.files![0]).toBe(file);
  });

  test("handles invalid file upload", () => {
    render(<ProductPage />);

    // Select file input element by its test id
    const fileInput = screen.getByTestId("file-input") as HTMLInputElement;

    // Create an invalid file (non-CSV)
    const invalidFile = new File(["dummy content"], "sales_data.txt", { type: "text/plain" });

    // Simulate file upload with invalid file
    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    // Assert that the error message is displayed
    expect(screen.getByText(/only csv files are allowed/i)).toBeInTheDocument();
  });

  // Uncomment and update as needed when form submission functionality is ready
  // test("handles form submission", () => {
  //   render(<ProductPage />);

  //   // Simulate form submission
  //   const submitButton = screen.getByText(/submit/i); // Assuming the button text is 'submit'
  //   fireEvent.click(submitButton);

  //   // Add your assertions to verify form submission
  //   expect(screen.getByText(/form submitted successfully/i)).toBeInTheDocument();
  // });

  // Uncomment and update as needed when charts/tables functionality is ready
  // test("shows prediction charts or tables", () => {
  //   render(<ProductPage />);

  //   // Assert that charts or tables are displayed
  //   expect(screen.getByTestId("prediction-charts")).toBeInTheDocument(); // Adjust test id based on UI
  // });
});
