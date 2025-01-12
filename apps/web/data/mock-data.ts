export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  createdAt: string;
}

export const tasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    dueDate: "2023-06-15",
    priority: "high",
    completed: false,
    createdAt: "2023-06-10T10:00:00Z",
  },
  {
    id: "2",
    title: "Review team performance",
    dueDate: "2023-06-20",
    priority: "medium",
    completed: true,
    createdAt: "2023-06-11T09:30:00Z",
  },
  {
    id: "3",
    title: "Update client presentation",
    dueDate: "2023-06-18",
    priority: "high",
    completed: false,
    createdAt: "2023-06-12T14:00:00Z",
  },
  {
    id: "4",
    title: "Prepare monthly report",
    dueDate: "2023-06-30",
    priority: "low",
    completed: false,
    createdAt: "2023-06-13T11:00:00Z",
  },
  {
    id: "5",
    title: "Schedule team building event",
    dueDate: "2023-07-05",
    priority: "medium",
    completed: true,
    createdAt: "2023-06-14T16:30:00Z",
  },
  {
    id: "6",
    title: "Finalize budget for Q3",
    dueDate: "2023-06-25",
    priority: "high",
    completed: false,
    createdAt: "2023-06-15T13:45:00Z",
  },
  {
    id: "7",
    title: "Conduct user research",
    dueDate: "2023-07-10",
    priority: "medium",
    completed: false,
    createdAt: "2023-06-16T10:15:00Z",
  },
  {
    id: "8",
    title: "Optimize website performance",
    dueDate: "2023-07-15",
    priority: "low",
    completed: true,
    createdAt: "2023-06-17T09:00:00Z",
  },
  {
    id: "9",
    title: "Prepare for product launch",
    dueDate: "2023-07-01",
    priority: "high",
    completed: false,
    createdAt: "2023-06-18T11:30:00Z",
  },
  {
    id: "10",
    title: "Review and update documentation",
    dueDate: "2023-07-20",
    priority: "low",
    completed: true,
    createdAt: "2023-06-19T15:00:00Z",
  },
];
