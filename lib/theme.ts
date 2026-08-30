export const THEMES = ["light", "dark", "system"] as const;
export type Theme = (typeof THEMES)[number];

export const ACCENTS = ["indigo", "emerald", "violet", "rose"] as const;
export type Accent = (typeof ACCENTS)[number];

export const SIDEBAR_MODES = ["expanded", "collapsed"] as const;
export type SidebarMode = (typeof SIDEBAR_MODES)[number];

export const DENSITIES = ["comfortable", "compact"] as const;
export type Density = (typeof DENSITIES)[number];

export const THEME_STORAGE_KEY = "nexusui:preferences";

export interface ThemePreferences {
  theme: Theme;
  accent: Accent;
  sidebarMode: SidebarMode;
  density: Density;
}

export const DEFAULT_PREFERENCES: ThemePreferences = {
  theme: "system",
  accent: "indigo",
  sidebarMode: "expanded",
  density: "comfortable",
};

export const THEME_LABELS: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

export const ACCENT_LABELS: Record<Accent, string> = {
  indigo: "Indigo",
  emerald: "Emerald",
  violet: "Violet",
  rose: "Rose",
};

export const ACCENT_SWATCHES: Record<Accent, string> = {
  indigo: "#4f46e5",
  emerald: "#059669",
  violet: "#7c3aed",
  rose: "#e11d48",
};

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

export function isAccent(value: unknown): value is Accent {
  return typeof value === "string" && (ACCENTS as readonly string[]).includes(value);
}

export function isSidebarMode(value: unknown): value is SidebarMode {
  return typeof value === "string" && (SIDEBAR_MODES as readonly string[]).includes(value);
}

export function isDensity(value: unknown): value is Density {
  return typeof value === "string" && (DENSITIES as readonly string[]).includes(value);
}