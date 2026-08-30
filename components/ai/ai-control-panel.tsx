import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AI_MODELS } from "@/data/ai";
import { MONTHLY_TOKEN_QUOTA } from "@/lib/ai";
import type { AISettings, UsageStats } from "@/types/ai";

interface AIControlPanelProps {
  settings: AISettings;
  onSettingsChange: (patch: Partial<AISettings>) => void;
  usage: UsageStats;
}

function temperatureLabel(value: number): string {
  if (value < 0.4) return "Precise & focused";
  if (value < 0.8) return "Balanced";
  return "Creative & exploratory";
}

export function AIControlPanel({ settings, onSettingsChange, usage }: AIControlPanelProps) {
  const quotaPercent = Math.min(100, Math.round((usage.tokens / MONTHLY_TOKEN_QUOTA) * 100));

  return (
    <Card className="min-w-0">
      <Tabs defaultValue="settings" className="min-w-0">
        <div className="px-4 pt-4">
          <TabsList className="w-full">
            <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
            <TabsTrigger value="usage" className="flex-1">Usage</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="settings" className="space-y-5 p-5">
          {/* Model selector */}
          <div className="space-y-1.5">
            <label htmlFor="ai-model" className="text-sm font-medium text-foreground">Model</label>
            <Select
              id="ai-model"
              options={AI_MODELS.map((m) => ({ value: m.id, label: `${m.name} · ${m.speed}` }))}
              value={settings.modelId}
              onChange={(e) => onSettingsChange({ modelId: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              {AI_MODELS.find((m) => m.id === settings.modelId)?.description}
            </p>
          </div>

          {/* Temperature */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="ai-temperature" className="text-sm font-medium text-foreground">
                Temperature
              </label>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
                {settings.temperature.toFixed(1)}
              </span>
            </div>
            <input
              id="ai-temperature"
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={settings.temperature}
              onChange={(e) => onSettingsChange({ temperature: Number(e.target.value) })}
              className="w-full accent-accent"
            />
            <p className="text-xs text-muted-foreground">{temperatureLabel(settings.temperature)}</p>
          </div>

          {/* System prompt */}
          <div className="space-y-1.5">
            <label htmlFor="ai-system" className="text-sm font-medium text-foreground">
              System prompt
            </label>
            <Textarea
              id="ai-system"
              rows={4}
              value={settings.systemPrompt}
              onChange={(e) => onSettingsChange({ systemPrompt: e.target.value })}
            />
          </div>

          <Alert variant="warning">
            <AlertTitle>Demo mode</AlertTitle>
            <AlertDescription>
              Responses are simulated locally. Connect your own API in{" "}
              <code className="font-mono text-xs">lib/ai.ts</code>.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="usage" className="space-y-5 p-5">
          {/* Token quota */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">Token usage</span>
              <span className="text-muted-foreground">
                {usage.tokens.toLocaleString()} / {MONTHLY_TOKEN_QUOTA.toLocaleString()}
              </span>
            </div>
            <Progress value={quotaPercent} />
            <p className="text-xs text-muted-foreground">{quotaPercent}% of monthly quota</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Chats", value: usage.conversations },
              { label: "Messages", value: usage.messages },
              { label: "Tokens", value: usage.tokens.toLocaleString() },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-background/50 p-3 text-center">
                <p className="text-sm font-bold text-foreground">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            Usage is estimated locally (≈ 4 characters per token) and resets when the page reloads.
            Wire this panel to your provider&apos;s usage API for real numbers.
          </p>
        </TabsContent>
      </Tabs>
    </Card>
  );
}