export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "text-red-500 bg-red-100 dark:bg-red-900/30";
    case "Medium":
      return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30";
    case "Low":
      return "text-green-500 bg-green-100 dark:bg-green-900/30";
    default:
      return "text-blue-500 bg-blue-100 dark:bg-blue-900/30";
  }
};
