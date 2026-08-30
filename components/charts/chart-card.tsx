import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  isEmpty?: boolean;
}

export function ChartCard({ title, description, children, className, isEmpty = false }: ChartCardProps) {
  return (
    <Card className={cn("flex flex-col min-w-0", className)}>
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {description && <CardDescription className="text-sm">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 min-w-0">
        {isEmpty ? (
          <EmptyState
            icon={<BarChart3 className="size-6" />}
            title="No data available"
            description="There is no data to display for this period."
            className="py-8"
          />
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}