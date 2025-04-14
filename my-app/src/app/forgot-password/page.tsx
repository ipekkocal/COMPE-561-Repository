"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function PasswordResetPage() {
  const [step, setStep] = useState<"request" | "reset">("request");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handlePasswordResetRequest = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/users/password-reset-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email }),
        }
      );

      if (response.ok) {
        setMessage("Verification code sent to your email.");
        setStep("reset");
      } else {
        const errorData = await response.json().catch(() => null);
        setMessage(errorData?.detail || "Failed to send verification code.");
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      );
    }
  };

  const handlePasswordReset = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/users/password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          verification_code: verificationCode,
          new_password: newPassword,
        }),
      });

      if (response.ok) {
        setMessage("Password reset successful! You can now log in with your new password.");
        setStep("request");
      } else {
        const errorData = await response.json().catch(() => null);
        setMessage(errorData?.detail || "Failed to reset password.");
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground dark:bg-muted dark:text-primary-foreground">
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <h1 className="text-5xl font-bold mb-8 text-center text-foreground dark:text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
            Password Reset
          </span>
        </h1>

        {step === "request" && (
          <div className="w-full max-w-md bg-card text-foreground dark:bg-card-foreground dark:text-primary-foreground rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Request Verification Code</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full mb-4 text-sm border border-gray-300 rounded-lg bg-white dark:bg-white dark:text-gray-900 p-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full mb-4 text-sm border border-gray-300 rounded-lg bg-white dark:bg-white dark:text-gray-900 p-2"
            />
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-10 py-3 rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-200 hover:scale-105"
              onClick={handlePasswordResetRequest}
            >
              Request Code
            </Button>
          </div>
        )}

        {step === "reset" && (
          <div className="w-full max-w-md bg-card text-foreground dark:bg-card-foreground dark:text-primary-foreground rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
            <input
              type="text"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="block w-full mb-4 text-sm border border-gray-300 rounded-lg bg-background dark:bg-muted dark:border-gray-600 p-2"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block w-full mb-4 text-sm border border-gray-300 rounded-lg bg-background dark:bg-muted dark:border-gray-600 p-2"
            />
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-10 py-3 rounded-lg shadow-md hover:shadow-lg transform transition-transform duration-200 hover:scale-105"
              onClick={handlePasswordReset}
            >
              Reset Password
            </Button>
          </div>
        )}

        {message && (
          <p
            className={`mt-4 text-sm text-center ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
