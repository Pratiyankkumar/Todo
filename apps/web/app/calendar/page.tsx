"use client";

import { useState } from "react";
import { TaskCalendar } from "@/components/TaskCalendar";
import { tasks } from "@/data/mock-data";

export default function CalendarPage() {
  const [currentTasks] = useState(tasks);

  return (
    <div className="container mx-auto px-4 py-8">
      <TaskCalendar tasks={currentTasks} />
    </div>
  );
}
