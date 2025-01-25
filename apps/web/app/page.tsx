"use client";

import React from "react";
import { Header } from "@/components/landing-header";
import { HeroScrollDemo } from "@/components/scroll-animation";
import { MeteorsDemo } from "@/components/Card";
import ProjectButtons from "@/components/AuthButtons";
import { TechCard } from "@workspace/ui/components/tech-card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center dark:bg-black text-black dark:text-white bg-white">
      <Header />

      <main className="flex flex-col w-full mt-14 items-center text-center">
        <div className="mt-8 flex flex-col items-center text-center gap-2">
          <p className="text-7xl font-semibold">Master Your Tasks</p>
          <p className="text-7xl font-semibold text-emerald-400">
            Simplify Your Day
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center text-center gap-2">
          <p className="text-xl text-gray-400">
            Your personal task manager to keep you organized and productive.
          </p>
          <p className="text-xl font-bold text-gray-400">
            Track, plan, and achieve your goals effortlessly.
          </p>
        </div>

        <ProjectButtons />

        <p className="text-7xl mt-10 mb-8 font-semibold text-emerald-400">
          Features
        </p>

        <div className="flex flex-row flex-wrap  w-full justify-center items-center gap-y-16 gap-8">
          <MeteorsDemo
            heading="Streamline Your Tasks"
            para="Organize your to-do list, mark tasks complete, and stay on top of your daily priorities. Our comprehensive todo app puts you in control of your productivity."
          />
          <MeteorsDemo
            heading="Build Consistent Habits"
            para="Log your daily habits and watch your progress grow. Track your routines, set reminders, and celebrate small wins to keep your momentum going."
          />
          <MeteorsDemo
            heading="Conquer Time Management"
            para="Work in focused sprints and take scheduled breaks. Our Pomodoro timer helps you stay on task and avoid burnout."
          />
          <MeteorsDemo
            heading="Stay Motivated"
            para="Track your task completion rates, habit streaks, and time management efficiency. Customize your dashboard to see the metrics that matter most."
          />
        </div>

        <HeroScrollDemo />
        <p className="text-7xl mt-10 mb-8 font-semibold text-emerald-400">
          Tech Used
        </p>
        <TechCard />
      </main>
    </div>
  );
}
