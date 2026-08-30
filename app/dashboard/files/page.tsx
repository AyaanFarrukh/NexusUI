import { FilesView } from "@/components/files/files-view";

export default function FilesPage() {
  return (
    <div className="space-y-6 min-w-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Files</h1>
          <p className="text-muted-foreground">Browse, upload and organize your team&apos;s documents.</p>
      </div>
      <FilesView />
    </div>
  );
}