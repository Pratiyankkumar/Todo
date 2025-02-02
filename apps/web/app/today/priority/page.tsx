"use client";
import { TaskList } from "@/components/task-list";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { useTodo } from "@/contexts/TodoContext";

export default function PriorityTasksPage() {
  const { getTodo } = useTodo();
  const tasks = getTodo();

  const priorityTasks =
    tasks && tasks.filter((task) => task.priority === "High");

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardTitle className="text-2xl">Priority Tasks</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {priorityTasks && (
            <TaskList
              onTaskUpdate={function (): void {
                throw new Error("Function not implemented.");
              }}
              tasks={priorityTasks}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
