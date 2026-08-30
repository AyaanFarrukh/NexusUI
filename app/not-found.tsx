import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="flex items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/">
          <Logo />
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <Card className="w-full max-w-lg min-w-0">
          <CardContent className="py-12 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-danger-subtle text-danger-fg">
              <Search className="size-7" />
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">404</h1>
            <h2 className="mt-2 text-lg font-semibold text-foreground">Page not found</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
              The page you're looking for doesn't exist, may have been moved, or the URL is incorrect.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/">
                <Button>
                  <Home className="mr-2 size-4" />
                  Go home
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 size-4" />
                  Back to dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="px-6 py-6 text-center text-xs text-muted-foreground sm:px-8">
        © 2026 NexusUI. All rights reserved.
      </footer>
    </div>
  );
}