"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronRight,
  Download,
  Eye,
  Folder,
  LayoutGrid,
  List,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Star,
  Trash2,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { UploadDialog, type UploadedFile } from "./upload-dialog";
import { useToast } from "@/lib/hooks/use-toast";
import { filesData, foldersData } from "@/data/files";
import { timeAgo } from "@/lib/calendar";
import { fileKindMeta, formatBytes } from "@/lib/file-meta";
import { cn } from "@/lib/utils";
import type { FileItem, FolderItem } from "@/types/file";

const kindFilterOptions = [
  { value: "all", label: "All types" },
  { value: "image", label: "Images" },
  { value: "document", label: "Documents" },
  { value: "spreadsheet", label: "Spreadsheets" },
  { value: "design", label: "Design" },
  { value: "archive", label: "Archives" },
  { value: "video", label: "Videos" },
  { value: "audio", label: "Audio" },
  { value: "code", label: "Code" },
];

interface EditTarget {
  id: string;
  name: string;
  isFolder: boolean;
}

export function FilesView() {
  const { toast } = useToast();

  const [folders, setFolders] = useState<FolderItem[]>(foldersData);
  const [files, setFiles] = useState<FileItem[]>(filesData);
  const [isLoading, setIsLoading] = useState(true);

  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [kindFilter, setKindFilter] = useState("all");

  const [uploadOpen, setUploadOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState<EditTarget | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<EditTarget | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const currentFolder = folders.find((f) => f.id === currentFolderId) ?? null;

  const visibleFolders = useMemo(() => {
    if (currentFolderId) return [];
    const searchLower = search.toLowerCase();
    return folders.filter((folder) => folder.name.toLowerCase().includes(searchLower));
  }, [folders, currentFolderId, search]);

  const visibleFiles = useMemo(() => {
    const searchLower = search.toLowerCase();
    return files
      .filter((file) => file.folderId === currentFolderId)
      .filter((file) => file.name.toLowerCase().includes(searchLower))
      .filter((file) => kindFilter === "all" || file.kind === kindFilter)
      .sort((a, b) => b.modifiedAt.localeCompare(a.modifiedAt));
  }, [files, currentFolderId, search, kindFilter]);

  /* ── Actions ── */

  const toggleStar = (id: string) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, starred: !f.starred } : f)));
  };

  const openRename = (target: EditTarget) => {
    setRenameTarget(target);
    setRenameValue(target.name);
  };

  const confirmRename = () => {
    const name = renameValue.trim();
    if (!name || !renameTarget) return;
    if (renameTarget.isFolder) {
      setFolders((prev) => prev.map((f) => (f.id === renameTarget.id ? { ...f, name } : f)));
    } else {
      setFiles((prev) => prev.map((f) => (f.id === renameTarget.id ? { ...f, name } : f)));
    }
    setRenameTarget(null);
    toast({ title: "Renamed", description: name, variant: "success" });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.isFolder) {
      setFolders((prev) => prev.filter((f) => f.id !== deleteTarget.id));
      setFiles((prev) => prev.filter((f) => f.folderId !== deleteTarget.id));
      if (currentFolderId === deleteTarget.id) setCurrentFolderId(null);
    } else {
      setFiles((prev) => prev.filter((f) => f.id !== deleteTarget.id));
    }
    setDeleteTarget(null);
    toast({ title: "Deleted", description: `${deleteTarget.name} was removed.` });
  };

  const handleUploaded = (uploaded: UploadedFile[]) => {
    const now = new Date().toISOString();
    const newFiles: FileItem[] = uploaded.map((file, index) => ({
      id: `fil_${Date.now()}_${index}`,
      name: file.name,
      kind: file.kind,
      size: file.size,
      modifiedAt: now,
      owner: "John Doe",
      folderId: currentFolderId,
    }));
    setFiles((prev) => [...newFiles, ...prev]);
    toast({
      title: "Upload complete",
      description: `${uploaded.length} file${uploaded.length > 1 ? "s" : ""} added.`,
      variant: "success",
    });
  };

  const fileMenu = (file: FileItem) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8" aria-label={`Actions for ${file.name}`}>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={() => toast({ title: "Preview", description: `${file.name} — wire this to your storage provider.` })}>
          <Eye className="mr-2 size-4" /> Preview
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast({ title: "Download started", description: file.name })}>
          <Download className="mr-2 size-4" /> Download
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleStar(file.id)}>
          <Star className="mr-2 size-4" /> {file.starred ? "Unstar" : "Star"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openRename({ id: file.id, name: file.name, isFolder: false })}>
          <Pencil className="mr-2 size-4" /> Rename
        </DropdownMenuItem>
        <DropdownMenuItem className="text-danger-fg" onClick={() => setDeleteTarget({ id: file.id, name: file.name, isFolder: false })}>
          <Trash2 className="mr-2 size-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const folderMenu = (folder: FolderItem) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8" aria-label={`Actions for ${folder.name}`}>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={() => openRename({ id: folder.id, name: folder.name, isFolder: true })}>
          <Pencil className="mr-2 size-4" /> Rename
        </DropdownMenuItem>
        <DropdownMenuItem className="text-danger-fg" onClick={() => setDeleteTarget({ id: folder.id, name: folder.name, isFolder: true })}>
          <Trash2 className="mr-2 size-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const isEmptyFolder = visibleFolders.length === 0 && visibleFiles.length === 0;

  return (
    <div className="space-y-4 min-w-0">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-xs">
          <Input
            placeholder="Search files and folders..."
            icon={<Search className="size-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            options={kindFilterOptions}
            value={kindFilter}
            onChange={(e) => setKindFilter(e.target.value)}
            className="w-[150px]"
          />

          <div className="flex items-center rounded-lg border border-border bg-muted p-0.5">
            <button
              type="button"
              aria-label="Grid view"
              onClick={() => setView("grid")}
              className={cn(
                "focus-ring rounded-md p-1.5 transition-colors",
                view === "grid" ? "bg-surface text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              type="button"
              aria-label="List view"
              onClick={() => setView("list")}
              className={cn(
                "focus-ring rounded-md p-1.5 transition-colors",
                view === "list" ? "bg-surface text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="size-4" />
            </button>
          </div>

          <Button onClick={() => setUploadOpen(true)}>
            <Upload className="mr-2 size-4" />
            Upload
          </Button>
        </div>
      </div>

      {/* Breadcrumb when inside a folder */}
      {currentFolder && (
        <div className="flex items-center gap-1 text-sm">
          <Button variant="ghost" size="xs" onClick={() => setCurrentFolderId(null)}>
            My Files
          </Button>
          <ChevronRight className="size-3.5 text-muted-foreground" />
          <span className="font-medium text-foreground">{currentFolder.name}</span>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 auto-rows-fr sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-xl" />
          ))}
        </div>
      ) : isEmptyFolder ? (
        <Card className="min-w-0">
          <EmptyState
            icon={<Folder className="size-8" />}
            title={search || kindFilter !== "all" ? "No matches found" : "This folder is empty"}
            description={
              search || kindFilter !== "all"
                ? "Try adjusting your search or type filter."
                : "Upload files to get started."
            }
            action={
              <Button onClick={() => setUploadOpen(true)}>
                <Plus className="mr-2 size-4" />
                Upload files
              </Button>
            }
            className="py-16"
          />
        </Card>
      ) : (
        <>
          {/* ── Folder cards (root only) ── */}
          {visibleFolders.length > 0 && (
            <div className="grid grid-cols-2 gap-4 auto-rows-fr sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-w-0">
              {visibleFolders.map((folder) => {
                const count = files.filter((f) => f.folderId === folder.id).length;
                return (
                  <Card key={folder.id} className="flex h-full min-w-0 flex-col transition-colors hover:border-accent/40">
                    <div className="relative flex-1 p-4">
                      <div className="absolute right-2 top-2" onClick={(e) => e.stopPropagation()}>
                        {folderMenu(folder)}
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentFolderId(folder.id)}
                        className="focus-ring w-full rounded-lg text-left"
                      >
                        <span className="grid size-10 place-items-center rounded-lg bg-warning-subtle text-warning-fg">
                          <Folder className="size-5" />
                        </span>
                        <p className="mt-3 truncate text-sm font-medium text-foreground">{folder.name}</p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {count} item{count !== 1 ? "s" : ""} · {timeAgo(folder.modifiedAt)}
                        </p>
                      </button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* ── Files ── */}
          {visibleFiles.length > 0 &&
            (view === "grid" ? (
              <div className="grid grid-cols-2 gap-4 auto-rows-fr sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-w-0">
                {visibleFiles.map((file) => {
                  const meta = fileKindMeta[file.kind];
                  const Icon = meta.icon;
                  return (
                    <Card key={file.id} className="flex h-full min-w-0 flex-col transition-colors hover:border-accent/40">
                      <div className="relative flex-1 p-4">
                        <div className="absolute right-2 top-2 flex items-center gap-0.5">
                          {file.starred && <Star className="size-3.5 fill-warning text-warning" />}
                          {fileMenu(file)}
                        </div>
                        <button
                          type="button"
                          onClick={() => toast({ title: "Preview", description: `${file.name} — wire this to your storage provider.` })}
                          className="focus-ring w-full rounded-lg text-left"
                        >
                          <span className={cn("grid size-10 place-items-center rounded-lg", meta.iconClass)}>
                            <Icon className="size-5" />
                          </span>
                          <p className="mt-3 truncate text-sm font-medium text-foreground">{file.name}</p>
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {file.size ? formatBytes(file.size) : "—"} · {timeAgo(file.modifiedAt)}
                          </p>
                        </button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-surface shadow-card">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Name</th>
                        <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Owner</th>
                        <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Size</th>
                        <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Modified</th>
                        <th className="whitespace-nowrap px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {visibleFiles.map((file) => {
                        const meta = fileKindMeta[file.kind];
                        const Icon = meta.icon;
                        return (
                          <tr key={file.id} className="transition-colors hover:bg-muted/30">
                            <td className="whitespace-nowrap px-6 py-3.5">
                              <div className="flex items-center gap-3">
                                <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", meta.iconClass)}>
                                  <Icon className="size-4" />
                                </span>
                                <span className="flex items-center gap-1.5 font-medium text-foreground">
                                  {file.name}
                                  {file.starred && <Star className="size-3.5 fill-warning text-warning" />}
                                </span>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-3.5 text-muted-foreground">{file.owner}</td>
                            <td className="whitespace-nowrap px-6 py-3.5 text-muted-foreground">
                              {file.size ? formatBytes(file.size) : "—"}
                            </td>
                            <td className="whitespace-nowrap px-6 py-3.5 text-muted-foreground">{timeAgo(file.modifiedAt)}</td>
                            <td className="whitespace-nowrap px-6 py-3.5 text-right">{fileMenu(file)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
        </>
      )}

      {/* ── Upload dialog ── */}
      <UploadDialog open={uploadOpen} onOpenChange={setUploadOpen} onUploaded={handleUploaded} />

      {/* ── Rename dialog ── */}
      <Dialog open={renameTarget !== null} onOpenChange={(open) => !open && setRenameTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename {renameTarget?.isFolder ? "folder" : "file"}</DialogTitle>
            <DialogDescription>Choose a new name for “{renameTarget?.name}”.</DialogDescription>
          </DialogHeader>
          <Input value={renameValue} onChange={(e) => setRenameValue(e.target.value)} autoFocus />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameTarget(null)}>Cancel</Button>
            <Button onClick={confirmRename} disabled={!renameValue.trim()}>Rename</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete dialog ── */}
      <Dialog open={deleteTarget !== null} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {deleteTarget?.isFolder ? "folder" : "file"}</DialogTitle>
            <DialogDescription>
              {deleteTarget?.isFolder
                ? `“${deleteTarget?.name}” and all files inside it will be permanently deleted.`
                : `“${deleteTarget?.name}” will be permanently deleted.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}