import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="w-full bg-blue-600 text-white">
      <div className="container mx-auto px-6 py-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">MY ACCOUNT</h3>
            <div className="flex flex-col items-start gap-2">
              <Link href="/sign-in" className="hover:underline">
                Sign In
              </Link>
              <Link href="/sign-up" className="hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">ABOUT</h3>
            <div className="flex flex-col items-start gap-2">
              <Link href="/about#our-mission" className="hover:underline">
                Our Mission
              </Link>
              <Link href="/about#who-we-are" className="hover:underline">
                Who We Are
              </Link>
              <Link href="/about#why-choose-us" className="hover:underline">
                Why Choose FORECASTLY
              </Link>
              <Link href="/about#what-sets-us-apart" className="hover:underline">
                What Sets Us Apart
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">HELP</h3>
            <div className="flex flex-col items-start gap-2">
              <Link href="/faq" className="hover:underline">
                FAQ
              </Link>
            </div>
          </div>
        </div>

        {/* Social Media Icons with Tooltips */}
        <div className="flex justify-center md:justify-end mt-6 gap-4">
          <Link
            href="https://instagram.com/forecastly"
            className="group relative p-2 bg-white rounded-full shadow hover:scale-105 transition"
            aria-label="Instagram"
          >
            <Instagram className="h-6 w-6 text-blue-600" />
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:inline-block bg-black text-white text-xs rounded-md px-2 py-1">
              Instagram
            </span>
          </Link>
          <Link
            href="https://twitter.com/forecastly"
            className="group relative p-2 bg-white rounded-full shadow hover:scale-105 transition"
            aria-label="Twitter"
          >
            <Twitter className="h-6 w-6 text-blue-600" />
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:inline-block bg-black text-white text-xs rounded-md px-2 py-1">
              Twitter
            </span>
          </Link>
          <Link
            href="https://facebook.com/forecastly"
            className="group relative p-2 bg-white rounded-full shadow hover:scale-105 transition"
            aria-label="Facebook"
          >
            <Facebook className="h-6 w-6 text-blue-600" />
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:inline-block bg-black text-white text-xs rounded-md px-2 py-1">
              Facebook
            </span>
          </Link>
        </div>

        {/* Footer Attribution */}
        <div className="mt-4 text-center text-sm text-gray-300">
          &copy; 2024 Forecastly. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
