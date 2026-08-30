import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";

export function Pagination({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav role="navigation" aria-label="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />
  );
}

export function PaginationContent({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("flex flex-row items-center gap-1", className)} {...props} />;
}

export function PaginationItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("", className)} {...props} />;
}

export function PaginationLink({ className, isActive, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { isActive?: boolean }) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md text-sm transition-colors hover:bg-muted",
        isActive ? "bg-accent text-accent-fg hover:bg-accent" : "text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export function PaginationPrevious({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a aria-label="Go to previous page" className={cn("inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", className)} {...props}>
      <ChevronLeft className="size-4" />
      <span>Previous</span>
    </a>
  );
}

export function PaginationNext({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a aria-label="Go to next page" className={cn("inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", className)} {...props}>
      <span>Next</span>
      <ChevronRight className="size-4" />
    </a>
  );
}

export function PaginationEllipsis({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span aria-hidden className={cn("flex size-9 items-center justify-center", className)} {...props}>
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}