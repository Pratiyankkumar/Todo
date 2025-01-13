"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Info } from "lucide-react";

export function DashboardIntro() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">
          Welcome to Your Task Dashboard
        </CardTitle>
        <CardDescription>
          Get started by adding tasks or explore your existing ones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Suggested Tasks to Add:
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Schedule team meeting for project updates</li>
              <li>Review and respond to important emails</li>
              <li>Prepare presentation for upcoming client meeting</li>
              <li>Update project timeline and milestones</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Dashboard Functionality:
            </h3>
            <p className="mb-2">
              This dashboard helps you manage and track your tasks efficiently:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>View recent, due, and priority tasks at a glance</li>
              <li>Track task completion progress</li>
              <li>Quickly access detailed task lists for each category</li>
            </ul>
          </div>
          <div className="flex space-x-4 mt-4">
            <Button className="flex items-center">
              <Info className="mr-2 h-4 w-4" /> Learn More
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
