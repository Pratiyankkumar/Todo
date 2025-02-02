"use client";

import { useEffect, useState } from "react";
import { TaskList } from "@/components/task-list";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Plus, Search } from "lucide-react";
import { CreateTodo } from "@workspace/types";
import { getTodo } from "@/api/queries/todo";
import { useQuery } from "react-query";
import { useTodo } from "@/contexts/TodoContext";

export type ExtendedCreateTodo = CreateTodo & {
  authorId: number;
  createdAt: string;
  id: number;
};

export default function TodoDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [todo, setTodo] = useState<ExtendedCreateTodo[] | []>([]);
  // const { user } = useUser();
  // console.log(user);

  const { data, error } = useQuery("todos", getTodo);
  const { saveTodoList } = useTodo();

  useEffect(() => {
    if (data) {
      setTodo(data);
      saveTodoList(data);
    }

    if (error) {
      console.log(error);
    }
  }, [data, error, saveTodoList]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Quick Actions Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 w-full md:w-auto">
            <Button className="w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Add New Task
            </Button>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search tasks..."
                className="pl-9 border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:bg-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-gray-950 dark:focus:ring-gray-300 ring-offset-white dark:ring-offset-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40 border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-gray-950 dark:focus:ring-gray-300 ring-offset-white dark:ring-offset-gray-900">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full md:w-40 border-gray-200 dark:border-gray-600 dark:focus:border-gray-500 dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-gray-950 dark:focus:ring-gray-300 ring-offset-white dark:ring-offset-gray-900">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="1">High</SelectItem>
                <SelectItem value="2">Medium</SelectItem>
                <SelectItem value="3">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Tasks List Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Your Tasks
          </h2>
          <TaskList
            tasks={todo}
            onTaskUpdate={(task) => console.log("Task updated:", task)}
          />
        </div>
      </div>
    </div>
  );
}
