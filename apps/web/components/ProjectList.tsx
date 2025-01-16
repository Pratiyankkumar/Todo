import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Eye, Edit, Calendar, Link as LinkIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@workspace/ui/components/dialog";
import { AddProjectDialog } from "./AddProjectDialog";
import { tasks } from "@/data/mock-data";
import { getStatusColor } from "@/utils/getStatusColor";
import { getPriorityColor } from "@/utils/getPriorityColor";

interface Project {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  priority: string;
  link?: string;
  taskIds: string[];
}

interface ProjectListProps {
  projects?: Project[];
  // onUpdateProject?: (updatedProject: Project) => void;
}

export function ProjectList({
  projects = [],
  // onUpdateProject,
}: ProjectListProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsEditDialogOpen(true);
  };

  // const handleUpdateProject = (updatedProject: Project) => {
  //   // onUpdateProject(updatedProject);
  //   setIsEditDialogOpen(false);
  //   setSelectedProject(null);
  // };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <Card
              key={project.id}
              className="group relative flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg dark:bg-gray-800/50 dark:hover:bg-gray-800"
            >
              <CardHeader className="space-y-0 pb-4">
                <div className="flex items-start justify-between">
                  <CardTitle className="line-clamp-1 text-lg font-semibold">
                    {project.title}
                  </CardTitle>
                  <div className="flex -mt-1 gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedProject(project)}
                      className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditProject(project)}
                      className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
                  {project.description}
                </p>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className={getStatusColor(project.status)}
                    >
                      {project.status}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={getPriorityColor(project.priority)}
                    >
                      {project.priority}
                    </Badge>
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {project.dueDate.toLocaleDateString()}
                  </div>

                  {project.link && (
                    <div className="flex items-center text-sm">
                      <LinkIcon className="mr-2 h-4 w-4" />
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate text-blue-500 hover:underline"
                      >
                        {project.link}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex min-h-[200px] items-center justify-center rounded-lg border border-dashed text-muted-foreground">
            No projects available
          </div>
        )}
      </div>

      <Dialog
        open={!!selectedProject && !isEditDialogOpen}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 max-h-[70vh] overflow-y-auto  scrollbar-hide py-4">
            <div className="space-y-2">
              <h3 className="font-medium text-muted-foreground">Description</h3>
              <p className="text-sm">{selectedProject?.description}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-muted-foreground">Status</h3>
                <Badge
                  variant="secondary"
                  className={getStatusColor(selectedProject?.status || "")}
                >
                  {selectedProject?.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-muted-foreground">Priority</h3>
                <Badge
                  variant="secondary"
                  className={getPriorityColor(selectedProject?.priority || "")}
                >
                  {selectedProject?.priority}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-muted-foreground">Due Date</h3>
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  {selectedProject?.dueDate.toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Add this new section for tasks */}
            {selectedProject?.taskIds && selectedProject.taskIds.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-muted-foreground">Tasks</h3>
                <div className="space-y-2">
                  {selectedProject.taskIds.map((taskId) => {
                    const task = tasks.find((t) => t.id === taskId);
                    if (!task) return null;

                    return (
                      <div
                        key={task.id}
                        className="rounded-lg border p-3 dark:border-gray-700"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{task.title}</h4>
                          <Badge
                            variant="secondary"
                            className={getStatusColor(task.status)}
                          >
                            {task.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {task.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            {task.dueDate}
                          </div>
                          <Badge
                            variant="secondary"
                            className={getPriorityColor(task.priority)}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {selectedProject?.link && (
              <div className="space-y-2">
                <h3 className="font-medium text-muted-foreground">
                  Project Link
                </h3>
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-blue-500 hover:underline"
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  {selectedProject.link}
                </a>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setSelectedProject(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isEditDialogOpen && selectedProject && (
        <AddProjectDialog
          isOpen={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          // onSave={() => handleUpdateProject}
          initialProject={selectedProject}
        />
      )}
    </>
  );
}
