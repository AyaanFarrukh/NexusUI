"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface DropdownContextValue {
  open: boolean;
  toggle: () => void;
  close: () => void;
}

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ open, toggle: () => setOpen(!open), close: () => setOpen(false) }}>
      <div className="relative inline-block text-left" ref={ref}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({ children, asChild, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const context = React.useContext(DropdownContext);
  if (!context) throw new Error("DropdownMenuTrigger must be used within DropdownMenu");
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: context.toggle,
      ...props,
    });
  }

  return (
    <button type="button" onClick={context.toggle} {...props}>
      {children}
    </button>
  );
}

export function DropdownMenuContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(DropdownContext);
  if (!context || !context.open) return null;

  return (
    <div
      className={cn(
        "absolute right-0 z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface p-1 shadow-md animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    />
  );
}

export function DropdownMenuItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(DropdownContext);
  return (
    <div
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-muted focus:bg-muted focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      onClick={context?.close}
      {...props}
    />
  );
}