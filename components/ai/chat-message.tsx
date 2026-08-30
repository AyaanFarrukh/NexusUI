"use client";

import { useState } from "react";
import { Bot, Check, Copy, RefreshCw, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/ai";

interface ChatMessageBubbleProps {
  message: ChatMessage;
  onRetry?: (messageId: string) => void;
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function ChatMessageBubble({ message, onRetry }: ChatMessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable — ignore silently in demo mode.
    }
  };

  if (isUser) {
    return (
      <div className="flex justify-end gap-3">
        <div className="max-w-[85%] sm:max-w-[70%]">
          <div className="rounded-2xl rounded-br-md bg-accent px-4 py-3 text-sm leading-relaxed text-accent-fg whitespace-pre-wrap">
            {message.content}
          </div>
          <p className="mt-1 text-right text-[11px] text-muted-foreground">
            {formatTime(message.createdAt)}
          </p>
        </div>
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
          <User className="size-4" />
        </span>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-full",
          message.error ? "bg-danger-subtle text-danger-fg" : "bg-accent-subtle text-accent-subtle-fg"
        )}
      >
        <Bot className="size-4" />
      </span>
      <div className="min-w-0 max-w-[85%] sm:max-w-[70%]">
        <div
          className={cn(
            "rounded-2xl rounded-bl-md border px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
            message.error
              ? "border-danger/40 bg-danger-subtle text-danger-fg"
              : "border-border bg-surface text-foreground"
          )}
        >
          {message.content}
        </div>

        <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>{formatTime(message.createdAt)}</span>
          {message.tokens && <span>· {message.tokens} tokens</span>}
          {message.model && <span>· {message.model}</span>}
          {!message.error && (
            <button
              type="button"
              onClick={handleCopy}
              className="focus-ring ml-auto inline-flex items-center gap-1 rounded px-1 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Copy response"
            >
              {copied ? <Check className="size-3 text-success-fg" /> : <Copy className="size-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
          )}
          {message.error && onRetry && (
            <Button variant="outline" size="xs" className="ml-auto" onClick={() => onRetry(message.id)}>
              <RefreshCw className="size-3" />
              Retry
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-subtle text-accent-subtle-fg">
        <Bot className="size-4" />
      </span>
      <div className="rounded-2xl rounded-bl-md border border-border bg-surface px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
          <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
          <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}