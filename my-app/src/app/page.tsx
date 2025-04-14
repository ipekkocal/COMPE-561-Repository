import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Importing PNGs from /components/ui
import fileUploadImage from "@/components/file_upload.png";
import forecastImage from "@/components/forecast.png";
import predictionGraphImage from "@/components/prediction_graph.png";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex justify-center items-center">
        <div className="container px-4 py-8">
          {/* Horizontal layout for visualization */}
          <div className="flex items-center justify-between gap-8">
            {/* Upload Sales Data Section */}
            <div className="flex flex-col items-center w-1/3">
              <Image
                src={fileUploadImage}
                alt="Upload Sales Data"
                width={100}
                height={100}
                className="rounded-md shadow-md"
              />
              <p className="text-xl font-semibold mt-4 text-foreground text-center">
                Upload your sales data
              </p>
            </div>

            {/* Arrow between Upload and Logo */}
            <svg
              className="w-8 h-8 text-primary animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>

            {/* Forecastly Logo and Name Section */}
            <div className="flex flex-col items-center w-1/3">
              <Image
                src={forecastImage}
                alt="Forecastly Logo"
                width={120}
                height={120}
                className="rounded-md"
              />
              <p className="text-xl font-semibold mt-4 text-foreground text-center">
                FORECASTLY
              </p>
            </div>

            {/* Arrow between Logo and Chart */}
            <svg
              className="w-8 h-8 text-primary animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>

            {/* Forecast Chart Section */}
            <div className="flex flex-col items-center w-1/3">
              <Image
                src={predictionGraphImage}
                alt="Forecast Chart"
                width={500}
                height={300}
                className="rounded-md shadow-md"
              />
              <p className="text-xl font-semibold mt-4 text-foreground text-center">
                Forecast Chart
              </p>
            </div>
          </div>

          {/* Description Section */}
          <div className="w-full p-8 bg-muted rounded-lg shadow-lg mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-4 text-center">
              Welcome to Our Sales Prediction Platform!
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This platform is your ultimate tool for forecasting next month's
              sales with precision and ease. Whether you're a professional
              seller, a small business owner, or just curious about future
              sales trends, our platform is here to provide actionable
              insights.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              By analyzing your previous sales data, we help you predict
              upcoming trends so you can make informed decisions. From
              clothing to technology or any other products, our
              user-friendly tool adapts to your needs, ensuring valuable
              forecasts tailored to your data.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              Perfect for seasoned sellers or newcomers exploring sales
              predictions, our platform makes future insights accessible to
              all. Start forecasting today and take control of your sales
              future!
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
