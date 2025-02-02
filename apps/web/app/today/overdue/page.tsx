"use client";
import { TaskList } from "@/components/task-list";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { useTodo } from "@/contexts/TodoContext";

export default function RecentTasksPage() {
  const { getTodo } = useTodo();

  const tasks = getTodo();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const today: any = new Date().toISOString().split("T")[0];
  console.log(typeof today);

  const overdue =
    tasks &&
    tasks.filter(
      (task) =>
        task.dueDate !== undefined &&
        task.dueDate < today &&
        task.status !== "Completed"
    );
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardTitle className="text-2xl">Overdue</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {overdue && (
            <TaskList
              onTaskUpdate={function (): void {
                throw new Error("Function not implemented.");
              }}
              tasks={overdue}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
