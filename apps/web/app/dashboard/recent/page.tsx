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
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardTitle className="text-2xl">Recent Tasks</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <TaskList tasks={tasks} />
        </CardContent>
      </Card>
    </div>
  );
}
