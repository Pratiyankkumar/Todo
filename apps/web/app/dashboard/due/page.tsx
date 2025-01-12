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
  const dueTasks = tasks.filter((task) => new Date(task.dueDate) <= new Date());

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardTitle className="text-2xl">Due Tasks</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <TaskList tasks={dueTasks} />
        </CardContent>
      </Card>
    </div>
  );
}
