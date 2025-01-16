"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Activity,
  Lock,
  Database,
  Clock,
  ListChecks,
  CalendarDays,
  FileCheck2,
} from "lucide-react";

export function Header() {
  return (
    <header className="dark:border-b fixed top-0 left-0 right-0 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link className="flex items-center space-x-2 ml-4" href="/">
          <Database className="h-6 w-6 text-emerald-500" />
          <span className="font-bold">Todoify</span>
        </Link>
        <nav className="flex flex-1 items-center justify-end mr-4 space-x-6">
          <Link
            className="text-sm font-medium transition-colors hover:text-emerald-500"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium transition-colors hover:text-emerald-500"
            href="#testimonials"
          >
            Testimonials
          </Link>
          <Link
            className="text-sm font-medium transition-colors hover:text-emerald-500"
            href="#pricing"
          >
            Pricing
          </Link>
          <Button className="hidden sm:inline-flex bg-emerald-500 hover:bg-emerald-600">
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />
      <main className="flex-1">
        <section className="container space-y-12 px-4 md:px-6 pb-8 pt-32 md:pb-12 md:pt-40 lg:py-32">
          <div className="flex flex-col items-center gap-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Master Your Tasks
              <span className="block text-emerald-500 mt-4">
                Simplify Your Day
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
            >
              Your personal task manager to keep you organized and productive.
              Track, plan, and achieve your goals effortlessly.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link href={"/today"}>
                <Button
                  className="bg-emerald-500 hover:bg-emerald-600"
                  size="lg"
                >
                  Go To Dashboard
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section
          id="features"
          className="container px-4 md:px-6 py-12 md:py-12 lg:py-32"
        >
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            Everything You Need to Stay Organized
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative p-[1px] overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 animate-border-move rounded-lg" />
              <Card className="relative bg-black rounded-lg border-0">
                <CardContent className="p-6">
                  <Activity className="h-12 w-12 mb-4 text-emerald-500" />
                  <h3 className="text-xl font-bold mb-2 text-white">
                    Real-Time Updates
                  </h3>
                  <p className="text-gray-400">
                    Stay in sync with real-time task updates across all your
                    devices.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="relative p-[1px] overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 animate-border-move rounded-lg" />
              <Card className="relative bg-black rounded-lg border-0">
                <CardContent className="p-6">
                  <Clock className="h-12 w-12 mb-4 text-emerald-500" />
                  <h3 className="text-xl font-bold mb-2 text-white">
                    Time Tracking
                  </h3>
                  <p className="text-gray-400">
                    Monitor your time spent on tasks and projects efficiently
                    with Analytics.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="relative p-[1px] overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-border-move rounded-lg" />
              <Card className="relative bg-black rounded-lg border-0">
                <CardContent className="p-6">
                  <ListChecks className="h-12 w-12 mb-4 text-emerald-500" />
                  <h3 className="text-xl font-bold mb-2 text-white">
                    Task Lists
                  </h3>
                  <p className="text-gray-400">
                    Create and customize task lists to match your workflow and
                    way of work.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="relative p-[1px] overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-border-move rounded-lg" />
              <Card className="relative bg-black rounded-lg border-0">
                <CardContent className="p-6">
                  <CalendarDays className="h-12 w-12 mb-4 text-emerald-500" />
                  <h3 className="text-xl font-bold mb-2 text-white">
                    Calendar Sync
                  </h3>
                  <p className="text-gray-400">
                    Integrate tasks with your calendar for better scheduling.
                    Calendar Available
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="relative p-[1px] overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 animate-border-move rounded-lg" />
              <Card className="relative bg-black rounded-lg border-0">
                <CardContent className="p-6">
                  <Lock className="h-12 w-12 mb-4 text-emerald-500" />
                  <h3 className="text-xl font-bold mb-2 text-white">
                    Secure Data
                  </h3>
                  <p className="text-gray-400">
                    Your tasks are protected with top-notch security measures.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="relative p-[1px] overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-border-move rounded-lg" />
              <Card className="relative bg-black rounded-lg border-0">
                <CardContent className="p-6">
                  <FileCheck2 className="h-12 w-12 mb-4 text-emerald-500" />
                  <h3 className="text-xl font-bold mb-2 text-white">
                    Insights & Reports
                  </h3>
                  <p className="text-gray-400">
                    Analyze task completion trends and productivity reports in
                    Analytics.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 px-4 md:px-6">
          <p className="text-xs text-gray-400">
            © 2025 Todoify Inc. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs text-gray-400 hover:underline underline-offset-4"
              href="#"
            >
              Terms
            </Link>
            <Link
              className="text-xs text-gray-400 hover:underline underline-offset-4"
              href="#"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
