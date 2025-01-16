"use client";

import React, { useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@workspace/ui/components/card";
import { Progress } from "@workspace/ui/components/progress";
import { Badge } from "@workspace/ui/components/badge";
import { Briefcase, Home, User } from "lucide-react";
import { Task } from "@/data/mock-data";
import { cn } from "@workspace/ui/lib/utils";

interface CategoryDashboardProps {
  tasks: Task[];
  onCategoryClick?: (category: string) => void;
}

interface CategoryStats {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
  highPriority: number;
}

export function CategoryDashboard({
  tasks,
  onCategoryClick,
}: CategoryDashboardProps) {
  const categories = useMemo(() => {
    return {
      Work: {
        icon: Briefcase,
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-50 dark:bg-blue-950",
      },
      Personal: {
        icon: User,
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-50 dark:bg-purple-950",
      },
      Household: {
        icon: Home,
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-50 dark:bg-green-950",
      },
    };
  }, []);

  const getCategoryStats = (categoryTasks: Task[]): CategoryStats => ({
    total: categoryTasks.length,
    completed: categoryTasks.filter(
      (t) => t.status.toLowerCase() === "completed"
    ).length,
    inProgress: categoryTasks.filter(
      (t) => t.status.toLowerCase() === "in progress"
    ).length,
    pending: categoryTasks.filter(
      (t) => t.status.toLowerCase() === "not started"
    ).length,
    highPriority: categoryTasks.filter(
      (t) => t.priority.toLowerCase() === "high"
    ).length,
  });

  const categoryData = useMemo(() => {
    return Object.keys(categories).map((category) => ({
      name: category,
      ...categories[category as keyof typeof categories],
      stats: getCategoryStats(tasks.filter((t) => t.category === category)),
    }));
  }, [tasks, categories]);

  const getCompletionPercentage = (stats: CategoryStats) => {
    if (stats.total === 0) return 0;
    return Math.round((stats.completed / stats.total) * 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {categoryData.map((category) => (
        <Card
          key={category.name}
          className={cn(
            "transition-all hover:shadow-md cursor-pointer",
            category.bgColor
          )}
          onClick={() => onCategoryClick?.(category.name)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <category.icon className={cn("h-5 w-5", category.color)} />
              <span>{category.name}</span>
              {category.stats.highPriority > 0 && (
                <Badge variant="destructive" className="ml-auto">
                  {category.stats.highPriority} High Priority
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{getCompletionPercentage(category.stats)}%</span>
                </div>
                <Progress
                  value={getCompletionPercentage(category.stats)}
                  className="h-2"
                />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{category.stats.total}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Tasks
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {category.stats.completed}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Completed
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {category.stats.inProgress}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    In Progress
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {category.stats.pending}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Pending
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default CategoryDashboard;
