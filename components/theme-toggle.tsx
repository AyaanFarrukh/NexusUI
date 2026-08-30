"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { mounted, resolvedTheme, setTheme } = useTheme();

  // Placeholder keeps layout stable until preferences are read.
  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface"
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="focus-ring inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}