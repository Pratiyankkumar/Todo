"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "Mon", completed: 3 },
  { name: "Tue", completed: 5 },
  { name: "Wed", completed: 4 },
  { name: "Thu", completed: 7 },
  { name: "Fri", completed: 5 },
  { name: "Sat", completed: 2 },
  { name: "Sun", completed: 1 },
];

export function WeeklyTaskChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Task Completion</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="completed" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
