"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Grid,
  Home,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/lib/components/mode-toggle";
import { Button } from "@/lib/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/lib/components/ui/tooltip";

const POST_NAVIGATION = [
  {
    icon: Home,
    label: "Inicio",
    href: "/order",
  },
  {
    icon: Package,
    label: "Productos",
    href: "/products",
  },
  {
    icon: Grid,
    label: "Categorías",
    href: "/categories",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleTogglePanel = () => setOpen((state) => !state);

  return (
    <aside
      className={cn(
        "h-dvh flex flex-col p-4 border-r",
        open ? "w-[250px]" : ""
      )}
    >
      <nav className="grid auto-rows-min gap-2 flex-1">
        {POST_NAVIGATION.map((nav) => (
          <TooltipProvider
            key={nav.label}
            delayDuration={200}
            skipDelayDuration={200}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={open ? "default" : "icon"}
                  variant={pathname.includes(nav.href) ? "default" : "ghost"}
                  className={cn("gap-4 text-base", open ? "justify-start" : "")}
                  asChild
                >
                  <Link href={nav.href}>
                    <nav.icon className="w-6 h-6" />
                    <span className={cn(open ? "" : "hidden")}>
                      {nav.label}
                    </span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                sideOffset={8}
                className={open ? "hidden" : ""}
              >
                {nav.label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>

      <section>
        <div
          className={cn(
            "flex flex-col gap-2",
            open ? "items-end" : "justify-center"
          )}
        >
          <ModeToggle />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" onClick={handleTogglePanel}>
                  <PanelLeftClose
                    className={cn("w-6 h-6", open ? "" : "hidden")}
                  />
                  <PanelLeftOpen
                    className={cn("w-6 h-6", open ? "hidden" : "")}
                  />
                  <span className="sr-only">Toggle panel left</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                Toggle panel left
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </section>
    </aside>
  );
}
