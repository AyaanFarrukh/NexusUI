"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to your error reporting service (Sentry, LogRocket, etc.)
    // eslint-disable-next-line no-console
    console.error("Runtime error caught by error boundary:", error);
  }, [error]);

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
            <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-warning-subtle text-warning-fg">
              <AlertTriangle className="size-7" />
            </span>
            <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
              Something went wrong
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
              An unexpected error occurred. Our team has been notified. You can try again or
              return to the dashboard.
            </p>
            {error.digest && (
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button onClick={() => reset()}>
                <RefreshCw className="mr-2 size-4" />
                Try again
              </Button>
              <Link href="/">
                <Button variant="outline">
                  <Home className="mr-2 size-4" />
                  Go home
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