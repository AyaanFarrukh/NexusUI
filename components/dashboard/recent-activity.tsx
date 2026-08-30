import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { recentActivity } from "@/data/dashboard";

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentActivity.map((activity) => (
            <li key={activity.id} className="flex items-start gap-3">
              <Avatar fallback={activity.avatar} size="sm" />
              <div className="flex-1 space-y-1">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.user}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>{" "}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}