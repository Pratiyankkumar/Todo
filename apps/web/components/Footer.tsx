"use client";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row md:py-8">
        {/* Left Section: Copyright */}
        <div className="text-center md:text-left">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Todoify. All rights reserved.
          </p>
        </div>

        {/* Right Section: Additional Links */}
        <div className="flex items-center space-x-4">
          <Link
            href="/privacy"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
