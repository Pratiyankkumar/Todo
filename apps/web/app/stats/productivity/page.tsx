"use client";

import ProductivityOverview from "@/components/ProductivityOverview";
import { tasks } from "@/data/mock-data";

export default function Page() {
  return <ProductivityOverview tasks={tasks} />;
}
