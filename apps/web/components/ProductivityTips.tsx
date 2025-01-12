"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Lightbulb } from "lucide-react";

const tips = [
  "Break large tasks into smaller, manageable steps",
  "Use the Pomodoro Technique: 25 minutes of focused work, then a 5-minute break",
  "Prioritize your tasks using the Eisenhower Matrix",
  "Minimize distractions by turning off notifications during focused work periods",
  "Review and reflect on your progress at the end of each day",
];

export function ProductivityTips() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="mr-2 h-5 w-5" />
          Productivity Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="text-sm">
              {tip}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
