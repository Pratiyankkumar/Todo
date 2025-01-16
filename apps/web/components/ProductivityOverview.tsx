"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Clock, TrendingUp, Target, Zap } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  category: "Work" | "Personal" | "Household";
  status: "In Progress" | "Not Started" | "Completed";
  createdAt: string;
}

interface ProductivityProps {
  tasks: Task[];
}

export function ProductivityOverview({ tasks }: ProductivityProps) {
  // Calculate productivity metrics
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Tasks completed today
  const completedToday = tasks.filter(
    (task) =>
      task.status === "Completed" &&
      new Date(task.dueDate).toDateString() === today.toDateString()
  ).length;

  // Tasks completed this week
  const completedThisWeek = tasks.filter(
    (task) => task.status === "Completed" && new Date(task.dueDate) >= lastWeek
  ).length;

  // Calculate efficiency rate (completed tasks / total tasks for the week)
  const thisWeekTasks = tasks.filter(
    (task) => new Date(task.dueDate) >= lastWeek
  ).length;
  const efficiencyRate = thisWeekTasks
    ? ((completedThisWeek / thisWeekTasks) * 100).toFixed(1)
    : 0;

  // Calculate on-time completion rate
  const completedTasks = tasks.filter((task) => task.status === "Completed");
  const onTimeCompletions = completedTasks.filter(
    (task) => new Date(task.dueDate) >= new Date(task.createdAt)
  ).length;
  const onTimeRate = completedTasks.length
    ? ((onTimeCompletions / completedTasks.length) * 100).toFixed(1)
    : 0;

  // Daily productivity data
  const dailyProductivityData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const completed = tasks.filter(
      (task) =>
        task.status === "Completed" &&
        new Date(task.dueDate).toDateString() === date.toDateString()
    ).length;
    const created = tasks.filter(
      (task) => new Date(task.createdAt).toDateString() === date.toDateString()
    ).length;

    return {
      date: date.toLocaleDateString("en-US", { weekday: "short" }),
      completed,
      created,
    };
  }).reverse();

  const timeOfDayData = [
    { time: "Morning", tasks: 8 },
    { time: "Afternoon", tasks: 12 },
    { time: "Evening", tasks: 5 },
  ];

  return (
    <div className="space-y-6 ml-4 mr-4">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Today&lsquo;s Progress
            </CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedToday}</div>
            <p className="text-xs text-muted-foreground">
              Tasks completed today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Weekly Efficiency
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{efficiencyRate}%</div>
            <p className="text-xs text-muted-foreground">
              {completedThisWeek} tasks this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">On-time Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{onTimeRate}%</div>
            <p className="text-xs text-muted-foreground">
              Tasks completed on schedule
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Productivity Score
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((Number(efficiencyRate) + Number(onTimeRate)) / 2)}
            </div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Weekly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Task Completion Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyProductivityData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#8884d8"
                    name="Completed"
                  />
                  <Line
                    type="monotone"
                    dataKey="created"
                    stroke="#82ca9d"
                    name="Created"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Time of Day Productivity */}
        <Card>
          <CardHeader>
            <CardTitle>Productivity by Time of Day</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeOfDayData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#8884d8" name="Tasks Completed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ProductivityOverview;
