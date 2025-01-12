import { StatsCard } from "@/components/stats-card";
import { tasks } from "@/data/mock-data";

export default function DashboardPage() {
  const dueTasks = tasks.filter((task) => new Date(task.dueDate) <= new Date());
  const priorityTasks = tasks.filter((task) => task.priority === "high");
  const completedTasks = tasks.filter((task) => task.completed);

  // Helper function to get the most recent task
  const getMostRecentTask = (taskList: typeof tasks) => {
    return taskList.reduce((latest, current) =>
      new Date(current.createdAt) > new Date(latest.createdAt)
        ? current
        : latest
    ).title;
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        Task Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          href="/dashboard/recent"
          title="Recent Tasks"
          icon="recent"
          totalTasks={tasks.length}
          completedTasks={completedTasks.length}
          recentActivity={`Latest: ${getMostRecentTask(tasks)}`}
        />
        <StatsCard
          href="/dashboard/due"
          title="Due Tasks"
          icon="due"
          totalTasks={dueTasks.length}
          completedTasks={
            completedTasks.filter((task) => dueTasks.includes(task)).length
          }
          recentActivity={`Next due: ${dueTasks[0]?.dueDate || "None"}`}
        />
        <StatsCard
          href="/dashboard/priority"
          title="Priority Tasks"
          icon="priority"
          totalTasks={priorityTasks.length}
          completedTasks={
            completedTasks.filter((task) => priorityTasks.includes(task)).length
          }
          recentActivity={`Urgent: ${priorityTasks[0]?.title || "None"}`}
        />
      </div>
    </div>
  );
}
