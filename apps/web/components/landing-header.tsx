"use client";
import { Database } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="border-b fixed top-0 z-50 left-0 right-0 dark:bg-black/95 backdrop-blur dark:supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link className="flex items-center space-x-2 ml-4" href="/">
          <Database className="h-6 w-6 text-emerald-500" />
          <span className="font-bold dark:text-white text-black">Todoify</span>
        </Link>
        <nav className="flex flex-1 items-center justify-end mr-4 space-x-6">
          <Link
            className="text-sm dark:text-white text-black font-medium transition-colors hover:text-emerald-500"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm dark:text-white text-black font-medium transition-colors hover:text-emerald-500"
            href="#testimonials"
          >
            Testimonials
          </Link>
          <Link
            className="text-sm dark:text-white text-black font-medium transition-colors hover:text-emerald-500"
            href="#pricing"
          >
            Pricing
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
