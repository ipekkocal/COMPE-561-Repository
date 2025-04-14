"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, LineChart } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function ProductPage() {
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState<string>(""); // User ID
  const [product, setProduct] = useState<string>(""); // Product name
  const [fileError, setFileError] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const [showPredictions, setShowPredictions] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [predictionData, setPredictionData] = useState<any[]>([]);
  const [activeView, setActiveView] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10; // Define the number of items per page

  // Fetch user_id from query params on mount
  useEffect(() => {
    const userIdParam = searchParams.get("user_id");
    if (userIdParam) {
      setUserId(userIdParam);
    }
  }, [searchParams]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (selectedFile.type === "text/csv") {
        setFile(selectedFile);
        setFileError(""); // Clear any error
        setFileUploaded(true); // Indicate file is uploaded
      } else {
        setFileError("Only CSV files are allowed!"); // Show error for invalid file type
        setFileUploaded(false);
        setFile(null);
      }
    }
  };

  const handleSubmit = async () => {
    if (!fileUploaded || !file || !product) {
      setFileError("Please upload a valid CSV file and fill in all fields.");
      return;
    }
    if (!userId) {
      setFileError("You should login first to use the product");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/sales_data/upload?product=${encodeURIComponent(
          product
        )}&user_id=${encodeURIComponent(userId)}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setShowPredictions(true); // Show predictions if upload is successful
        setMessage("File uploaded successfully!");
        setFileError("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.detail || "File upload failed.");
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    }
  };

  const fetchPredictionData = async (view: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/sales_prediction/prediction?product=${encodeURIComponent(
          product
        )}&user_id=${encodeURIComponent(userId)}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPredictionData(data);
        setActiveView(view); // Set active view to "charts" or "tables"
      } else {
        const errorData = await response.json();
        setMessage(errorData.detail || "Failed to fetch predictions.");
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    }
  };

  const paginate = (data: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(predictionData.length / itemsPerPage);

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const drawChart = () => {
    if (!canvasRef.current || predictionData.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    const padding = 60;

    const maxPredicted = Math.max(...predictionData.map((d) => d.predicted_sales_amount));
    const minPredicted = Math.min(...predictionData.map((d) => d.predicted_sales_amount));

    const xScale = (width - padding * 2) / (predictionData.length - 1);
    const yScale = (height - padding * 2) / (maxPredicted - minPredicted || 1);

    // Draw axes
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Add axis labels
    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Dates", width / 2, height - 20);
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Sales Amount", 0, 0);
    ctx.restore();

    // Plot the data
    predictionData.forEach((data, index) => {
      const x = padding + index * xScale;
      const y = height - padding - (data.predicted_sales_amount - minPredicted) * yScale;

      if (index === 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      if (index === predictionData.length - 1) {
        ctx.strokeStyle = "green";
        ctx.stroke();
      }
    });

    // Highlight last 20% in blue
    const last20PercentIndex = Math.floor(predictionData.length * 0.8);
    ctx.beginPath();
    predictionData.slice(last20PercentIndex).forEach((data, index) => {
      const x = padding + (last20PercentIndex + index) * xScale;
      const y = height - padding - (data.predicted_sales_amount - minPredicted) * yScale;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.strokeStyle = "blue";
    ctx.stroke();
  };

  useEffect(() => {
    if (activeView === "charts") {
      drawChart();
    }
  }, [activeView, predictionData]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <SiteHeader />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
            Time to Predict
          </span>
        </h1>

        {/* Upload Section */}
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 mb-8">
          <p className="text-lg font-semibold text-green-600 text-center mb-4">
            Upload your sales data in CSV format!
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            data-testid="file-input"
          />
          {fileError && (
            <p className="text-red-600 mt-2 text-center">{fileError}</p>
          )}
          <input
            type="text"
            placeholder="Enter Product Name"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="block w-full mt-4 text-sm text-gray-700 border border-gray-300 rounded-lg bg-gray-50 p-2"
          />
        </div>

        {/* Submit Button */}
        <Button
          size="lg"
          className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-10 py-3 rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-200 hover:scale-105"
          onClick={handleSubmit}
        >
          Submit
        </Button>

        {message && (
          <p
            className={`mt-4 text-sm text-center ${
              message.includes("success") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Prediction Charts and Tables */}
        {showPredictions && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full max-w-4xl">
            <div
              onClick={() => fetchPredictionData("charts")}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 cursor-pointer"
              data-testid="prediction-charts"
            >
              <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-md">
                <LineChart className="h-10 w-10" />
              </div>
              <p className="mt-4 text-lg font-medium text-gray-800">
                Prediction Charts
              </p>
            </div>
            <div
              onClick={() => fetchPredictionData("tables")}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 cursor-pointer"
              data-testid="prediction-tables"
            >
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-md">
                <Calendar className="h-10 w-10" />
              </div>
              <p className="mt-4 text-lg font-medium text-gray-800">
                Prediction Tables
              </p>
            </div>
          </div>
        )}

        {activeView === "charts" && (
          <div className="mt-12 w-full max-w-4xl">
            <canvas ref={canvasRef} width={800} height={400} />
          </div>
        )}

        {activeView === "tables" && (
          <div className="mt-12 w-full max-w-4xl">
            <h3 className="text-xl font-semibold mb-4 text-center">Prediction Table</h3>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Dates</th>
                  <th className="border border-gray-300 px-4 py-2">Sales Amount</th>
                </tr>
              </thead>
              <tbody>
                {paginate(predictionData).map((item, index) => {
                  const isLast20Percent =
                    index >= Math.floor(predictionData.length * 0.8) - currentPage * itemsPerPage &&
                    index < Math.floor(predictionData.length * 0.8);
                  return (
                    <tr
                      key={index}
                      className={isLast20Percent ? "text-blue-500 font-semibold" : ""}
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {item.predicted_sales_date}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.predicted_sales_amount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-center mt-4 items-center">
              <button
                onClick={() => handlePageChange("prev")}
                className="mx-2 px-4 py-2 border rounded-lg bg-white text-blue-500"
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <span className="mx-4 text-lg font-medium">{currentPage}</span>
              <button
                onClick={() => handlePageChange("next")}
                className="mx-2 px-4 py-2 border rounded-lg bg-white text-blue-500"
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
