"use client";

import {
  AlertsDemo,
  CardsDemo,
  FeedbackDemo,
  ToastsDemo,
} from "./showcase-demos-b";
import {
  AvatarsDemo,
  BadgesDemo,
  ButtonsDemo,
  FormsDemo,
} from "./showcase-demos-a";
import { ChartsDemo, OverlaysDemo, TablesDemo } from "./showcase-demos-c";

const sections = [
  { id: "buttons", label: "Buttons" },
  { id: "inputs", label: "Inputs" },
  { id: "badges", label: "Badges" },
  { id: "avatars", label: "Avatars" },
  { id: "cards", label: "Cards" },
  { id: "alerts", label: "Alerts" },
  { id: "modals", label: "Modals & Tabs" },
  { id: "tooltips", label: "Tooltips" },
  { id: "tables", label: "Tables" },
  { id: "progress", label: "Progress & Skeletons" },
  { id: "empty", label: "Empty States" },
  { id: "toasts", label: "Toasts" },
  { id: "charts", label: "Charts" },
];

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
}

export function ShowcaseView() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-w-0">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">UI Kit</h1>
        <p className="text-muted-foreground">
          Every component in the design system, live and theme-aware. Use the nav to jump around.
        </p>
      </div>

      {/* Sticky anchor nav */}
      <div className="sticky top-16 z-20 -mx-4 mt-4 border-b border-border bg-background/80 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-thin">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollTo(section.id)}
              className="focus-ring shrink-0 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="mt-6 space-y-10">
        <Section id="buttons" title="Buttons" description="Variants, sizes, icons and loading states.">
          <ButtonsDemo />
        </Section>

        <Section id="inputs" title="Inputs & Forms" description="Text inputs, selects, checkboxes and switches.">
          <FormsDemo />
        </Section>

        <Section id="badges" title="Badges" description="All semantic badge variants.">
          <BadgesDemo />
        </Section>

        <Section id="avatars" title="Avatars" description="Sizes, initials fallback and stacked groups.">
          <AvatarsDemo />
        </Section>

        <Section id="cards" title="Cards" description="Container patterns used across the dashboard.">
          <CardsDemo />
        </Section>

        <Section id="alerts" title="Alerts" description="Inline status messaging in four variants.">
          <AlertsDemo />
        </Section>

        <Section id="modals" title="Modals & Tabs" description="Dialogs and tabbed navigation.">
          <OverlaysDemo />
        </Section>

        <Section id="tooltips" title="Tooltips" description="Hover/focus tooltips on all four sides.">
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-sm text-muted-foreground">Tooltips are demonstrated inside the Modals & Tabs card above.</p>
          </div>
        </Section>

        <Section id="tables" title="Tables" description="Responsive data tables with hover rows.">
          <TablesDemo />
        </Section>

        <Section id="progress" title="Progress & Skeletons" description="Loading and progress indicators.">
          <FeedbackDemo />
        </Section>

        <Section id="empty" title="Empty States" description="Friendly zero-data states.">
          <FeedbackDemo />
        </Section>

        <Section id="toasts" title="Toasts" description="Transient notifications, triggered on demand.">
          <ToastsDemo />
        </Section>

        <Section id="charts" title="Charts" description="Recharts visualizations, fully themed.">
          <ChartsDemo />
        </Section>
      </div>
    </div>
  );
}