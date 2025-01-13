export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "1" | "2" | "3" | "4";
  category: "Work" | "Personal" | "Household";
  completed: boolean;
  createdAt: string;
}

export const tasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the draft and send for review",
    dueDate: "2023-06-15",
    priority: "1",
    category: "Work",
    completed: false,
    createdAt: "2023-06-10T10:00:00Z",
  },
  {
    id: "2",
    title: "Review team performance",
    description: "Analyze team performance metrics and provide feedback",
    dueDate: "2023-06-20",
    priority: "2",
    category: "Work",
    completed: true,
    createdAt: "2023-06-11T09:30:00Z",
  },
  {
    id: "3",
    title: "Update client presentation",
    description: "Incorporate latest data and feedback into the presentation",
    dueDate: "2023-06-18",
    priority: "1",
    category: "Work",
    completed: false,
    createdAt: "2023-06-12T14:00:00Z",
  },
  {
    id: "4",
    title: "Prepare monthly report",
    description: "Gather data and prepare the monthly performance report",
    dueDate: "2023-06-30",
    priority: "3",
    category: "Work",
    completed: false,
    createdAt: "2023-06-13T11:00:00Z",
  },
  {
    id: "5",
    title: "Schedule team building event",
    description: "Book venue and activities for the team building event",
    dueDate: "2023-07-05",
    priority: "2",
    category: "Work",
    completed: true,
    createdAt: "2023-06-14T16:30:00Z",
  },
  {
    id: "6",
    title: "Finalize budget for Q3",
    description: "Review and finalize the budget for the third quarter",
    dueDate: "2023-06-25",
    priority: "1",
    category: "Work",
    completed: false,
    createdAt: "2023-06-15T13:45:00Z",
  },
  {
    id: "7",
    title: "Conduct user research",
    description: "Conduct user interviews and surveys to gather feedback",
    dueDate: "2023-07-10",
    priority: "2",
    category: "Work",
    completed: false,
    createdAt: "2023-06-16T10:15:00Z",
  },
  {
    id: "8",
    title: "Optimize website performance",
    description: "Improve website loading speed and SEO",
    dueDate: "2023-07-15",
    priority: "3",
    category: "Work",
    completed: true,
    createdAt: "2023-06-17T09:00:00Z",
  },
  {
    id: "9",
    title: "Prepare for product launch",
    description: "Finalize marketing materials and prepare for the launch",
    dueDate: "2023-07-01",
    priority: "1",
    category: "Work",
    completed: false,
    createdAt: "2023-06-18T11:30:00Z",
  },
  {
    id: "10",
    title: "Review and update documentation",
    description: "Review and update all relevant documentation",
    dueDate: "2023-07-20",
    priority: "3",
    category: "Work",
    completed: true,
    createdAt: "2023-06-19T15:00:00Z",
  },
];
