"use client";

import * as React from "react";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { CalendarIcon, InfoIcon, Loader, Plus, Star } from "lucide-react";
import { Calendar } from "@workspace/ui/components/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { cn } from "@workspace/ui/lib/utils";
import { format } from "date-fns";
import { useSidebar } from "@workspace/ui/components/sidebar";
import { initialProjects } from "@/data/mock-data";
import { CreateTodo } from "@workspace/types";
import formatDate from "@/utils/formatDate";
import { useMutation, useQueryClient } from "react-query";
import { createTodo } from "@/api/mutations/todo";

type Priority = "High" | "Medium" | "Low";
const priorities: Priority[] = ["High", "Medium", "Low"];

type Category = "Work" | "Personal" | "Household";
const categories: Category[] = ["Work", "Personal", "Household"];

type Status = "InProgress" | "NotStarted" | "Completed";
const statusType: Status[] = ["InProgress", "NotStarted", "Completed"];

export function TaskDialog() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState<Date>();
  const [priority, setPriority] = React.useState<Priority>("Low");
  const [category, setCategory] = React.useState<Category>("Work");
  const [project, setProject] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<Status>("NotStarted");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const dialogTriggerRef = React.useRef<HTMLDivElement>(null);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate(undefined);
    setPriority("Low");
    setCategory("Work");
    setProject(null);
    setStatus("NotStarted");
  };

  // Handle textarea auto-resize
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [description]);

  const { open } = useSidebar();

  const queryClient = useQueryClient();

  const mutation = useMutation(createTodo, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries("todos");
      dialogTriggerRef.current?.click(); // Close the dialog by triggering a click on the DialogTrigger
      resetForm(); // Reset the form state
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function handleSubmit() {
    const newTodo: CreateTodo = {
      title,
      description,
      dueDate: date
        ? formatDate(String(date))
        : formatDate(new Date().toLocaleDateString()),
      priority,
      category,
      status,
    };

    if (description.length < 5) {
      return;
    }

    console.log(newTodo);
    mutation.mutate(newTodo);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          ref={dialogTriggerRef}
          className={`cursor-pointer truncate overflow-hidden flex flex-row items-center gap-2 rounded-md ${open ? "hover:bg-gray-200 hover:dark:bg-black/50" : ""} py-2 duration-300 ease-in-out`}
        >
          <Button className={`w-8 h-8 ${open ? "ml-2" : ""}`} size="icon">
            <Plus className="" />
          </Button>
          <p className={`${open ? "" : "hidden"}`}>Add new Todo</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4">
          <Input
            placeholder="Task name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg pl-4 font-medium border-none  focus-visible:ring-0"
          />
          <div className="grid gap-2">
            <Textarea
              ref={textareaRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="min-h-[60px] max-h-[60vh] resize-none border-none px-0 pl-4 focus-visible:ring-0"
            />
          </div>
          <div
            className={`flex flex-row gap-2  ml-4 items-center ${description.length < 5 ? "" : "hidden"}`}
          >
            <InfoIcon className="h-3 text-red-500 w-3" />
            <p className="text-sm text-red-500 ">
              {" "}
              Please enter more than 5 words
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "w-[200px] h-8 border-dashed justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date
                    ? format(date, "PPP")
                    : formatDate(new Date().toLocaleDateString())}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(day) =>
                    day.getTime() < new Date().setHours(0, 0, 0, 0)
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "w-[120px] h-8 border-dashed justify-start text-left font-normal",
                    !priority && "text-muted-foreground"
                  )}
                >
                  <Star className="mr-2 h-4 w-4" />
                  {priority ? `${priority}` : "Priority"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-2">
                  {priorities.map((p) => (
                    <Button
                      key={p}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setPriority(p)}
                    >
                      {p}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "w-[120px] h-8 border-dashed justify-start text-left font-normal",
                    !category && "text-muted-foreground"
                  )}
                >
                  <Star className="mr-2 h-4 w-4" />
                  {category ? category : "Category"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-2">
                  {categories.map((p) => (
                    <Button
                      key={p}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setCategory(p)}
                    >
                      {p}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "w-[120px] h-8 border-dashed justify-start text-left font-normal",
                    !status && "text-muted-foreground"
                  )}
                >
                  <Star className="mr-2 h-4 w-4" />
                  {status ? status : "Status"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[160px] p-0" align="start">
                <div className="p-2">
                  {statusType.map((p) => (
                    <Button
                      key={p}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setStatus(p)}
                    >
                      {p}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-8 border-dashed justify-start text-left font-normal",
                    !project && "text-muted-foreground"
                  )}
                >
                  <Star className="mr-2 h-4 w-4" />
                  {project ? project : "No Project"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[160px] p-0" align="start">
                <div className="p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setProject("")} // or setProject(null) depending on your state type
                  >
                    No Project
                  </Button>
                  {initialProjects.map((p, i) => (
                    <Button
                      key={i}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setProject(p.title)}
                    >
                      {p.title.length > 10
                        ? `${p.title.slice(0, 11)}...`
                        : p.title}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            onClick={handleSubmit}
            size="sm"
            className="bg-rose-500 hover:bg-rose-600"
          >
            <Loader
              className={`w-6 h-6 animate-spin ${mutation.isLoading ? "" : "hidden"}`}
            />
            <p className={`${mutation.isLoading ? "hidden" : ""}`}>Add task</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
