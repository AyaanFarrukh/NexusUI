"use client";

import Link from "next/link";
import { Menu, Search, Bell, ChevronDown } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { useNotifications } from "@/components/notifications/notifications-provider";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  setMobileOpen: (open: boolean) => void;
}

export function Header({ collapsed, setCollapsed, setMobileOpen }: HeaderProps) {
  const { unreadCount } = useNotifications();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-surface/80 px-4 backdrop-blur-md sm:px-6 lg:px-8 print:hidden">
      {/* Left Group: Menu Controls */}
      <div className="flex items-center gap-2">
        <IconButton
          variant="ghost"
          className="lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </IconButton>

        <IconButton
          variant="ghost"
          className="hidden lg:flex"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu className="size-5" />
        </IconButton>
      </div>

      {/* Center Group: Global Search (Desktop/Tablet only) */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <Input
          placeholder="Search..."
          icon={<Search className="size-4" />}
          className="bg-muted border-transparent focus-visible:bg-surface focus-visible:border-border"
        />
      </div>

      {/* Right Group: Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        <IconButton variant="ghost" aria-label="Search" className="md:hidden">
          <Search className="size-5" />
        </IconButton>

        <ThemeToggle />

        {/* Notifications — live unread count, links to the notifications page */}
        <Link
          href="/dashboard/notifications"
          aria-label={`Notifications (${unreadCount} unread)`}
          className="focus-ring relative inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "relative flex items-center gap-2",
                "h-9 w-9 rounded-full p-0 sm:h-9 sm:w-auto sm:rounded-md sm:px-3"
              )}
            >
              <Avatar src="" fallback="JD" size="sm" className="sm:size-7" />
              <span className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium">
                John Doe
                <ChevronDown className="size-4 text-muted-foreground" />
              </span>
            </Button>
          </DropdownMenuTrigger>

          {/* FIX: align="end" pins the menu to the right edge of the avatar
              so it opens inward and never overflows on small screens */}
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-danger-fg">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}