"use client";

import * as React from "react";
import { Check } from "lucide-react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  /** Called with the new checked state whenever the checkbox is toggled. */
  onCheckedChange?: (checked: boolean) => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, onCheckedChange, onChange, ...props }, ref) => {
    // Always call useId unconditionally, then use it as fallback if no id provided
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="flex items-center gap-2">
        <div className="relative grid place-items-center">
          <input
            type="checkbox"
            id={inputId}
            ref={ref}
            className="peer size-4 shrink-0 cursor-pointer appearance-none rounded border border-border bg-surface shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring checked:border-accent checked:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(event) => {
              onCheckedChange?.(event.target.checked);
              onChange?.(event);
            }}
            {...props}
          />
          <Check
            className="pointer-events-none absolute size-3 text-transparent peer-checked:text-accent-fg"
            strokeWidth={3}
          />
        </div>
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
Checkbox.displayName = "Checkbox";