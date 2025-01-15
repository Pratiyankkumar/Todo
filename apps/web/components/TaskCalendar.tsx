"use client";

import { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
  isToday,
  isBefore,
  isValid,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Task } from "@/data/mock-data";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@workspace/ui/components/dialog";
import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";

interface TaskCalendarProps {
  tasks: Task[];
}

export function TaskCalendar({ tasks }: TaskCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isCompactView, setIsCompactView] = useState(false);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const dateRange = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => {
    setCurrentMonth(
      (month) => new Date(month.getFullYear(), month.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      (month) => new Date(month.getFullYear(), month.getMonth() - 1, 1)
    );
  };

  // Safe date parsing function
  const safeParseDate = (dateString: string | undefined): Date | null => {
    if (!dateString) return null;
    try {
      const parsedDate = parseISO(dateString);
      return isValid(parsedDate) ? parsedDate : null;
    } catch {
      return null;
    }
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => {
      const taskDate = safeParseDate(task.createdAt);
      return taskDate && isSameDay(taskDate, date);
    });
  };

  const formatDate = (dateString: string | undefined): string => {
    const date = safeParseDate(dateString);
    return date ? format(date, "PPP") : "Date not available";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-500 bg-red-100 dark:bg-red-900/30";
      case "Medium":
        return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30";
      case "Low":
        return "text-green-500 bg-green-100 dark:bg-green-900/30";
      default:
        return "text-blue-500 bg-blue-100 dark:bg-blue-900/30";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl sm:text-2xl font-bold">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <div className="flex space-x-2">
            <Button
              onClick={prevMonth}
              variant="outline"
              size="icon"
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={nextMonth}
              variant="outline"
              size="icon"
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsCompactView(!isCompactView)}
            variant="outline"
            size="sm"
            className="hidden sm:flex"
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            {isCompactView ? "Expanded View" : "Compact View"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7  gap-1 sm:gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center overflow-hidden font-semibold p-1 sm:p-2 text-sm"
          >
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.charAt(0)}</span>
          </div>
        ))}
        {dateRange.map((date, i) => {
          const dayTasks = getTasksForDate(date);
          const isCurrentMonth = isSameMonth(date, currentMonth);
          const isPastDate = isBefore(date, new Date()) && !isToday(date);

          return (
            <div
              key={i}
              className={cn(
                "p-1 sm:p-2 border overflow-hidden rounded-lg transition-colors",
                isCurrentMonth
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-500",
                isToday(date) && "ring-2 ring-blue-500 dark:ring-blue-400",
                isPastDate && "opacity-75",
                isCompactView
                  ? "min-h-[80px]"
                  : "min-h-[100px] sm:min-h-[120px]",
                "relative"
              )}
            >
              <span
                className={cn(
                  "absolute top-1 left-1 text-xs sm:text-sm font-medium",
                  isToday(date) && "text-blue-600 dark:text-blue-400"
                )}
              >
                {format(date, "d")}
              </span>
              <div
                className={cn(
                  "mt-6 space-y-1",
                  isCompactView ? "max-h-[40px]" : "max-h-[80px]",
                  "overflow-y-auto scrollbar-hide scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
                )}
              >
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    className={cn(
                      "text-xs p-1 rounded overflow-hidden scrollbar-hide cursor-pointer hover:opacity-80 transition-opacity",
                      getPriorityColor(task.priority)
                    )}
                    onClick={() => setSelectedTask(task)}
                  >
                    <div className="truncate">
                      {isCompactView ? "•" : task.title}
                    </div>
                  </div>
                ))}
                {dayTasks.length > 0 && isCompactView && (
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {dayTasks.length} {dayTasks.length === 1 ? "task" : "tasks"}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {selectedTask?.title || "Task Details"}
            </DialogTitle>
            <DialogDescription className="text-sm opacity-75">
              Created:{" "}
              {selectedTask?.createdAt
                ? formatDate(selectedTask.createdAt)
                : "Date not available"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {selectedTask?.description || "No description available"}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge
                className={cn(
                  "font-medium",
                  getPriorityColor(selectedTask?.priority || "")
                )}
              >
                Priority: {selectedTask?.priority || "Not set"}
              </Badge>
              <Badge variant="outline">
                Category: {selectedTask?.category || "Uncategorized"}
              </Badge>
              <Badge variant="outline">
                Status: {selectedTask?.status || "Not set"}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Due:{" "}
              {selectedTask?.dueDate
                ? formatDate(selectedTask.dueDate)
                : "No due date"}
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setSelectedTask(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TaskCalendar;
