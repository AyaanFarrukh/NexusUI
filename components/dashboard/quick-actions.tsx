import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Download, UserPlus } from "lucide-react";

const actions = [
  { label: "New Project", icon: Plus },
  { label: "Upload Files", icon: Upload },
  { label: "Export Report", icon: Download },
  { label: "Add User", icon: UserPlus },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button key={action.label} variant="outline" className="h-auto flex-col items-center gap-2 py-4">
              <action.icon className="size-5 text-accent" />
              <span className="text-xs font-normal">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}