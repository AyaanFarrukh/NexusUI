import {
  FileArchive,
  FileAudio,
  FileCode,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Folder,
  PenTool,
  Presentation,
} from "lucide-react";
import type { FileKind } from "@/types/file";

export const fileKindMeta: Record<
  FileKind,
  { label: string; icon: React.ComponentType<{ className?: string }>; iconClass: string }
> = {
  folder: { label: "Folder", icon: Folder, iconClass: "bg-warning-subtle text-warning-fg" },
  image: { label: "Image", icon: FileImage, iconClass: "bg-info-subtle text-info-fg" },
  document: { label: "Document", icon: FileText, iconClass: "bg-accent-subtle text-accent-subtle-fg" },
  spreadsheet: { label: "Spreadsheet", icon: FileSpreadsheet, iconClass: "bg-success-subtle text-success-fg" },
  presentation: { label: "Presentation", icon: Presentation, iconClass: "bg-warning-subtle text-warning-fg" },
  archive: { label: "Archive", icon: FileArchive, iconClass: "bg-muted text-muted-foreground" },
  design: { label: "Design", icon: PenTool, iconClass: "bg-accent-subtle text-accent-subtle-fg" },
  video: { label: "Video", icon: FileVideo, iconClass: "bg-danger-subtle text-danger-fg" },
  audio: { label: "Audio", icon: FileAudio, iconClass: "bg-info-subtle text-info-fg" },
  code: { label: "Code", icon: FileCode, iconClass: "bg-success-subtle text-success-fg" },
};

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  return `${value >= 100 ? Math.round(value) : value.toFixed(1)} ${units[i]}`;
}

/** Infer a FileKind from a file extension (used by the upload UI). */
export function kindFromFilename(name: string): FileKind {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (["png", "jpg", "jpeg", "gif", "svg", "webp"].includes(ext)) return "image";
  if (["pdf", "doc", "docx", "txt", "md"].includes(ext)) return "document";
  if (["xls", "xlsx", "csv"].includes(ext)) return "spreadsheet";
  if (["ppt", "pptx", "key"].includes(ext)) return "presentation";
  if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) return "archive";
  if (["fig", "sketch", "xd"].includes(ext)) return "design";
  if (["mp4", "mov", "webm", "avi"].includes(ext)) return "video";
  if (["mp3", "wav", "ogg", "flac"].includes(ext)) return "audio";
  if (["js", "ts", "tsx", "json", "html", "css", "py"].includes(ext)) return "code";
  return "document";
}