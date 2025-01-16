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
  const dueTasks = tasks.filter((task) => task.category === "Personal");

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardTitle className="text-2xl">Perosnal</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <TaskList
            tasks={dueTasks}
            onTaskUpdate={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
