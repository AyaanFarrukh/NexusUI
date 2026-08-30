import { SettingsView } from "@/components/settings/settings-view";

export default function SettingsPage() {
  return (
    <div className="space-y-6 min-w-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your workspace, appearance and account.</p>
      </div>
      <SettingsView />
    </div>
  );
}