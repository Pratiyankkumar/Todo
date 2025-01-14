"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Clock,
  AlertCircle,
  ArrowRight,
  CalendarClock,
  ListTodo,
  AlertTriangle,
  BarChart3,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { tasks } from "@/data/mock-data";
// import { Task } from "@/data/mock-data";

// interface SmartListsProps {
//   tasks: Task[];
//   user: {
//     id: string;
//     name: string;
//   };
// }

export default function SmartListsDashboard() {
  // Calculate statistics
  const today = new Date();
  const thisWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const thisMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

  const dueThisWeek = tasks.filter(
    (task) =>
      new Date(task.dueDate) <= thisWeek && new Date(task.dueDate) >= today
  );

  const dueThisMonth = tasks.filter(
    (task) =>
      new Date(task.dueDate) <= thisMonth && new Date(task.dueDate) >= today
  );

  const highPriority = tasks.filter((task) => task.priority === "High");
  const inProgress = tasks.filter((task) => task.status === "In Progress");
  const completedTasks = tasks.filter((task) => task.status === "Completed");
  const recentlyCreated = [...tasks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Sample data for the timeline chart
  const timelineData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    return {
      date: date.toLocaleDateString(),
      tasks: tasks.filter(
        (task) => new Date(task.dueDate).toDateString() === date.toDateString()
      ).length,
    };
  });

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Work":
        return "text-blue-500 bg-blue-100 dark:bg-blue-900/30";
      case "Personal":
        return "text-purple-500 bg-purple-100 dark:bg-purple-900/30";
      case "Household":
        return "text-teal-500 bg-teal-100 dark:bg-teal-900/30";
      default:
        return "text-gray-500 bg-gray-100 dark:bg-gray-900/30";
    }
  };

  return (
    <div className="space-y-6 ml-4 mb-4 mr-[16px] md:mr-4">
      {/* Statistics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {inProgress.length} in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Due This Week</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dueThisWeek.length}</div>
            <p className="text-xs text-muted-foreground">
              {dueThisMonth.length} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highPriority.length}</div>
            <p className="text-xs text-muted-foreground">
              High priority tasks needing attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((completedTasks.length / tasks.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {completedTasks.length} of {tasks.length} tasks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Task Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="tasks"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Due Soon */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Due Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dueThisWeek.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="line-clamp-1 font-medium">{task.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant="secondary"
                      className={getPriorityColor(task.priority)}
                    >
                      {task.priority}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={getCategoryColor(task.category)}
                    >
                      {task.category}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full" size="sm">
                View all <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* High Priority */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {highPriority.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="line-clamp-1 font-medium">{task.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarClock className="h-4 w-4" />
                      {task.status}
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={getCategoryColor(task.category)}
                  >
                    {task.category}
                  </Badge>
                </div>
              ))}
              <Button variant="ghost" className="w-full" size="sm">
                View all <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recently Created */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recently Created</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentlyCreated.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="line-clamp-1 font-medium">{task.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {new Date(task.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant="secondary"
                      className={getPriorityColor(task.priority)}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full" size="sm">
                View all <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Important Alert */}
      {highPriority.length > 5 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>High Priority Tasks Alert</AlertTitle>
          <AlertDescription>
            You have {highPriority.length} high priority tasks that need
            attention.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
