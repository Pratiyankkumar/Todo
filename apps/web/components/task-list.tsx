import { Task } from "@/data/mock-data";
import { Badge } from "@workspace/ui/components/badge";

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="group flex justify-between items-center bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
        >
          <div className="flex-1">
            <h3 className="font-medium text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
              {task.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Due: {task.dueDate}</p>
          </div>
          <Badge
            variant="outline"
            className={`ml-4 transition-all duration-200 ${
              task.priority === "high"
                ? "bg-red-100 text-red-800 border-red-300 group-hover:bg-red-200"
                : task.priority === "medium"
                  ? "bg-yellow-100 text-yellow-800 border-yellow-300 group-hover:bg-yellow-200"
                  : "bg-green-100 text-green-800 border-green-300 group-hover:bg-green-200"
            } px-3 py-1 rounded-full text-xs font-semibold`}
          >
            {task.priority}
          </Badge>
        </li>
      ))}
      {tasks.length === 0 && (
        <li className="text-center py-6 text-gray-500">No tasks available</li>
      )}
    </ul>
  );
}
