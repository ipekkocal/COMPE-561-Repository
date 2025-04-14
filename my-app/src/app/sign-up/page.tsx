"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordCriteriaError, setPasswordCriteriaError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const validatePassword = (password: string): string => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[a-zA-Z]/.test(password)) {
      return "Password must include at least one letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must include at least one number.";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setPasswordCriteriaError(passwordError);
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch("http://127.0.0.1:8000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        setTimeout(() => { // Simulate a delay for better UX
          setLoading(false);
          router.push("/sign-in");
        }, 1000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail || "Registration failed.");
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unknown error occurred."
      );
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setPasswordCriteriaError(validatePassword(value));
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex justify-center items-center">
        <div className="container max-w-md px-4 py-8">
          {loading ? (
            <div className="text-center">
              <p className="text-lg font-medium">Signing you up...</p>
              <div className="mt-4 animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium">
                  First Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="mt-1 block w-full"
                />
              </div>

              <div>
                <Label htmlFor="lastName" className="block text-sm font-medium">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="mt-1 block w-full"
                />
              </div>

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
                {passwordCriteriaError && (
                  <p className="mt-2 text-sm text-red-500">
                    {passwordCriteriaError}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600"
              >
                Sign Up
              </Button>
            </form>
          )}
          {errorMessage && (
            <p className="mt-4 text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}