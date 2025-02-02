import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Badge } from "@workspace/ui/components/badge";
import { getPriorityColor } from "@/utils/getPriorityColor";
import { ExtendedCreateTodo } from "@/app/today/page";

interface TaskDetailsModalProps {
  task: ExtendedCreateTodo;
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
              className={getPriorityColor(task.priority)}
            >
              {task.priority}
            </Badge>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Category:</span>
            <span className="col-span-3">{task.category}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium">Status:</span>
            <span className="col-span-3">{task.status}</span>
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
