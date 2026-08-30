import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  fallback: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
};

export function Avatar({ src, fallback, size = "md", className }: AvatarProps) {
  const initials = fallback
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (src) {
    return (
      <div className={cn("relative overflow-hidden rounded-full bg-muted", sizeClasses[size], className)}>
        <Image
          src={src}
          alt={fallback}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid place-items-center rounded-full bg-accent-subtle font-medium text-accent-subtle-fg",
        sizeClasses[size],
        className
      )}
    >
      {initials}
    </div>
  );
}