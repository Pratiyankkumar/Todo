import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Label } from "@workspace/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Calendar } from "@workspace/ui/components/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface Project {
  id?: string;
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  priority: string;
  link?: string;
}

interface AddProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  initialProject?: Project;
}

export function AddProjectDialog({
  isOpen,
  onClose,
  onSave,
  initialProject,
}: AddProjectDialogProps) {
  const [project, setProject] = useState<Project>({
    title: "",
    description: "",
    dueDate: new Date(),
    status: "Not Started",
    priority: "Medium",
    link: "",
  });

  useEffect(() => {
    if (initialProject) {
      setProject(initialProject);
    }
  }, [initialProject]);

  const handleSave = () => {
    onSave(project);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialProject ? "Edit Project" : "Add New Project"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={project.title}
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right">
              Due Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`col-span-3 justify-start text-left font-normal`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(project.dueDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={project.dueDate}
                  onSelect={(date) =>
                    setProject({ ...project, dueDate: date || new Date() })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={project.status}
              onValueChange={(value) =>
                setProject({ ...project, status: value })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Select
              value={project.priority}
              onValueChange={(value) =>
                setProject({ ...project, priority: value })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-right">
              Project Link
            </Label>
            <Input
              id="link"
              value={project.link}
              onChange={(e) => setProject({ ...project, link: e.target.value })}
              className="col-span-3"
              placeholder="https://example.com/project"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            {initialProject ? "Update Project" : "Add Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
