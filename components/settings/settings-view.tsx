"use client";

import { useState } from "react";
import {
  Bell,
  CreditCard,
  Palette,
  Plug,
  Settings,
  Shield,
  SlidersHorizontal,
} from "lucide-react";

import { AppearanceSection } from "./sections/appearance-section";
import { GeneralSection } from "./sections/general-section";
import { NotificationsSection } from "./sections/notifications-section";
import { SecuritySection } from "./sections/security-section";
import { PreferencesSection } from "./sections/preferences-section";
import { IntegrationsSection } from "./sections/integrations-section";
import { BillingSection } from "./sections/billing-section";
import { cn } from "@/lib/utils";

type SectionId =
  | "general"
  | "appearance"
  | "notifications"
  | "security"
  | "preferences"
  | "integrations"
  | "billing";

const sections: { id: SectionId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "general", label: "General", icon: Settings },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "preferences", label: "Preferences", icon: SlidersHorizontal },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export function SettingsView() {
  const [active, setActive] = useState<SectionId>("general");

  return (
    <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
      {/* Nav — vertical on desktop, horizontal scroll on mobile */}
      <nav className="flex gap-1 overflow-x-auto pb-1 scrollbar-thin lg:flex-col lg:overflow-visible lg:pb-0">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => setActive(section.id)}
            className={cn(
              "focus-ring flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active === section.id
                ? "bg-accent-subtle text-accent-subtle-fg"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <section.icon className="size-4 shrink-0" />
            {section.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="min-w-0">
        {active === "general" && <GeneralSection />}
        {active === "appearance" && <AppearanceSection />}
        {active === "notifications" && <NotificationsSection />}
        {active === "security" && <SecuritySection />}
        {active === "preferences" && <PreferencesSection />}
        {active === "integrations" && <IntegrationsSection />}
        {active === "billing" && <BillingSection />}
      </div>
    </div>
  );
}