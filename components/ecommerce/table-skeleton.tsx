import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-4 p-6">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="size-10 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-[220px]" />
            <Skeleton className="h-3 w-[140px]" />
          </div>
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="hidden h-4 w-16 sm:block" />
        </div>
      ))}
    </div>
  );
}