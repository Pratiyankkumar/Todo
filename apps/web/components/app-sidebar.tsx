"use client";

import * as React from "react";
import {
  CalendarDays,
  ChartPieIcon,
  FolderIcon,
  HomeIcon,
  LayoutGrid,
  Archive,
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
          url: "/smart/dueWeek",
        },
        {
          title: "Due This Month",
          url: "/smart/dueMonth",
        },
        {
          title: "Recently Modified",
          url: "/smart/recent",
        },
      ],
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: CalendarDays,
      items: [
        {
          title: "Week View",
          url: "/calendar/week",
        },
        {
          title: "Upcoming Deadlines",
          url: "/calendar/deadlines",
        },
      ],
    },
    {
      title: "Categories",
      url: "/category",
      icon: FolderIcon,
      items: [
        {
          title: "Work",
          url: "/category/work",
        },
        {
          title: "Personal",
          url: "/category/personal",
        },
        {
          title: "Household",
          url: "/category/household",
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
      url: "/stats",
      icon: ChartPieIcon,
      items: [
        {
          title: "Productivity Overview",
          url: "/stats/productivity",
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
