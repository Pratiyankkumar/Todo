import { Task } from "@/data/mock-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Badge } from "@workspace/ui/components/badge";

interface TaskDetailsModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskDetailsModal({
  task,
  isOpen,
  onClose,
}: TaskDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Description:</span>
            <p className="col-span-3">{task.description}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Due Date:</span>
            <span className="col-span-3">{task.dueDate}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Priority:</span>
            <Badge
              variant="outline"
              className={`col-span-3 justify-self-start ${
                task.priority === "1"
                  ? "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700"
                  : task.priority === "2"
                    ? "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700"
                    : task.priority === "3"
                      ? "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700"
                      : "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700"
              }`}
            >
              Priority {task.priority}
            </Badge>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Category:</span>
            <span className="col-span-3">{task.category}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Status:</span>
            <span className="col-span-3">
              {task.completed ? "Completed" : "In Progress"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Created At:</span>
            <span className="col-span-3">
              {new Date(task.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
