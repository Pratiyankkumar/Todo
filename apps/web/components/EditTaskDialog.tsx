import { useState } from "react";
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
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";
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
import { Task } from "@/data/mock-data";

interface EditTaskDialogProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
}

export function EditTaskDialog({
  task,
  isOpen,
  onClose,
  onSave,
}: EditTaskDialogProps) {
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [date, setDate] = useState<Date | undefined>(new Date(task.dueDate));

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
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
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
              className="col-span-3 h-full"
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
                  className={`col-span-3 justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    setEditedTask({
                      ...editedTask,
                      dueDate: newDate ? format(newDate, "yyyy-MM-dd") : "",
                    });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <RadioGroup
              defaultValue={editedTask.priority}
              onValueChange={(value: string) =>
                setEditedTask({
                  ...editedTask,
                  priority: value as Task["priority"],
                })
              }
              className="col-span-3 flex space-x-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="priority-1" />
                <Label htmlFor="priority-1">1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="priority-2" />
                <Label htmlFor="priority-2">2</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="priority-3" />
                <Label htmlFor="priority-3">3</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="priority-4" />
                <Label htmlFor="priority-4">4</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select
              defaultValue={editedTask.category}
              onValueChange={(value: string) =>
                setEditedTask({
                  ...editedTask,
                  category: value as Task["category"],
                })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Work">Work</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Household">Household</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
