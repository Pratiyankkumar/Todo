"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Task } from "@/data/mock-data";
import { CalendarDays } from "lucide-react";

interface UpcomingDeadlinesProps {
  tasks: Task[];
}

export function UpcomingDeadlines({ tasks }: UpcomingDeadlinesProps) {
  const sortedTasks = [...tasks]
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    )
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarDays className="mr-2 h-5 w-5" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {sortedTasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center">
              <span className="text-sm font-medium">{task.title}</span>
              <span className="text-sm text-gray-500">{task.dueDate}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
