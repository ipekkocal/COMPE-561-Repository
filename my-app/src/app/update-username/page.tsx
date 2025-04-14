"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function UpdateUsernamePage() {
  const [newUsername, setNewUsername] = useState("");
  const [previousUsername, setPreviousUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateUsername = async () => {
    if (!previousUsername || !newUsername || !password || !email) {
      setMessage("Please fill in all the required fields.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/users/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          previous_user_name: previousUsername,
          new_user_name: newUsername,
          password,
          email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Username updated successfully to: ${data.username}`);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || "Failed to update username"}`);
      }
    } catch (error) {
      setMessage(error instanceof Error ? `Error: ${error.message}` : "An unknown error occurred.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground dark:bg-muted dark:text-primary-foreground">
      <SiteHeader />
      <main className="flex-1 flex justify-center items-center">
        <div className="container max-w-3xl px-4 py-8">
          <h1 className="text-4xl font-bold mb-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
              Update Username
            </span>
          </h1>
          <div className="space-y-8 bg-card dark:bg-card-foreground shadow-md rounded-lg p-4">
            {["Previous Username", "New Username", "Password", "Email"].map((label, index) => (
              <div key={index} className="mb-4">
                <Label htmlFor={label.replace(/\s+/g, "").toLowerCase()} className="block text-sm font-medium">
                  {label}
                </Label>
                <Input
                  id={label.replace(/\s+/g, "").toLowerCase()}
                  type={label === "Password" ? "password" : label === "Email" ? "email" : "text"}
                  value={
                    label === "Previous Username"
                      ? previousUsername
                      : label === "New Username"
                      ? newUsername
                      : label === "Password"
                      ? password
                      : email
                  }
                  onChange={(e) =>
                    label === "Previous Username"
                      ? setPreviousUsername(e.target.value)
                      : label === "New Username"
                      ? setNewUsername(e.target.value)
                      : label === "Password"
                      ? setPassword(e.target.value)
                      : setEmail(e.target.value)
                  }
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  className="mt-1"
                />
              </div>
            ))}
            <Button
              onClick={handleUpdateUsername}
              className="w-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Update Username
            </Button>
            {message && (
              <p className={`mt-4 text-sm ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
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
