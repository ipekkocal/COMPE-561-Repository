import { Calendar, Cloud, LineChart } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <main className="flex-1">
      <div className="container px-4 py-8">
        <h2 className="text-2xl font-semibold text-center mb-12">How it works...</h2>
        <div className="flex justify-center items-center gap-8 mb-12">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <Calendar className="h-8 w-8" aria-label="Calendar Icon" data-testid="icon-calendar" />
            </div>
          </div>
          <div className="relative flex-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-1 bg-green-500" />
            </div>
            <div className="relative flex justify-center">
              <div className="w-12 h-6">
                <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="Connection Path" data-testid="connection-path-1">
                  <path
                    d="M 0,50 C 20,20 80,80 100,50"
                    stroke="rgb(34 197 94)"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <Cloud className="h-8 w-8" aria-label="Cloud Icon" data-testid="icon-cloud" />
            </div>
          </div>
          <div className="relative flex-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-1 bg-green-500" />
            </div>
            <div className="relative flex justify-center">
              <div className="w-12 h-6">
                <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="Connection Path" data-testid="connection-path-2">
                  <path
                    d="M 0,50 C 20,20 80,80 100,50"
                    stroke="rgb(34 197 94)"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <LineChart className="h-8 w-8" aria-label="Line Chart Icon" data-testid="icon-linechart" />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Button size="lg" className="w-full bg-green-500 hover:bg-green-600">
            CHARTS
          </Button>
          <Button size="lg" className="w-full bg-green-500 hover:bg-green-600">
            DATA TABLES
          </Button>
        </div>
      </div>
    </main>
  );
}
