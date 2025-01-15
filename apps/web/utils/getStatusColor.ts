export const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "text-green-500 bg-green-100 dark:bg-green-900/30";
    case "In Progress":
      return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30";
    case "Not Started":
      return "text-red-500 bg-red-100 dark:bg-red-900/30";
    case "On Hold":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    default:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
  }
};
