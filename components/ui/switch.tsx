"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  /** Called with the new checked state whenever the switch is toggled. */
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, id, onCheckedChange, onChange, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={inputId}
          ref={ref}
          className="peer sr-only"
          onChange={(event) => {
            onCheckedChange?.(event.target.checked);
            onChange?.(event);
          }}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-muted shadow-sm transition-colors",
            "peer-checked:bg-accent peer-checked:[&>span]:translate-x-4",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            className
          )}
        >
          <span className="pointer-events-none block size-4 rounded-full bg-background shadow-lg transition-transform" />
        </label>
        {label && (
          <label
            htmlFor={inputId}
            className="cursor-pointer select-none text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Switch.displayName = "Switch";