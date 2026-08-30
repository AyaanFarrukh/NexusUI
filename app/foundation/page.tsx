"use client";

import * as React from "react";
import {
  AppWindow,
  Braces,
  Check,
  Layers,
  MonitorSmartphone,
  Palette,
  RotateCcw,
  Wind,
  Search,
} from "lucide-react";
import type { CSSProperties } from "react";

import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/components/theme-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/lib/site";
import {
  ACCENTS,
  ACCENT_LABELS,
  ACCENT_SWATCHES,
  THEMES,
  THEME_LABELS,
} from "@/lib/theme";
import { cn } from "@/lib/utils";


import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/lib/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";
import { IconButton } from "@/components/ui/icon-button";
import Link from "next/link";

const FOUNDATION_FEATURES = [
  {
    icon: AppWindow,
    title: "Next.js App Router",
    description: "File-based routing, layouts and server components.",
  },
  {
    icon: Braces,
    title: "TypeScript strict",
    description: "Typed components, tokens and configuration.",
  },
  {
    icon: Wind,
    title: "Tailwind CSS v4",
    description: "CSS-first theming with semantic design tokens.",
  },
  {
    icon: Palette,
    title: "Theme engine",
    description: "Light, dark and system modes with four accents.",
  },
  {
    icon: Layers,
    title: "UI primitives",
    description: "Button, badge, card and full Milestone 2 component set.",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive-first",
    description: "Designed to hold up from 320px to 1920px.",
  },
] as const;

const TOKEN_PREVIEW = [
  { swatch: "bg-background", usage: "bg-background" },
  { swatch: "bg-surface", usage: "bg-surface" },
  { swatch: "bg-muted", usage: "bg-muted" },
  { swatch: "bg-border", usage: "border-border" },
  { swatch: "bg-accent", usage: "bg-accent" },
  { swatch: "bg-accent-subtle", usage: "bg-accent-subtle" },
] as const;

function AppearanceControls() {
  const { theme, setTheme, accent, setAccent, resetPreferences, resolvedTheme, mounted } =
    useTheme();

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Appearance engine</CardTitle>
        <CardDescription>
          Preferences persist to localStorage and apply instantly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground">Mode</span>
          <div
            role="radiogroup"
            aria-label="Color mode"
            className="grid grid-cols-3 gap-1 rounded-lg border border-border bg-muted p-1"
          >
            {THEMES.map((mode) => (
              <button
                key={mode}
                type="button"
                role="radio"
                aria-checked={theme === mode}
                onClick={() => setTheme(mode)}
                className={cn(
                  "focus-ring h-8 rounded-md text-sm font-medium transition-colors",
                  theme === mode
                    ? "bg-surface text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {THEME_LABELS[mode]}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground">Accent color</span>
          <div role="radiogroup" aria-label="Accent color" className="flex gap-3">
            {ACCENTS.map((value) => {
              const active = accent === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  aria-label={`${ACCENT_LABELS[value]} accent`}
                  onClick={() => setAccent(value)}
                  style={
                    {
                      backgroundColor: ACCENT_SWATCHES[value],
                      "--tw-ring-color": ACCENT_SWATCHES[value],
                    } as CSSProperties
                  }
                  className={cn(
                    "focus-ring grid size-9 place-items-center rounded-full text-white transition-transform hover:scale-105",
                    active && "ring-2 ring-offset-2 ring-offset-surface"
                  )}
                >
                  {active && <Check className="size-4" strokeWidth={3} />}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {mounted ? (
              <>
                Rendering in{" "}
                <span className="font-medium text-foreground">{resolvedTheme}</span> mode with
                the{" "}
                <span className="font-medium text-foreground">{ACCENT_LABELS[accent]}</span>{" "}
                accent.
              </>
            ) : (
              "Reading preferences…"
            )}
          </p>
        </div>

        <div className="border-t border-border pt-4">
          <Button variant="outline" size="sm" onClick={resetPreferences}>
            <RotateCcw />
            Reset preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FoundationPage() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <div className="flex items-center gap-3">
			  <Badge variant="neutral">v{siteConfig.version}</Badge>
			  <ThemeToggle />
			  <Link href="/login">
				<Button size="sm">Sign in</Button>
	          </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="max-w-2xl">
            <Badge variant="accent" className="mb-4">
              Milestone 2 · Design System & UI Primitives
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              The foundation & design system are ready.
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {siteConfig.name} is a premium Next.js + Tailwind CSS admin dashboard and UI kit.
              This page verifies the toolchain, design tokens, theming engine, and the complete set of reusable UI primitives that every later milestone builds on.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-5">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Foundation checklist</CardTitle>
                <CardDescription>
                  Everything below is configured and verified in this build.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {FOUNDATION_FEATURES.map((feature) => (
                    <li
                      key={feature.title}
                      className="flex items-start gap-3 rounded-lg border border-border/70 bg-background/50 p-3"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-md bg-accent-subtle text-accent-subtle-fg">
                        <feature.icon className="size-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-foreground">
                          {feature.title}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                          {feature.description}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <AppearanceControls />
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Design tokens</CardTitle>
              <CardDescription>
                Semantic tokens live in app/globals.css and drive every component — switch the
                accent or mode above to see them respond.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {TOKEN_PREVIEW.map((item) => (
                  <span
                    key={item.usage}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5"
                  >
                    <span
                      className={cn(
                        "size-4 rounded border border-border/60",
                        item.swatch
                      )}
                    />
                    <span className="font-mono text-xs text-muted-foreground">{item.usage}</span>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Milestone 2: UI Primitives</CardTitle>
              <CardDescription>
                The foundational building blocks for the dashboard. All components are fully typed, accessible, and theme-aware.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Input</label>
                  <Input placeholder="Search users..." icon={<Search className="size-4" />} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Select</label>
                  <Select options={[{ value: "1", label: "Active" }, { value: "2", label: "Inactive" }]} placeholder="Filter by status" />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <Checkbox label="Accept terms" />
                <Switch label="Enable notifications" />
                <Avatar src="" fallback="John Doe" size="md" />
                <Tooltip content="This is a tooltip">
                  <Button variant="outline">Hover me</Button>
                </Tooltip>
                <IconButton variant="ghost" size="icon" aria-label="Settings">
                  <Wind className="size-4" />
                </IconButton>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button onClick={() => toast({ title: "Success", description: "Action completed successfully.", variant: "success" })}>
                  Show Success Toast
                </Button>
                <Button variant="destructive" onClick={() => toast({ title: "Error", description: "Something went wrong.", variant: "destructive" })}>
                  Show Error Toast
                </Button>
                
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger className="inline-flex h-9 items-center justify-center rounded-lg bg-muted px-4 text-sm font-medium transition-colors hover:bg-muted-hover focus-ring">
                    Open Dialog
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Action</DialogTitle>
                      <DialogDescription>Are you sure you want to proceed? This cannot be undone.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                      <Button onClick={() => { toast({ title: "Confirmed" }); setDialogOpen(false); }}>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Options</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem className="text-danger">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Storage Usage</span>
                  <span className="text-muted-foreground">65%</span>
                </div>
                <Progress value={65} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tabs</label>
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="p-4 border border-border rounded-lg mt-2">
                    <p className="text-sm text-muted-foreground">Overview content goes here.</p>
                  </TabsContent>
                  <TabsContent value="analytics" className="p-4 border border-border rounded-lg mt-2">
                    <p className="text-sm text-muted-foreground">Analytics charts will be added in Milestone 4.</p>
                  </TabsContent>
                  <TabsContent value="settings" className="p-4 border border-border rounded-lg mt-2">
                    <p className="text-sm text-muted-foreground">Settings forms will be added in Milestone 16.</p>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-3">
                <Alert variant="success">
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Your changes have been saved successfully.</AlertDescription>
                </Alert>
                <Alert variant="warning">
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>Your trial expires in 3 days.</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Failed to connect to the database.</AlertDescription>
                </Alert>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Breadcrumb</label>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem><BreadcrumbLink href="#">Dashboard</BreadcrumbLink></BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem><BreadcrumbLink href="#">Projects</BreadcrumbLink></BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem><BreadcrumbPage>NexusUI</BreadcrumbPage></BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Pagination</label>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                    <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationEllipsis /></PaginationItem>
                    <PaginationItem><PaginationNext href="#" /></PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Skeleton Loading</label>
                <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                  <Skeleton className="size-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-lg p-4">
                <EmptyState 
                  icon={<Layers className="size-6" />}
                  title="No projects found"
                  description="You haven't created any projects yet. Click below to get started."
                  action={<Button>Create Project</Button>}
                />
              </div>

            </CardContent>
          </Card>

          <p className="mt-8 text-sm text-muted-foreground">
            Next: Global dashboard shell (sidebar, header, mobile navigation).
          </p>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>
            © 2026 {siteConfig.name}. Frontend-only template — no backend, no API keys.
          </span>
          <span className="font-mono">Next.js · Tailwind CSS v4 · TypeScript</span>
        </div>
      </footer>
    </div>
  );
}