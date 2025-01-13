"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { ProjectList } from "@/components/ProjectList";
import { AddProjectDialog } from "@/components/AddProjectDialog";

// Mock data for initial projects
const initialProjects = [
  {
    id: "1",
    title: "Website Redesign",
    description:
      "Overhaul the company website with a modern, responsive design",
    dueDate: new Date("2023-08-15"),
    status: "In Progress",
    priority: "High",
    link: "https://example.com/website-redesign",
  },
  {
    id: "2",
    title: "Mobile App Development",
    description: "Create a cross-platform mobile app for our service",
    dueDate: new Date("2023-09-30"),
    status: "Not Started",
    priority: "Medium",
    link: "https://example.com/mobile-app",
  },
  {
    id: "3",
    title: "Customer Feedback Analysis",
    description: "Analyze recent customer feedback and prepare a report",
    dueDate: new Date("2023-07-10"),
    status: "Completed",
    priority: "Low",
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false);

  const handleAddProject = (newProject: any) => {
    setProjects([...projects, { ...newProject, id: Date.now().toString() }]);
  };

  const handleUpdateProject = (updatedProject: any) => {
    setProjects(
      projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button onClick={() => setIsAddProjectDialogOpen(true)}>
          Add New Project
        </Button>
      </div>
      <ProjectList projects={projects} onUpdateProject={handleUpdateProject} />
      <AddProjectDialog
        isOpen={isAddProjectDialogOpen}
        onClose={() => setIsAddProjectDialogOpen(false)}
        onSave={handleAddProject}
      />
    </div>
  );
}
