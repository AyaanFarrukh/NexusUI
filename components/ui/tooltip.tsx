"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Omit<"content"> removes the native HTML `content` attribute (string)
 * so we can define our own rich `content` prop (ReactNode).
 */
export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ content, side = "top", className, children, ...props }: TooltipProps) {
  return (
    <div className={cn("group relative inline-flex", className)} {...props}>
      {children}
      <div
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-md transition-opacity duration-150",
          "group-hover:opacity-100 group-focus-within:opacity-100",
          side === "top" && "bottom-full left-1/2 mb-2 -translate-x-1/2",
          side === "bottom" && "top-full left-1/2 mt-2 -translate-x-1/2",
          side === "left" && "right-full top-1/2 mr-2 -translate-y-1/2",
          side === "right" && "left-full top-1/2 ml-2 -translate-y-1/2"
        )}
      >
        {content}
      </div>
    </div>
  );
}