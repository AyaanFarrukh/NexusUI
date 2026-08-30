"use client";

import type { CSSProperties } from "react";
import { Check } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/components/theme-provider";
import {
  ACCENTS,
  ACCENT_LABELS,
  ACCENT_SWATCHES,
  DENSITIES,
  SIDEBAR_MODES,
  THEMES,
  THEME_LABELS,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

function Segmented<T extends string>({
  options,
  value,
  onChange,
  labels,
}: {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  labels: Record<T, string>;
}) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-lg border border-border bg-muted p-1">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={cn(
            "focus-ring rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors",
            value === option
              ? "bg-surface text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {labels[option]}
        </button>
      ))}
    </div>
  );
}

export function AppearanceSection() {
  const { theme, setTheme, accent, setAccent, sidebarMode, setSidebarMode, density, setDensity } =
    useTheme();

  return (
    <div className="space-y-4 min-w-0">
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose how the dashboard looks on this device.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Mode</p>
            <Segmented options={THEMES} value={theme} onChange={setTheme} labels={THEME_LABELS} />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Accent color</p>
            <div className="flex flex-wrap gap-3">
              {ACCENTS.map((value) => {
                const active = accent === value;
                return (
                  <button
                    key={value}
                    type="button"
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
          </div>
        </CardContent>
      </Card>

      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Layout</CardTitle>
          <CardDescription>Control the shell density and sidebar behavior.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Sidebar default</p>
            <Segmented
              options={SIDEBAR_MODES}
              value={sidebarMode}
              onChange={setSidebarMode}
              labels={{ expanded: "Expanded", collapsed: "Collapsed" }}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Density</p>
            <Segmented
              options={DENSITIES}
              value={density}
              onChange={setDensity}
              labels={{ comfortable: "Comfortable", compact: "Compact" }}
            />
            <p className="text-xs text-muted-foreground">
              Compact scales the whole interface down to fit more on screen.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}