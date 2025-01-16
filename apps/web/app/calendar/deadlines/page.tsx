"use client";

import { useState } from "react";
import { tasks } from "@/data/mock-data";
import { UpcomingDeadlines } from "@/components/deadlines";

export default function CalendarPage() {
  const [currentTasks] = useState(tasks);

  return (
    <div className="container mx-auto px-4 py-8">
      <UpcomingDeadlines tasks={currentTasks} />
    </div>
  );
}
