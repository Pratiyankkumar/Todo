export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  category: "Work" | "Personal" | "Household";
  status: "In Progress" | "Not Started" | "Completed";
  createdAt: string;
}

export const tasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Finish the draft and send for review",
    dueDate: "2025-01-05",
    priority: "High",
    category: "Work",
    status: "Not Started",
    createdAt: "2024-12-29T10:00:00Z",
  },
  {
    id: "2",
    title: "Review team performance",
    description: "Analyze team performance metrics and provide feedback",
    dueDate: "2025-01-10",
    priority: "Medium",
    category: "Personal",
    status: "Completed",
    createdAt: "2024-12-30T09:30:00Z",
  },
  {
    id: "3",
    title: "Update client presentation",
    description: "Incorporate latest data and feedback into the presentation",
    dueDate: "2025-01-15",
    priority: "High",
    category: "Work",
    status: "In Progress",
    createdAt: "2025-01-02T14:00:00Z",
  },
  {
    id: "4",
    title: "Prepare monthly report",
    description: "Gather data and prepare the monthly performance report",
    dueDate: "2025-01-20",
    priority: "Low",
    category: "Household",
    status: "Not Started",
    createdAt: "2025-01-03T11:00:00Z",
  },
  {
    id: "5",
    title: "Schedule team building event",
    description: "Book venue and activities for the team building event",
    dueDate: "2025-01-25",
    priority: "Medium",
    category: "Work",
    status: "Completed",
    createdAt: "2025-01-05T16:30:00Z",
  },
  {
    id: "6",
    title: "Finalize budget for Q3",
    description: "Review and finalize the budget for the third quarter",
    dueDate: "2024-12-25",
    priority: "High",
    category: "Work",
    status: "In Progress",
    createdAt: "2024-12-20T13:45:00Z",
  },
  {
    id: "7",
    title: "Conduct user research",
    description: "Conduct user interviews and surveys to gather feedback",
    dueDate: "2025-01-30",
    priority: "Medium",
    category: "Work",
    status: "Not Started",
    createdAt: "2025-01-10T10:15:00Z",
  },
  {
    id: "8",
    title: "Optimize website performance",
    description: "Improve website loading speed and SEO",
    dueDate: "2025-01-28",
    priority: "Low",
    category: "Work",
    status: "Completed",
    createdAt: "2025-01-15T09:00:00Z",
  },
  {
    id: "9",
    title: "Prepare for product launch",
    description: "Finalize marketing materials and prepare for the launch",
    dueDate: "2024-12-31",
    priority: "High",
    category: "Work",
    status: "In Progress",
    createdAt: "2024-12-22T11:30:00Z",
  },
  {
    id: "10",
    title: "Review and update documentation",
    description: "Review and update all relevant documentation",
    dueDate: "2025-01-27",
    priority: "Low",
    category: "Work",
    status: "Completed",
    createdAt: "2025-01-07T15:00:00Z",
  },
  {
    id: "11",
    title: "Review and update documentation",
    description: "Review and update all relevant documentation",
    dueDate: "2025-01-27",
    priority: "Low",
    category: "Work",
    status: "Completed",
    createdAt: "2025-01-15T15:30:00Z",
  },
];

export interface InitialProjects {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: "In Progress" | "Not Started" | "Completed";
  priority: "High" | "Medium" | "Low";
  taskIds: string[];
  link?: string;
}

export const initialProjects: InitialProjects[] = [
  {
    id: "1",
    title: "Website Redesign",
    description:
      "Overhaul the company website with a modern, responsive design",
    dueDate: new Date("2023-08-15"),
    status: "In Progress",
    priority: "High",
    link: "https://example.com/website-redesign",
    taskIds: ["1", "4", "10"],
  },
  {
    id: "2",
    title: "Mobile App Development",
    description: "Create a cross-platform mobile app for our service",
    dueDate: new Date("2023-09-30"),
    status: "Not Started",
    priority: "Medium",
    link: "https://example.com/mobile-app",
    taskIds: ["2", "6", "8"],
  },
  {
    id: "3",
    title: "Customer Feedback Analysis",
    description: "Analyze recent customer feedback and prepare a report",
    dueDate: new Date("2023-07-10"),
    status: "Completed",
    priority: "Low",
    taskIds: ["10"],
  },
];
