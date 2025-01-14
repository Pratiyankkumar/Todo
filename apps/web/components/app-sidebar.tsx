"use client";

import * as React from "react";
import {
  CalendarDays,
  ChartPieIcon,
  FolderIcon,
  HomeIcon,
  LayoutGrid,
  Tags,
  Archive,
  Plus,
  ClipboardList,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@workspace/ui/components/sidebar";
import { TaskDialog } from "./add-todo-dialog";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Today",
      url: "/today",
      icon: HomeIcon,
      items: [
        {
          title: "Due Today",
          url: "/today/due",
        },
        {
          title: "Overdue",
          url: "/today/overdue",
        },
        {
          title: "Priority Tasks",
          url: "/today/priority",
        },
      ],
    },
    {
      title: "Projects",
      url: "/projects",
      icon: ClipboardList,
      items: [
        {
          title: "Active Projects",
          url: "/projects/active",
        },
        {
          title: "Completed Projects",
          url: "/projects/completed",
        },
      ],
    },
    {
      title: "Smart Lists",
      url: "/smart",
      icon: LayoutGrid,
      items: [
        {
          title: "Due This Week",
          url: "#",
        },
        {
          title: "Due This Month",
          url: "#",
        },
        {
          title: "High Priority",
          url: "#",
        },
        {
          title: "Recently Modified",
          url: "#",
        },
      ],
    },
    {
      title: "Calendar",
      url: "#",
      icon: CalendarDays,
      items: [
        {
          title: "Month View",
          url: "#",
        },
        {
          title: "Week View",
          url: "#",
        },
        {
          title: "Upcoming Deadlines",
          url: "#",
        },
      ],
    },
    {
      title: "Categories",
      url: "#",
      icon: FolderIcon,
      items: [
        {
          title: "Work",
          url: "#",
        },
        {
          title: "Personal",
          url: "#",
        },
        {
          title: "Household",
          url: "#",
        },
        {
          title: "Add Category",
          url: "#",
          icon: Plus,
        },
      ],
    },
    {
      title: "Tags",
      url: "#",
      icon: Tags,
      items: [
        {
          title: "View All Tags",
          url: "#",
        },
        {
          title: "Most Used",
          url: "#",
        },
        {
          title: "Create New Tag",
          url: "#",
          icon: Plus,
        },
      ],
    },
    {
      title: "Archive",
      url: "#",
      icon: Archive,
      items: [
        {
          title: "Completed Tasks",
          url: "#",
        },
        {
          title: "Deleted Tasks",
          url: "#",
        },
        {
          title: "Export Archive",
          url: "#",
        },
      ],
    },
    {
      title: "Stats",
      url: "#",
      icon: ChartPieIcon,
      items: [
        {
          title: "Productivity Overview",
          url: "#",
        },
        {
          title: "Task Completion Rate",
          url: "#",
        },
        {
          title: "Priority Distribution",
          url: "#",
        },
        {
          title: "Time Analysis",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TaskDialog />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
