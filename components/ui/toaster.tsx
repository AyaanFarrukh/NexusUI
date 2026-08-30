"use client";

import { useToast } from "@/lib/hooks/use-toast";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all",
            t.variant === "destructive" ? "border-danger bg-danger text-white" : "border-border bg-surface text-foreground"
          )}
        >
          <div className="grid gap-1">
            {t.title && <div className="text-sm font-semibold">{t.title}</div>}
            {t.description && <div className="text-sm opacity-90">{t.description}</div>}
          </div>
          <button
            onClick={() => dismiss(t.id)}
            className="absolute right-1 top-1 rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 focus:outline-none"
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  );
}