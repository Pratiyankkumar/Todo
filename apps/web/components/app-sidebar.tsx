"use client";

import * as React from "react";
import {
  AudioWaveform,
  ChartPieIcon,
  CheckCheckIcon,
  Command,
  FolderIcon,
  GalleryVerticalEnd,
  HomeIcon,
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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: HomeIcon,
      isActive: true,
      items: [
        {
          title: "Recent Tasks",
          url: "#",
        },
        {
          title: "Due Today",
          url: "#",
        },
        {
          title: "Priority Tasks",
          url: "#",
        },
      ],
    },
    {
      title: "My Todo's",
      url: "#",
      icon: CheckCheckIcon,
      items: [
        {
          title: "All todo's",
          url: "#",
        },
        {
          title: "Pending",
          url: "#",
        },
        {
          title: "Completed",
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
      ],
    },
    {
      title: "Stats",
      url: "#",
      icon: ChartPieIcon,
      items: [],
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
