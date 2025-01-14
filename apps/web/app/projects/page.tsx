"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { ProjectList } from "@/components/ProjectList";
import { AddProjectDialog } from "@/components/AddProjectDialog";

// Mock data for initial projects
import { initialProjects } from "@/data/mock-data";

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
