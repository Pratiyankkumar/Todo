import React, { useMemo } from "react";
import {
  parseISO,
  isValid,
  format,
  isBefore,
  isToday,
  isTomorrow,
  addDays,
  differenceInDays,
} from "date-fns";
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { Task } from "@/data/mock-data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Progress } from "@workspace/ui/components/progress";
import { cn } from "@workspace/ui/lib/utils";

interface UpcomingDeadlinesProps {
  tasks: Task[];
  daysToShow?: number;
}

export function UpcomingDeadlines({
  tasks,
  daysToShow = 14,
}: UpcomingDeadlinesProps) {
  const safeParseDate = (dateString: string | undefined): Date | null => {
    if (!dateString) return null;
    try {
      const parsedDate = parseISO(dateString);
      return isValid(parsedDate) ? parsedDate : null;
    } catch {
      return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };
    return (
      colors[priority?.toLowerCase()] ||
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    );
  };

  const getStatusColor = (status: string) => {
    const colors = {
      completed:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "in progress":
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      overdue: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return (
      colors[status?.toLowerCase()] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    );
  };

  const formatDeadline = (date: Date) => {
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "MMM d, yyyy");
  };

  const getTimeRemaining = (dueDate: Date) => {
    const now = new Date();
    const days = differenceInDays(dueDate, now);
    if (days < 0) return "Overdue";
    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    return `${days} days remaining`;
  };

  const calculateProgress = (task: Task) => {
    const statusMap = {
      completed: 100,
      "in progress": 50,
      pending: 0,
    };
    return statusMap[task.status?.toLowerCase()] || 0;
  };

  const sortedTasks = useMemo(() => {
    const cutoffDate = addDays(new Date(), daysToShow);
    return tasks
      .filter((task) => {
        const dueDate = safeParseDate(task.dueDate);
        return dueDate && (isBefore(dueDate, cutoffDate) || isToday(dueDate));
      })
      .map((task) => ({
        ...task,
        parsedDueDate: safeParseDate(task.dueDate)!,
      }))
      .sort((a, b) => a.parsedDueDate.getTime() - b.parsedDueDate.getTime());
  }, [tasks, daysToShow]);

  const groupedTasks = useMemo(() => {
    const groups: { [key: string]: typeof sortedTasks } = {
      overdue: [],
      today: [],
      tomorrow: [],
      upcoming: [],
    };

    const now = new Date();
    sortedTasks.forEach((task) => {
      if (isBefore(task.parsedDueDate, now) && !isToday(task.parsedDueDate)) {
        groups.overdue.push(task);
      } else if (isToday(task.parsedDueDate)) {
        groups.today.push(task);
      } else if (isTomorrow(task.parsedDueDate)) {
        groups.tomorrow.push(task);
      } else {
        groups.upcoming.push(task);
      }
    });

    return groups;
  }, [sortedTasks]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overdue Tasks */}
          {groupedTasks.overdue.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Overdue
              </h3>
              {groupedTasks.overdue.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}

          {/* Today's Tasks */}
          {groupedTasks.today.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400">
                Today
              </h3>
              {groupedTasks.today.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}

          {/* Tomorrow's Tasks */}
          {groupedTasks.tomorrow.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-600 dark:text-gray-400">
                Tomorrow
              </h3>
              {groupedTasks.tomorrow.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}

          {/* Upcoming Tasks */}
          {groupedTasks.upcoming.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-600 dark:text-gray-400">
                Upcoming
              </h3>
              {groupedTasks.upcoming.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface TaskCardProps {
  task: Task & { parsedDueDate: Date };
}

function TaskCard({ task }: TaskCardProps) {
  const progress = calculateProgress(task);
  const isPastDue =
    isBefore(task.parsedDueDate, new Date()) && !isToday(task.parsedDueDate);

  return (
    <div className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium truncate">{task.title}</h4>
            <Badge
              variant="outline"
              className={cn(
                isPastDue ? "text-red-600 border-red-600" : "text-gray-600"
              )}
            >
              {formatDeadline(task.parsedDueDate)}
            </Badge>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
            {task.description}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
            <span className="text-xs text-gray-500">
              {getTimeRemaining(task.parsedDueDate)}
            </span>
          </div>
        </div>

        {task.status.toLowerCase() === "completed" ? (
          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
        ) : (
          <div className="w-12 flex-shrink-0">
            <Progress value={progress} className="h-1.5" />
            <span className="text-xs text-gray-500 mt-1 block text-center">
              {progress}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpcomingDeadlines;
