"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header"; // Import the header component
import { SiteFooter } from "@/components/site-footer"; // Import the footer component

export default function UpdatePasswordPage() {
  const [formData, setFormData] = useState({
    previousPassword: "",
    newPassword: "",
    confirmPassword: "",
    username: "",
    email: "",
  });
  const [message, setMessage] = useState(""); // Success or error messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/users/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          previous_password: formData.previousPassword,
          new_password: formData.newPassword,
          username: formData.username,
          email: formData.email,
        }),
      });

      if (response.ok) {
        setMessage("Password updated successfully!");
      } else {
        const errorData = await response.json();
        setMessage(errorData.detail || "Password update failed.");
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground dark:bg-muted dark:text-primary-foreground">
      <SiteHeader />

      <main className="flex-1 flex justify-center items-center">
        <div className="container max-w-3xl px-4 py-8">
          <h1 className="text-4xl font-bold mb-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
              Update Password
            </span>
          </h1>

          <div className="space-y-8 bg-card dark:bg-card-foreground shadow-md rounded-lg p-4">
            {[
              { id: "previousPassword", label: "Previous Password", type: "password" },
              { id: "newPassword", label: "New Password", type: "password" },
              { id: "confirmPassword", label: "Confirm New Password", type: "password" },
              { id: "username", label: "Username", type: "text" },
              { id: "email", label: "Email", type: "email" },
            ].map((field) => (
              <div key={field.id} className="mb-4">
                <Label htmlFor={field.id} className="block text-sm font-medium">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  value={formData[field.id as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                  className="mt-1"
                />
              </div>
            ))}

            <Button
              type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              onClick={handleSubmit}
            >
              Update Password
            </Button>

            {message && (
              <p
                className={`mt-4 text-sm ${
                  message.includes("success") ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
