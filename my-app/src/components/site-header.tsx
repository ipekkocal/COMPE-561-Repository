"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function SiteHeader() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    const newTheme = !isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleLogin = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <header className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-md">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8 max-w-full">
        {/* Left Section: Logo and FORECASTLY */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <Image
            src="/forecastly_logo.png"
            alt="Forecastly Logo"
            width={60}
            height={60}
            priority
            className="object-contain"
          />
          <Link
            href="/"
            className="text-xl font-extrabold text-blue-600 dark:text-blue-400 hover:underline transition"
          >
            FORECASTLY
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-4 whitespace-nowrap">
            {[{ name: "About", href: "/about" }, { name: "FAQ", href: "/faq" }].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="px-3 py-1 text-sm font-medium rounded-md bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section: Search, Dark Mode, User, and Login Button */}
        <div className="flex items-center gap-4 justify-end flex-shrink-0 w-auto">
          {/* Search Input */}
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-600 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md border border-gray-300 dark:border-gray-600 w-full"
              aria-label="Search"
            />
          </div>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none transition-transform transform hover:scale-105"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-900 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m8.485-7.485h1M4.515 12.515h1M16.949 7.05l.707-.707M6.343 17.657l.707-.707M17.657 17.657l-.707-.707M7.05 7.05l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-900 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 1010.79 9.79z"
                />
              </svg>
            )}
          </button>

          {/* User Dropdown */}
          <div className="relative flex-shrink-0" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center px-3 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 rounded-md"
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
            >
              User
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-4 w-4 text-gray-900 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg">
                <Link
                  href="/sign-in"
                  className="block px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="block px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Sign Up
                </Link>
                <div className="border-t border-gray-300 dark:border-gray-600 my-1" />
                <Link
                  href="/update-username"
                  className="block px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Update Username
                </Link>
                <Link
                  href="/update-password"
                  className="block px-4 py-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Update Password
                </Link>
              </div>
            )}
          </div>

          {/* Login/Logout Icon Button */}
          <button
            onClick={() => {
              if (pathname === "/product") {
                toggleLogin();
              } else {
                router.push("/product");
              }
            }}
            className={`flex items-center justify-center w-10 h-10 rounded-md transition ${
              pathname === "/product" && !isLoggedIn
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            aria-label={isLoggedIn ? "Logged In" : "Logged Out"}
          >
            {isLoggedIn ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1s2.2 4.9 4.9 4.9zM12 14.3c-3.3 0-9.8 1.7-9.8 5v1.7h19.5v-1.7c-.2-3.3-6.6-5-9.8-5z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 16l-4-4 4-4v3h8v2h-8v3zm1-16H3C1.3 0 0 1.3 0 3v18c0 1.7 1.3 3 3 3h8c1.7 0 3-1.3 3-3v-3h-2v3H3V3h8V0z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
