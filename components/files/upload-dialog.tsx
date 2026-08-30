"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { formatBytes, kindFromFilename } from "@/lib/file-meta";
import type { FileKind } from "@/types/file";

export interface UploadedFile {
  name: string;
  size: number;
  kind: FileKind;
}

interface UploadQueueItem extends UploadedFile {
  id: string;
  progress: number;
  done: boolean;
}

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploaded: (files: UploadedFile[]) => void;
}

export function UploadDialog({ open, onOpenChange, onUploaded }: UploadDialogProps) {
  const [queue, setQueue] = useState<UploadQueueItem[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timersRef = useRef<Record<string, ReturnType<typeof setInterval>>>({});

  // Clean up intervals when the dialog closes
  useEffect(() => {
    if (!open) {
      Object.values(timersRef.current).forEach(clearInterval);
      timersRef.current = {};
      setQueue([]);
      setDragOver(false);
    }
  }, [open]);

  const startUpload = (id: string) => {
    timersRef.current[id] = setInterval(() => {
      setQueue((prev) =>
        prev.map((item) => {
          if (item.id !== id || item.done) return item;
          const next = Math.min(100, item.progress + 8 + Math.random() * 14);
          if (next >= 100) {
            clearInterval(timersRef.current[id]);
            delete timersRef.current[id];
            return { ...item, progress: 100, done: true };
          }
          return { ...item, progress: next };
        })
      );
    }, 120);
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const entries: UploadQueueItem[] = Array.from(list).map((file, index) => ({
      id: `up_${Date.now()}_${index}`,
      name: file.name,
      size: file.size || 250_000,
      kind: kindFromFilename(file.name),
      progress: 0,
      done: false,
    }));
    setQueue((prev) => [...prev, ...entries]);
    entries.forEach((entry) => startUpload(entry.id));
  };

  const allDone = queue.length > 0 && queue.every((item) => item.done);

  const finish = () => {
    onUploaded(queue.map(({ name, size, kind }) => ({ name, size, kind })));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload files</DialogTitle>
          <DialogDescription>
            Demo upload — files are added to the manager locally, nothing leaves your browser.
          </DialogDescription>
        </DialogHeader>

        {/* Dropzone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            addFiles(e.dataTransfer.files);
          }}
          className={cn(
            "grid place-items-center rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-10 text-center transition-colors",
            dragOver && "border-accent bg-accent-subtle/40"
          )}
        >
          <div>
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent-subtle text-accent-subtle-fg">
              <Upload className="size-5" />
            </span>
            <p className="mt-3 text-sm font-medium text-foreground">Drag & drop files here</p>
            <p className="mt-1 text-xs text-muted-foreground">or</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => inputRef.current?.click()}>
              Browse files
            </Button>
            <input
              ref={inputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
              aria-label="Browse files"
            />
          </div>
        </div>

        {/* Queue */}
        {queue.length > 0 && (
          <ul className="max-h-48 space-y-3 overflow-y-auto scrollbar-thin">
            {queue.map((item) => (
              <li key={item.id} className="space-y-1.5">
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="min-w-0 truncate font-medium text-foreground">{item.name}</span>
                  <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                    {item.done ? (
                      <CheckCircle2 className="size-4 text-success-fg" />
                    ) : (
                      <button
                        type="button"
                        aria-label={`Cancel upload of ${item.name}`}
                        className="focus-ring rounded text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          clearInterval(timersRef.current[item.id]);
                          setQueue((prev) => prev.filter((q) => q.id !== item.id));
                        }}
                      >
                        <X className="size-3.5" />
                      </button>
                    )}
                    {formatBytes(item.size)}
                  </span>
                </div>
                <Progress value={item.progress} />
              </li>
            ))}
          </ul>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {allDone ? "Close" : "Cancel"}
          </Button>
          <Button onClick={finish} disabled={!allDone}>
            Add to files
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}