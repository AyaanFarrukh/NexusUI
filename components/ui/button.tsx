import * as React from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "icon";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-fg shadow-xs hover:bg-accent-hover",
  secondary: "bg-muted text-foreground hover:bg-muted-hover",
  outline: "border border-border bg-transparent text-foreground hover:bg-muted",
  ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
  destructive: "bg-danger text-white shadow-xs hover:bg-danger-hover",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  xs: "h-7 gap-1.5 px-2.5 text-xs",
  sm: "h-8 gap-2 px-3 text-sm",
  md: "h-9 gap-2 px-4 text-sm",
  lg: "h-10 gap-2 px-5 text-base",
  icon: "size-9",
};

const BASE_CLASSES =
  "focus-ring inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/**
 * Base button primitive. Variants are driven by semantic design tokens,
 * so every button restyles itself when the theme or accent changes.
 * Defaults to type="button" to avoid accidental form submission.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className)}
      {...props}
    />
  )
);

Button.displayName = "Button";