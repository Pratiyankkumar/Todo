"use client";

import { useState, useEffect } from "react";
import { Button } from "@workspace/ui/components/button"; // assuming you're using shadcn button
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return null or a skeleton while mounting to prevent hydration mismatch
  if (!mounted) {
    return <Button className="mr-3">Loading...</Button>;
  }

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="mr-3"
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </Button>
  );
}
