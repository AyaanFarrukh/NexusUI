import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" className="focus-ring rounded-md">
          <Logo />
        </Link>
        <ThemeToggle />
      </header>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 text-center text-xs text-muted-foreground sm:px-8">
        © 2026 NexusUI. All rights reserved.
      </footer>
    </div>
  );
}