"use client";

import React, { useState } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  parseISO,
  isValid,
  isSameDay,
  isToday,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  List,
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

interface WeeklyCalendarProps {
  tasks: Task[];
}

export function WeeklyCalendar({ tasks }: WeeklyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewType, setViewType] = useState<"schedule" | "list">("schedule");

  // Get the start and end of the current week
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

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

  const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const prevWeek = () => setCurrentDate(subWeeks(currentDate, 1));

  const timeSlots = Array.from({ length: 24 }, (_, i) =>
    format(new Date().setHours(i, 0, 0, 0), "h:mm a")
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-xl sm:text-2xl font-bold">
            {format(weekStart, "MMM d")} - {format(weekEnd, "MMM d, yyyy")}
          </h2>
          <div className="flex space-x-2">
            <Button
              onClick={prevWeek}
              variant="outline"
              size="icon"
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={nextWeek}
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
            onClick={() =>
              setViewType(viewType === "schedule" ? "list" : "schedule")
            }
            variant="outline"
            size="sm"
          >
            {viewType === "schedule" ? (
              <>
                <List className="h-4 w-4 mr-2" />
                List View
              </>
            ) : (
              <>
                <CalendarIcon className="h-4 w-4 mr-2" />
                Schedule View
              </>
            )}
          </Button>
        </div>
      </div>

      {viewType === "schedule" ? (
        <div className="grid grid-cols-8 gap-2">
          {/* Time labels column */}
          <div className="border-r">
            <div className="h-12"></div> {/* Header spacer */}
            {timeSlots.map((time) => (
              <div
                key={time}
                className="h-16 text-xs text-gray-500 pr-2 text-right"
              >
                {time}
              </div>
            ))}
          </div>

          {/* Days columns */}
          {weekDays.map((day) => (
            <div key={day.toString()} className="flex-1">
              <div
                className={cn(
                  "h-12 flex flex-col items-center justify-center font-semibold",
                  isToday(day) && "text-blue-600 dark:text-blue-400"
                )}
              >
                <div className="text-sm">{format(day, "EEE")}</div>
                <div className="text-xs">{format(day, "d")}</div>
              </div>
              <div className="relative">
                {timeSlots.map((time) => (
                  <div
                    key={time}
                    className="h-16 border-t border-gray-200 dark:border-gray-700"
                  ></div>
                ))}
                {getTasksForDate(day).map((task) => {
                  const taskDate = safeParseDate(task.createdAt);
                  const hour = taskDate ? taskDate.getHours() : 0;
                  return (
                    <div
                      key={task.id}
                      className={cn(
                        "absolute left-0 right-0 mx-1 p-1 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity",
                        getPriorityColor(task.priority)
                      )}
                      style={{ top: `${hour * 64 + 48}px` }}
                      onClick={() => setSelectedTask(task)}
                    >
                      <div className="truncate font-medium">{task.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {weekDays.map((day) => {
            const dayTasks = getTasksForDate(day);
            if (dayTasks.length === 0) return null;

            return (
              <div key={day.toString()} className="border rounded-lg p-4">
                <h3
                  className={cn(
                    "text-lg font-semibold mb-3",
                    isToday(day) && "text-blue-600 dark:text-blue-400"
                  )}
                >
                  {format(day, "EEEE, MMMM d")}
                </h3>
                <div className="space-y-2">
                  {dayTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 rounded-md bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => setSelectedTask(task)}
                    >
                      <div className="flex items-center space-x-3">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <span className="font-medium">{task.title}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {task.createdAt
                          ? format(
                              safeParseDate(task.createdAt) || new Date(),
                              "h:mm a"
                            )
                          : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

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

export default WeeklyCalendar;
