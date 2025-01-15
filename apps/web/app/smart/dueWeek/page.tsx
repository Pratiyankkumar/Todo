"use client";

import { tasks } from "@/data/mock-data";
import { TaskList } from "@/components/task-list";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

export default function DueTasksPage() {
  const today = new Date();
  const thisWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const dueThisWeek = tasks.filter(
    (task) =>
      new Date(task.dueDate) <= thisWeek && new Date(task.dueDate) >= today
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardTitle className="text-2xl">Due This Week</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <TaskList
            tasks={dueThisWeek}
            onTaskUpdate={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
