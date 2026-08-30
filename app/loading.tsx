import { Skeleton } from "@/components/ui/skeleton";

export default function GlobalLoading() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="flex h-16 items-center justify-between border-b border-border bg-surface px-6">
        <Skeleton className="h-6 w-28" />
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="size-8 rounded-lg" />
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
}