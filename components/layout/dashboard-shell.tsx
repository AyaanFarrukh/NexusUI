"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { AppSidebar } from "./app-sidebar";
import { Header } from "./header";
import { NotificationsProvider } from "@/components/notifications/notifications-provider";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { sidebarMode, mounted } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Load the persisted sidebar default once preferences are hydrated,
  // and live-update when changed from Settings → Appearance.
  useEffect(() => {
    if (mounted) setCollapsed(sidebarMode === "collapsed");
  }, [mounted, sidebarMode]);

  return (
    <NotificationsProvider>
      <div className="flex min-h-dvh bg-background overflow-x-hidden">
        <AppSidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          pathname={pathname}
        />

        <div
          className={cn(
            "flex flex-1 flex-col transition-[padding] duration-300 min-w-0",
            collapsed ? "lg:pl-20" : "lg:pl-64"
          )}
        >
          <Header
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            setMobileOpen={setMobileOpen}
          />
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </NotificationsProvider>
  );
}