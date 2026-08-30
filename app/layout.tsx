import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/lib/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/lib/site";
import { THEME_STORAGE_KEY } from "@/lib/theme";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  keywords: [
    "next.js", "admin dashboard", "admin template", "react", "tailwind css v4",
    "typescript", "ui kit", "react 19", "admin ui", "saas template",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
};

const themeInitScript = `(function () {
  try {
    var stored = null;
    try {
      stored = JSON.parse(localStorage.getItem("${THEME_STORAGE_KEY}") || "null");
    } catch (e) {}
    var theme = stored && ["light", "dark", "system"].indexOf(stored.theme) !== -1
      ? stored.theme
      : "system";
    var accent = stored && ["indigo", "emerald", "violet", "rose"].indexOf(stored.accent) !== -1
      ? stored.accent
      : "indigo";
    var density = stored && ["comfortable", "compact"].indexOf(stored.density) !== -1
      ? stored.density
      : "comfortable";
    var dark = theme === "dark" ||
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    var root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.setAttribute("data-accent", accent);
    root.setAttribute("data-density", density);
  } catch (e) {}
})();`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <ThemeProvider>
          <ToastProvider>
            {children}
            <Toaster />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}