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
  const thisMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

  const dueThisMonth = tasks.filter(
    (task) =>
      new Date(task.dueDate) <= thisMonth && new Date(task.dueDate) >= today
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardTitle className="text-2xl">Due This Month</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <TaskList
            tasks={dueThisMonth}
            onTaskUpdate={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
