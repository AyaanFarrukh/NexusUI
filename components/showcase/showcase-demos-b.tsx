"use client";

import { AlertCircle, CheckCircle2, Info, ShieldAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/lib/hooks/use-toast";
import { Inbox } from "lucide-react";

export function AlertsDemo() {
  return (
    <div className="grid gap-4 lg:grid-cols-2 min-w-0">
      <Alert>
        <Info className="size-4" />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>This is a neutral informational alert.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CheckCircle2 className="size-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes have been saved.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertCircle className="size-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Your trial expires in 3 days.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <ShieldAlert className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong. Try again.</AlertDescription>
      </Alert>
    </div>
  );
}

export function CardsDemo() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 min-w-0">
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Basic card</CardTitle>
          <CardDescription>A simple titled card.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Card body content goes here.</p>
        </CardContent>
      </Card>
      <Card className="min-w-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>With action</CardTitle>
          <Button variant="ghost" size="xs">Action</Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Header includes a right-aligned action.</p>
        </CardContent>
      </Card>
      <Card className="min-w-0">
        <CardContent className="p-5">
          <p className="text-sm font-medium text-muted-foreground">Revenue</p>
          <p className="mt-1 text-2xl font-bold text-foreground">$45,231</p>
          <p className="mt-1 text-xs text-success-fg">+20.1% from last month</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function FeedbackDemo() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 min-w-0">
      <Card className="min-w-0">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span>Progress</span><span>70%</span></div>
            <Progress value={70} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span>Low</span><span>25%</span></div>
            <Progress value={25} />
          </div>
        </CardContent>
      </Card>
      <Card className="min-w-0">
        <CardContent className="space-y-3 p-5">
          <div className="flex items-center gap-4">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
      <Card className="min-w-0">
        <CardContent className="p-2">
          <EmptyState
            icon={<Inbox className="size-6" />}
            title="Nothing here"
            description="An example empty state."
            className="py-8"
          />
        </CardContent>
      </Card>
    </div>
  );
}

export function ToastsDemo() {
  const { toast } = useToast();
  return (
    <Card className="min-w-0">
      <CardContent className="flex flex-wrap gap-3 p-5">
        <Button onClick={() => toast({ title: "Default", description: "A neutral toast message." })}>
          Default toast
        </Button>
        <Button onClick={() => toast({ title: "Success", description: "Action completed.", variant: "success" })}>
          Success toast
        </Button>
        <Button variant="destructive" onClick={() => toast({ title: "Error", description: "Something failed.", variant: "destructive" })}>
          Destructive toast
        </Button>
      </CardContent>
    </Card>
  );
}