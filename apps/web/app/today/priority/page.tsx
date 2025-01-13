"use client";
import { tasks } from "@/data/mock-data";
import { TaskList } from "@/components/task-list";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

export default function PriorityTasksPage() {
  const priorityTasks = tasks.filter((task) => task.priority === "1");

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardTitle className="text-2xl">Priority Tasks</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <TaskList
            onTaskUpdate={function (): void {
              throw new Error("Function not implemented.");
            }}
            tasks={priorityTasks}
          />
        </CardContent>
      </Card>
    </div>
  );
}
