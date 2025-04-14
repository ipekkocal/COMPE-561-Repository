import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground dark:bg-muted dark:text-primary-foreground">
      <SiteHeader />
      <main className="flex-1 flex justify-center items-center">
        <div className="container max-w-3xl px-4 py-8">
          {/* Page Title */}
          <h1 className="text-4xl font-bold mb-6 text-center text-foreground dark:text-white">
            About FORECASTLY
          </h1>

          <div className="space-y-8">
            {/* Sections */}
            {[
              {
                title: "Our Mission",
                content:
                  "At FORECASTLY, we empower businesses with actionable insights into future sales trends. Our mission is to transform how you plan for the future by making advanced sales prediction accessible and intuitive for everyone.",
              },
              {
                title: "Who We Are",
                content:
                  "We are a dedicated team of developers, data scientists, and sales enthusiasts passionate about simplifying sales forecasting. Whether you're an entrepreneur, a small business owner, or curious about predicting sales patterns, we're here to help you navigate market trends with confidence.",
              },
              {
                title: "Why Choose FORECASTLY",
                content: (
                  <ul className="list-disc pl-6 space-y-2 text-foreground dark:text-primary-foreground">
                    <li>
                      <strong>Accurate Predictions:</strong> Powered by advanced machine learning
                      algorithms that adapt to market changes.
                    </li>
                    <li>
                      <strong>User-Friendly Design:</strong> Intuitive interface suitable for both
                      tech-savvy users and newcomers.
                    </li>
                    <li>
                      <strong>Tailored Insights:</strong> Personalized forecasts to inform your
                      business decisions.
                    </li>
                    <li>
                      <strong>Inclusive Platform:</strong> Suitable for individual sellers and
                      growing businesses alike.
                    </li>
                  </ul>
                ),
              },
              {
                title: "What Sets Us Apart",
                content:
                  "FORECASTLY goes beyond simple projections. We focus on identifying and adapting to unpredictable shifts in sales trends, ensuring you stay ahead in dynamic market conditions.",
              },
            ].map((section, index) => (
              <div
                key={index}
                className="bg-muted dark:bg-muted-foreground shadow-md rounded-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-500 to-green-500 p-4">
                  <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                </div>
                <div className="p-4 text-foreground dark:text-primary-foreground">
                  {typeof section.content === "string" ? (
                    <p>{section.content}</p>
                  ) : (
                    section.content
                  )}
                </div>
              </div>
            ))}

            {/* Call-to-Action */}
            <div className="text-center">
              <p className="text-xl font-semibold text-foreground dark:text-white">
                Start your journey with FORECASTLY today and shape your sales future with
                confidence!
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
