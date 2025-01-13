"use client";
import { tasks } from "@/data/mock-data";
import { TaskList } from "@/components/task-list";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

export default function RecentTasksPage() {
  const today: string = new Date().toISOString().split("T")[0];

  const overdue = tasks.filter(
    (task) => task.dueDate < today && !task.completed
  );
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardTitle className="text-2xl">Recent Tasks</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <TaskList
            onTaskUpdate={function (): void {
              throw new Error("Function not implemented.");
            }}
            tasks={overdue}
          />
        </CardContent>
      </Card>
    </div>
  );
}
