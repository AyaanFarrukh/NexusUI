"use client";

import Link from "next/link";
import {
  ArrowRight, BarChart3, Bot, Calendar, CheckCircle2, Code2, FolderKanban,
  Layers, MonitorSmartphone, Moon, Palette, Shield, Sparkles, Star, Users, Zap,
} from "lucide-react";
import type { CSSProperties } from "react";

import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";
import { ACCENTS, ACCENT_LABELS, ACCENT_SWATCHES } from "@/lib/theme";

const FEATURES = [
  { icon: Layers, title: "20+ complete pages", description: "Dashboard, users, projects, tasks, calendar, AI workspace, e-commerce, reports and more." },
  { icon: Palette, title: "4 accent colors", description: "Indigo, Emerald, Violet and Rose — switch instantly, persisted to localStorage." },
  { icon: Moon, title: "Light, dark & system", description: "Full theme engine with zero-flicker boot script." },
  { icon: MonitorSmartphone, title: "Responsive-first", description: "Tested from 320px to 1920px — every view is mobile-ready." },
  { icon: Shield, title: "Auth pages", description: "Login, register, forgot and reset password flows included." },
  { icon: Bot, title: "AI Workspace", description: "Chat UI with streaming, settings, usage — ready to wire to any provider." },
  { icon: Code2, title: "TypeScript strict", description: "Fully typed components, hooks, types and configuration." },
  { icon: Zap, title: "Zero dependencies", description: "Pure Next.js + Tailwind v4. No shadcn, no radix, no heavy libraries." },
];

const STATS = [
  { value: "20+", label: "Pages" },
  { value: "40+", label: "Components" },
  { value: "0", label: "Runtime deps" },
  { value: "100%", label: "Typed" },
];

const PAGES_PREVIEW = [
  { icon: BarChart3, name: "Analytics" },
  { icon: Users, name: "Users" },
  { icon: FolderKanban, name: "Projects" },
  { icon: Calendar, name: "Calendar" },
  { icon: Bot, name: "AI Workspace" },
  { icon: Sparkles, name: "UI Kit" },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#pages" className="transition-colors hover:text-foreground">Pages</a>
            <a href="#tech" className="transition-colors hover:text-foreground">Stack</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login" className="hidden sm:inline-flex">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">
                Try demo
                <ArrowRight className="ml-1 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent-subtle/40 via-transparent to-transparent" />
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" className="mb-5">
              <Star className="mr-1 size-3" /> Premium Next.js Admin Template
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {siteConfig.name}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              A premium admin dashboard and UI kit built with Next.js 15, Tailwind CSS v4
              and TypeScript. 20+ complete pages, 40+ reusable components, and a beautiful
              design system — ready to ship.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/dashboard">
                <Button size="lg">
                  Enter the demo
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link href="/foundation">
                <Button variant="outline" size="lg">View design system</Button>
              </Link>
            </div>

            {/* Accent swatches */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Available accents
              </span>
              <div className="flex gap-2">
                {ACCENTS.map((value) => (
                  <span
                    key={value}
                    title={ACCENT_LABELS[value]}
                    style={{ backgroundColor: ACCENT_SWATCHES[value] } as CSSProperties}
                    className="size-5 rounded-full ring-1 ring-offset-2 ring-offset-background ring-border"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-surface p-5 text-center">
                <p className="text-2xl font-bold text-foreground sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="neutral" className="mb-4">Features</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to build a real product
            </h2>
            <p className="mt-3 text-muted-foreground">
              A complete, production-grade foundation so you can focus on your business logic.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <Card key={feature.title} className="min-w-0">
                <CardContent className="p-5">
                  <span className="grid size-10 place-items-center rounded-lg bg-accent-subtle text-accent-subtle-fg">
                    <feature.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pages preview */}
      <section id="pages" className="border-t border-border bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="neutral" className="mb-4">Pages</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
               Every page you&apos;ll ever need
            </h2>
            <p className="mt-3 text-muted-foreground">
              Fully interactive — try each one in the live demo.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PAGES_PREVIEW.map((page) => (
              <Link key={page.name} href="/dashboard" className="group">
                <Card className="min-w-0 transition-colors group-hover:border-accent/40">
                  <CardContent className="flex items-center gap-3 p-4">
                    <span className="grid size-9 place-items-center rounded-lg bg-accent-subtle text-accent-subtle-fg">
                      <page.icon className="size-4" />
                    </span>
                    <span className="font-medium text-foreground">{page.name}</span>
                    <ArrowRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              + 14 more pages — see them all in the{" "}
              <Link href="/dashboard" className="font-medium text-accent hover:underline">live demo</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section id="tech" className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="neutral" className="mb-4">Stack</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Built on a modern, boring foundation
              </h2>
              <p className="mt-3 text-muted-foreground">
                Next.js 15, React 19, Tailwind CSS v4, TypeScript 5 — no surprises, no
                proprietary lock-in.
              </p>
            </div>
            <Card className="min-w-0">
              <CardContent className="space-y-3 p-5">
                {[
                  { label: "Next.js App Router", detail: "File-based routing, layouts, server components" },
                  { label: "Tailwind CSS v4", detail: "CSS-first theming with @theme directive" },
                  { label: "TypeScript 5", detail: "Strict mode, fully typed" },
                  { label: "Lucide icons", detail: "Consistent, beautiful SVG icons" },
                  { label: "Recharts", detail: "Beautiful, accessible charts" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success-fg" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-accent-subtle/20">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to ship your product?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Stop rebuilding the same dashboard. Start with {siteConfig.name} and ship in days, not months.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/dashboard">
              <Button size="lg">
                Enter the demo
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="/foundation">
              <Button variant="outline" size="lg">View design system</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© 2026 {siteConfig.name}. All rights reserved.</span>
          <span className="font-mono">Next.js 15 · React 19 · Tailwind v4 · TypeScript 5</span>
        </div>
      </footer>
    </div>
  );
}