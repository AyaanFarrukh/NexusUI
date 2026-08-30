"use client";

import * as React from "react";

import {
  DEFAULT_PREFERENCES,
  THEME_STORAGE_KEY,
  isAccent,
  isDensity,
  isSidebarMode,
  isTheme,
  type Accent,
  type Density,
  type SidebarMode,
  type Theme,
  type ThemePreferences,
} from "@/lib/theme";

type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  accent: Accent;
  sidebarMode: SidebarMode;
  density: Density;
  resolvedTheme: ResolvedTheme;
  mounted: boolean;
  setTheme: (theme: Theme) => void;
  setAccent: (accent: Accent) => void;
  setSidebarMode: (mode: SidebarMode) => void;
  setDensity: (density: Density) => void;
  resetPreferences: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readStoredPreferences(): ThemePreferences {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES;
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(raw) as Partial<ThemePreferences>;
    return {
      theme: isTheme(parsed.theme) ? parsed.theme : DEFAULT_PREFERENCES.theme,
      accent: isAccent(parsed.accent) ? parsed.accent : DEFAULT_PREFERENCES.accent,
      sidebarMode: isSidebarMode(parsed.sidebarMode)
        ? parsed.sidebarMode
        : DEFAULT_PREFERENCES.sidebarMode,
      density: isDensity(parsed.density) ? parsed.density : DEFAULT_PREFERENCES.density,
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

function writeStoredPreferences(preferences: ThemePreferences) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Storage unavailable. Preferences stay in memory.
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = React.useState<ThemePreferences>(DEFAULT_PREFERENCES);
  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setPreferences(readStoredPreferences());
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    writeStoredPreferences(preferences);
  }, [preferences, mounted]);

  // Apply preferences to <html>.
  React.useEffect(() => {
    const root = document.documentElement;
    const resolved = preferences.theme === "system" ? getSystemTheme() : preferences.theme;
    root.classList.toggle("dark", resolved === "dark");
    root.setAttribute("data-accent", preferences.accent);
    root.setAttribute("data-density", preferences.density);
    setResolvedTheme(resolved);
  }, [preferences]);

  React.useEffect(() => {
    if (preferences.theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const resolved = getSystemTheme();
      document.documentElement.classList.toggle("dark", resolved === "dark");
      setResolvedTheme(resolved);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [preferences.theme]);

  const setTheme = React.useCallback((theme: Theme) => {
    setPreferences((prev) => ({ ...prev, theme }));
  }, []);

  const setAccent = React.useCallback((accent: Accent) => {
    setPreferences((prev) => ({ ...prev, accent }));
  }, []);

  const setSidebarMode = React.useCallback((sidebarMode: SidebarMode) => {
    setPreferences((prev) => ({ ...prev, sidebarMode }));
  }, []);

  const setDensity = React.useCallback((density: Density) => {
    setPreferences((prev) => ({ ...prev, density }));
  }, []);

  const resetPreferences = React.useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);
  }, []);

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme: preferences.theme,
      accent: preferences.accent,
      sidebarMode: preferences.sidebarMode,
      density: preferences.density,
      resolvedTheme,
      mounted,
      setTheme,
      setAccent,
      setSidebarMode,
      setDensity,
      resetPreferences,
    }),
    [preferences, resolvedTheme, mounted, setTheme, setAccent, setSidebarMode, setDensity, resetPreferences]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}