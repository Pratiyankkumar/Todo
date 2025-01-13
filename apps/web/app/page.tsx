"use client";

import Link from "next/link";
import { Header } from "@/components/landing-header";
import { Button } from "@workspace/ui/components/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Acme Dashboard
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Streamline your workflow, boost productivity, and make
                  data-driven decisions with our powerful dashboard solution.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/today">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <svg
                  className=" h-12 w-12 mb-4 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
                <h3 className="text-xl font-bold mb-2">Real-time Analytics</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Get instant insights with our powerful real-time analytics
                  engine.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <svg
                  className=" h-12 w-12 mb-4 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
                  <path d="m16 8-4 4-2-2" />
                </svg>
                <h3 className="text-xl font-bold mb-2">Task Management</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Stay organized and boost productivity with our intuitive task
                  management system.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <svg
                  className=" h-12 w-12 mb-4 text-primary"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <h3 className="text-xl font-bold mb-2">Advanced Security</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Rest easy knowing your data is protected by state-of-the-art
                  security measures.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Acme Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
