"use client";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/lib/components/ui/tooltip";
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleTheme}>
            <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          Toggle theme
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
