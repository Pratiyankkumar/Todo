"use client";

import { useRouter } from "next/navigation"; // Use the correct import
import CategoryDashboard from "@/components/CategoryDashboard";
import { tasks } from "@/data/mock-data";

export default function Page() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Task Categories</h1>
      <CategoryDashboard
        tasks={tasks}
        onCategoryClick={(category) => {
          router.push(`/category/${category.toLowerCase()}`);
        }}
      />
    </div>
  );
}
