import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumb({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <nav aria-label="breadcrumb" className={cn("flex", className)} {...props} />;
}

export function BreadcrumbList({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return <ol className={cn("flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5", className)} {...props} />;
}

export function BreadcrumbItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("inline-flex items-center gap-1.5", className)} {...props} />;
}

export function BreadcrumbLink({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn("transition-colors hover:text-foreground", className)} {...props} />;
}

export function BreadcrumbSeparator({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5", className)} {...props}>
      <ChevronRight />
    </li>
  );
}

export function BreadcrumbPage({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span role="link" aria-disabled="true" aria-current="page" className={cn("font-normal text-foreground", className)} {...props} />;
}