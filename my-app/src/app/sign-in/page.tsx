"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await fetch("http://127.0.0.1:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const userId = data.user_id; // Assuming 'user_id' is part of the API response
        setTimeout(() => { // Simulate a delay for better UX
          setLoading(false);
          router.push(`/product?user_id=${encodeURIComponent(userId)}`);
        }, 1000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail || "Login failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex justify-center items-center">
        <div className="container max-w-md px-4 py-8">
          {loading ? (
            <div className="text-center">
              <p className="text-lg font-medium">Signing you in...</p>
              <div className="mt-4 animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="block text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="mt-1 block w-full"
                />
              </div>

              <div>
                <Label htmlFor="username" className="block text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter your username"
                  className="mt-1 block w-full"
                />
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="mt-1 block w-full"
                />
              </div>

              <Button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600"
              >
                Sign In
              </Button>
            </form>
          )}

          {errorMessage && (
            <p className="mt-4 text-sm text-red-500">{errorMessage}</p>
          )}

          <p className="mt-6 text-center text-sm">
            Don’t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              Create an account
            </Link>
          </p>
          <p className="mt-6 text-center text-sm">
            Forgot your password?{" "}
            <Link
              href="/forgot-password"
              className="text-blue-500 hover:text-blue-700 underline"
            >
              Change your password
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
