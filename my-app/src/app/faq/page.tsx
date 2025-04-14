"use client"; // Declare this file as a Client Component

import { useState } from "react";
import { Pen } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([
    {
      question: "What types of businesses can benefit from Forecastly?",
      answer:
        "Forecastly is designed to meet the needs of a wide range of users, from individual sellers and small business owners to entrepreneurs and growing enterprises. Whether you're planning inventory, budgeting for growth, or identifying sales trends, our platform adapts to your unique needs to provide actionable insights.",
    },
    {
      question: "How does Forecastly ensure accurate sales predictions?",
      answer:
        "Forecastly leverages advanced machine learning algorithms that continuously adapt to market changes. By analyzing historical sales data and identifying patterns, our models provide reliable and precise forecasts tailored to your business requirements.",
    },
    {
      question: "Is Forecastly easy to use for beginners?",
      answer:
        "Absolutely! Forecastly features an intuitive, user-friendly design suitable for all experience levels. Whether you're tech-savvy or new to sales prediction tools, our platform guides you through the process, ensuring you gain valuable insights with minimal effort.",
    },
  ]);

  const [newQuestion, setNewQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newQuestion) {
      setFaqs([
        ...faqs,
        {
          question: newQuestion,
          answer: "This answer will be added later.",
        },
      ]);
      setNewQuestion("");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground dark:bg-muted dark:text-primary-foreground">
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="container max-w-2xl px-4 py-8">
          {/* FAQ Items */}
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-muted rounded-lg shadow-md dark:bg-muted-foreground">
                    <Pen className="h-6 w-6 text-primary dark:text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-foreground dark:text-white">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Question Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="newQuestion"
                className="block text-sm font-medium mb-1 text-foreground dark:text-white"
              >
                New Question
              </label>
              <input
                id="newQuestion"
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 bg-white dark:bg-muted-foreground"
                placeholder="Enter your question"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
