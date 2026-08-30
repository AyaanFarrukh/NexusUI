import { Code2, FileText, Lightbulb, Mail } from "lucide-react";

export interface PromptTemplate {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  prompt: string;
}

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: "tpl_1",
    icon: FileText,
    title: "Summarize text",
    description: "Condense long documents into key points.",
    prompt: "Summarize the following text into 5 bullet points: ",
  },
  {
    id: "tpl_2",
    icon: Mail,
    title: "Write an email",
    description: "Draft a professional email in seconds.",
    prompt: "Write a friendly follow-up email to a client about our Q2 proposal.",
  },
  {
    id: "tpl_3",
    icon: Lightbulb,
    title: "Brainstorm ideas",
    description: "Generate creative concepts for anything.",
    prompt: "Give me 10 creative marketing ideas for a developer tools startup.",
  },
  {
    id: "tpl_4",
    icon: Code2,
    title: "Explain code",
    description: "Break down complex code simply.",
    prompt: "Explain how a debounce function works in JavaScript.",
  },
];

export function PromptTemplateCards({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-2">
      {PROMPT_TEMPLATES.map((template) => (
        <button
          key={template.id}
          type="button"
          onClick={() => onSelect(template.prompt)}
          className="focus-ring rounded-xl border border-border bg-surface p-4 text-left shadow-card transition-colors hover:border-accent/40"
        >
          <template.icon className="size-5 text-accent" />
          <p className="mt-2 text-sm font-medium text-foreground">{template.title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{template.description}</p>
        </button>
      ))}
    </div>
  );
}

export function PromptTemplateChips({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
      {PROMPT_TEMPLATES.map((template) => (
        <button
          key={template.id}
          type="button"
          onClick={() => onSelect(template.prompt)}
          className="focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <template.icon className="size-3" />
          {template.title}
        </button>
      ))}
    </div>
  );
}