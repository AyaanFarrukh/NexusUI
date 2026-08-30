"use client";

import Link from "next/link";
import { X } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { IconButton } from "@/components/ui/icon-button";
import { navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  pathname: string;
}

export function AppSidebar({ collapsed, mobileOpen, setMobileOpen, pathname }: AppSidebarProps) {
  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  /**
   * Renders the sidebar content.
   * `isCollapsed` controls the icon-only compact layout.
   * Desktop passes the user's collapsed preference;
   * the mobile drawer ALWAYS passes false (full layout).
   */
  const renderContent = (isCollapsed: boolean) => (
    <div className="flex h-full flex-col">
      <div
        className={cn(
          "flex h-16 items-center border-b border-border px-4",
          isCollapsed ? "justify-center" : "justify-start"
        )}
      >
        <Logo withWordmark={!isCollapsed} />
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        {navigation.map((section) => (
          <div key={section.title} className="mb-4">
            {!isCollapsed && (
              <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title={isCollapsed ? item.title : undefined}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-accent-subtle text-accent-subtle-fg"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        isCollapsed && "justify-center px-2"
                      )}
                    >
                      <item.icon className="size-5 shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* ─── Desktop sidebar — respects the collapsed preference ─── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-surface transition-[width] duration-300 lg:flex",
          collapsed && "w-20"
        )}
      >
        {renderContent(collapsed)}
      </aside>

      {/* ─── Mobile drawer — ALWAYS the full expanded layout ─── */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex lg:hidden transition-opacity duration-300",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        inert={!mobileOpen}
      >
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
        <aside
          className={cn(
            "relative flex w-64 flex-col bg-surface shadow-xl transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="absolute right-2 top-2 z-10">
            <IconButton
              variant="ghost"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="size-5" />
            </IconButton>
          </div>
          {renderContent(false)}
        </aside>
      </div>
    </>
  );
}