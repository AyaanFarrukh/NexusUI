import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Show the product name next to the mark. */
  withWordmark?: boolean;
  className?: string;
}

/**
 * Product logo. The mark inherits the active accent color, so it follows
 * the theme engine automatically. Replace the SVG to rebrand.
 */
export function Logo({ withWordmark = true, className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden="true"
        className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-accent-fg shadow-xs"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
        >
          <path d="M6 19V5l12 14V5" />
        </svg>
      </span>
      {withWordmark ? (
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          {siteConfig.name}
        </span>
      ) : (
        <span className="sr-only">{siteConfig.name}</span>
      )}
    </span>
  );
}