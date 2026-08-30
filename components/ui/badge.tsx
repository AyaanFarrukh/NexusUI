import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "neutral"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  neutral: "bg-muted text-muted-foreground",
  accent: "bg-accent-subtle text-accent-subtle-fg",
  success: "bg-success-subtle text-success-fg",
  warning: "bg-warning-subtle text-warning-fg",
  danger: "bg-danger-subtle text-danger-fg",
  info: "bg-info-subtle text-info-fg",
  outline: "border border-border text-muted-foreground",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium",
        VARIANT_CLASSES[variant],
        className
      )}
      {...props}
    />
  );
}