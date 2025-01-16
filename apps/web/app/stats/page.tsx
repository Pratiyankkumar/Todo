"use client";

import StatsDashboard from "@/components/StatsDashboard";
import { tasks } from "@/data/mock-data";

export default function Page() {
  return <StatsDashboard tasks={tasks} />;
}
