import { useState } from "react";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { EditTaskDialog } from "./EditTaskDialog";
import { TaskDetailsModal } from "@/components/task-details-modal";
import { Check, Edit, Eye } from "lucide-react";
import { getStatusColor } from "@/utils/getStatusColor";
import { getPriorityColor } from "@/utils/getPriorityColor";
import { ExtendedCreateTodo } from "@/app/today/page";

interface TaskListProps {
  tasks: ExtendedCreateTodo[];
  onTaskUpdate: (updatedTask: ExtendedCreateTodo) => void;
}

export function TaskList({ tasks, onTaskUpdate }: TaskListProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ExtendedCreateTodo | null>(
    null
  );
  const [viewingTask, setViewingTask] = useState<ExtendedCreateTodo | null>(
    null
  );

  const handleMarkCompleted = (task: ExtendedCreateTodo) => {
    const newStatus = task.status === "Completed" ? "NotStarted" : "Completed";
    onTaskUpdate({ ...task, status: newStatus });
  };

  const handleEditClick = (task: ExtendedCreateTodo) => {
    setSelectedTask(task);
    setIsEditDialogOpen(true);
  };

  const handleSave = (updatedTask: ExtendedCreateTodo) => {
    onTaskUpdate(updatedTask);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedTask(null);
  };

  return (
    <ul className="space-y-3">
      {tasks.map((task, i) => (
        <li
          key={i}
          className="group flex justify-between items-center bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md dark:shadow-gray-900 transition-all duration-300 ease-in-out"
        >
          <div className="flex-1">
            <h3 className="font-medium text-gray-800 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
              {task.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Due: {task.dueDate}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 p-0 text-gray-600 opacity-0 transition-opacity group-hover:opacity-100 duration-300 ease-in-out dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              onClick={() => setViewingTask(task)}
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">View task details</span>
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 text-gray-600 opacity-0 transition-opacity group-hover:opacity-100 duration-300 ease-in-out dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <span className="sr-only">Open menu</span>
                  <Edit className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col space-y-1">
                  <Button
                    variant="ghost"
                    className="justify-start text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleMarkCompleted(task)}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    {task.status === "Completed"
                      ? "Mark Incomplete"
                      : "Mark Completed"}
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => handleEditClick(task)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Badge
              variant="outline"
              className={getPriorityColor(task.priority)}
            >
              {task.priority}
            </Badge>
            <Badge variant="outline" className={getStatusColor(task.status)}>
              {task.status}
            </Badge>
          </div>
        </li>
      ))}

      {tasks.length === 0 && (
        <li className="text-center py-6 text-gray-500 dark:text-gray-400">
          No tasks available
        </li>
      )}

      {/* Edit Dialog - moved outside the map loop */}
      {selectedTask && (
        <EditTaskDialog
          task={selectedTask}
          isOpen={isEditDialogOpen}
          onClose={handleCloseEditDialog}
          onSave={handleSave}
        />
      )}

      {/* View Task Modal */}
      {viewingTask && (
        <TaskDetailsModal
          task={viewingTask}
          isOpen={true}
          onClose={() => setViewingTask(null)}
        />
      )}
    </ul>
  );
}
