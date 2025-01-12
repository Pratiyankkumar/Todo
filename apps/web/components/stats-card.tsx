import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components/card";
import { Progress } from "@workspace/ui/components/progress";
import {
  Clock,
  Calendar,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

interface StatsCardProps {
  href: string;
  title: string;
  icon: "recent" | "due" | "priority";
  totalTasks: number;
  completedTasks: number;
  recentActivity: string;
}

const iconMap = {
  recent: Clock,
  due: Calendar,
  priority: AlertTriangle,
};

export function StatsCard({
  href,
  title,
  icon,
  totalTasks,
  completedTasks,
  recentActivity,
}: StatsCardProps) {
  const Icon = iconMap[icon];
  const completionPercentage =
    Math.round((completedTasks / totalTasks) * 100) || 0;

  const getGradient = () => {
    switch (icon) {
      case "recent":
        return "from-blue-500 to-cyan-500";
      case "due":
        return "from-amber-500 to-orange-500";
      case "priority":
        return "from-red-500 to-pink-500";
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className={`bg-gradient-to-r ${getGradient()} p-6`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon className="h-8 w-8 text-white" />
            <h3 className="text-2xl font-bold text-white">{title}</h3>
          </div>
          <span className="text-4xl font-bold text-white">{totalTasks}</span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Completion
            </span>
            <span className="text-sm font-medium text-gray-700">
              {completionPercentage}%
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>
            {completedTasks} of {totalTasks} tasks completed
          </span>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4">
        <div className="flex items-center justify-between w-full">
          <span className="text-sm text-gray-600 truncate flex-1">
            {recentActivity}
          </span>
          <Link
            href={href}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span className="text-sm font-medium mr-1">View All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
