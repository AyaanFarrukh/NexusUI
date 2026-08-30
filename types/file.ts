export type FileKind =
  | "folder"
  | "image"
  | "document"
  | "spreadsheet"
  | "presentation"
  | "archive"
  | "design"
  | "video"
  | "audio"
  | "code";

export interface FileItem {
  id: string;
  name: string;
  kind: FileKind;
  /** Bytes. Undefined for folders. */
  size?: number;
  modifiedAt: string;
  owner: string;
  folderId: string | null;
  starred?: boolean;
}

export interface FolderItem {
  id: string;
  name: string;
  modifiedAt: string;
  owner: string;
}