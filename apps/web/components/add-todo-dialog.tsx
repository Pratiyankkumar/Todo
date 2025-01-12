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
import { CalendarIcon, Plus, Star } from "lucide-react";
import { Calendar } from "@workspace/ui/components/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { cn } from "@workspace/ui/lib/utils";
import { format } from "date-fns";
import { useSidebar } from "@workspace/ui/components/sidebar";

const categories = ["Work", "Personal", "Household"];

export function TaskDialog() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState<Date>();
  const [priority, setPriority] = React.useState<number | null>(null);
  const [category, setCategory] = React.useState<string | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Handle textarea auto-resize
  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [description]);

  const { open } = useSidebar();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={` cursor-pointer truncate overflow-hidden flex flex-row items-center gap-2 rounded-md ${open ? "hover:bg-gray-200" : ""} py-2 duration-300 ease-in-out`}
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
                  {date ? format(date, "PPP") : "Today"}
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
                  {priority ? `Priority ${priority}` : "Priority"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-2">
                  {[1, 2, 3, 4].map((p) => (
                    <Button
                      key={p}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setPriority(p)}
                    >
                      Priority {p}
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
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
            Add task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
