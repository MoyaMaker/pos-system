"use client";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/lib/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme, systemTheme } = useTheme();

  const handleTheme = () => {
    if (theme === "light" || (theme === "system" && systemTheme === "light")) {
      setTheme("dark");
    } else if (
      (theme && theme === "dark") ||
      (theme === "system" && systemTheme === "dark")
    ) {
      setTheme("light");
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleTheme}>
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
