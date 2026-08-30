import * as React from "react";
import { cn } from "@/lib/utils";

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ content, side = "top", className, children, ...props }: TooltipProps) {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className="group relative inline-block" {...props}>
      {children}
      <div
        role="tooltip"
        className={cn(
          "absolute z-50 hidden rounded-md bg-foreground px-2 py-1 text-xs text-background shadow-md group-hover:block group-focus-within:block animate-in fade-in-0 zoom-in-95",
          positionClasses[side],
          className
        )}
      >
        {content}
      </div>
    </div>
  );
}