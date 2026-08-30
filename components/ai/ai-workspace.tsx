"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Download, Plus, Send, Settings2, Trash2 } from "lucide-react";

import { ChatMessageBubble, TypingIndicator } from "./chat-message";
import { PromptTemplateCards, PromptTemplateChips } from "./prompt-templates";
import { AIControlPanel } from "./ai-control-panel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/input";
import { useToast } from "@/lib/hooks/use-toast";
import { AI_MODELS, DEFAULT_SYSTEM_PROMPT } from "@/data/ai";
import { estimateTokens, requestCompletion } from "@/lib/ai";
import type { AISettings, ChatMessage, Conversation } from "@/types/ai";

export function AIWorkspace() {
  const { toast } = useToast();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [settings, setSettings] = useState<AISettings>({
    modelId: AI_MODELS[0].id,
    temperature: 0.7,
    systemPrompt: DEFAULT_SYSTEM_PROMPT,
  });
  const [clearOpen, setClearOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const active = conversations.find((c) => c.id === activeId) ?? null;

  const usage = useMemo(() => {
    const messages = conversations.reduce((n, c) => n + c.messages.length, 0);
    const tokens = conversations.reduce(
      (n, c) => n + c.messages.reduce((sum, m) => sum + (m.tokens ?? 0), 0),
      0
    );
    return { conversations: conversations.length, messages, tokens };
  }, [conversations]);

  // Keep the latest message in view (instant scroll — no smooth-scroll jank)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [active?.messages.length, isThinking]);

  const appendMessage = (conversationId: string, message: ChatMessage) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, messages: [...c.messages, message] } : c))
    );
  };

  const runGeneration = async (conversationId: string, prompt: string) => {
    setIsThinking(true);
    const model = AI_MODELS.find((m) => m.id === settings.modelId) ?? AI_MODELS[0];
    try {
      const reply = await requestCompletion(prompt, {
        model,
        temperature: settings.temperature,
        systemPrompt: settings.systemPrompt,
      });
      appendMessage(conversationId, {
        id: `msg_${Date.now()}_a`,
        role: "assistant",
        content: reply,
        createdAt: new Date().toISOString(),
        model: model.name,
        tokens: estimateTokens(reply),
      });
    } catch (error) {
      appendMessage(conversationId, {
        id: `msg_${Date.now()}_e`,
        role: "assistant",
        content: error instanceof Error ? error.message : "Something went wrong.",
        createdAt: new Date().toISOString(),
        error: true,
      });
    } finally {
      setIsThinking(false);
    }
  };

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || isThinking) return;
    setInput("");

    let conversationId = activeId;
    if (!conversationId || !active) {
      conversationId = `conv_${Date.now()}`;
      const conversation: Conversation = {
        id: conversationId,
        title: text.length > 42 ? `${text.slice(0, 42)}…` : text,
        createdAt: new Date().toISOString(),
        messages: [],
      };
      setConversations((prev) => [conversation, ...prev]);
      setActiveId(conversationId);
    }

    appendMessage(conversationId, {
      id: `msg_${Date.now()}`,
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
      tokens: estimateTokens(text),
    });

    void runGeneration(conversationId, text);
  };

  const retry = (errorMessageId: string) => {
    if (!active || isThinking) return;
    const errorIndex = active.messages.findIndex((m) => m.id === errorMessageId);
    if (errorIndex === -1) return;
    const previousUser = [...active.messages.slice(0, errorIndex)]
      .reverse()
      .find((m) => m.role === "user");
    if (!previousUser) return;

    setConversations((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? { ...c, messages: c.messages.filter((m) => m.id !== errorMessageId) }
          : c
      )
    );
    void runGeneration(active.id, previousUser.content);
  };

  const newConversation = () => {
    setActiveId(null);
    setInput("");
    inputRef.current?.focus();
  };

  const clearConversation = () => {
    if (!active) return;
    setConversations((prev) => prev.map((c) => (c.id === active.id ? { ...c, messages: [] } : c)));
    setClearOpen(false);
    toast({ title: "Conversation cleared", description: "All messages were removed." });
  };

  const exportConversation = () => {
    if (!active || active.messages.length === 0) return;
    const blob = new Blob([JSON.stringify(active, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${active.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "conversation"}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast({ title: "Export started", description: "Conversation downloaded as JSON." });
  };

  const hasMessages = (active?.messages.length ?? 0) > 0;

  const historyOptions = conversations.map((c) => ({ value: c.id, label: c.title }));

  return (
    <div className="grid min-w-0 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      {/* ─── Chat column ─── */}
      <Card className="flex h-[calc(100dvh-230px)] min-h-[520px] min-w-0 flex-col overflow-hidden">
        {/* Toolbar — stable native select for history (no flicker) */}
        <div className="flex items-center gap-2 border-b border-border px-3 py-3 sm:px-4">
          <Select
            aria-label="Conversation history"
            options={historyOptions}
            placeholder="New conversation"
            value={activeId ?? ""}
            onChange={(e) => setActiveId(e.target.value || null)}
            className="h-9 min-w-0 flex-1 sm:flex-none sm:w-[240px]"
          />
          <div className="flex shrink-0 items-center gap-1">
            <IconButton variant="ghost" size="icon" className="size-8" aria-label="New conversation" onClick={newConversation}>
              <Plus className="size-4" />
            </IconButton>
            <IconButton
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Export conversation"
              disabled={!hasMessages}
              onClick={exportConversation}
            >
              <Download className="size-4" />
            </IconButton>
            <IconButton
              variant="ghost"
              size="icon"
              className="size-8"
              aria-label="Clear conversation"
              disabled={!hasMessages}
              onClick={() => setClearOpen(true)}
            >
              <Trash2 className="size-4" />
            </IconButton>
            <IconButton
              variant="ghost"
              size="icon"
              className="size-8 lg:hidden"
              aria-label="Open settings"
              onClick={() => setPanelOpen(true)}
            >
              <Settings2 className="size-4" />
            </IconButton>
          </div>
        </div>

        {/* Messages / empty state — min-h-full fixes mobile clipping */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin">
          {!hasMessages ? (
            <div className="flex min-h-full flex-col items-center justify-center gap-6 px-4 py-8 text-center">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent-subtle text-accent-subtle-fg">
                <Bot className="size-7" />
              </span>
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-foreground">Ask Nexus AI anything</h2>
                <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
                  Start with a template below or type your own prompt. Responses are simulated
                  locally in demo mode.
                </p>
              </div>
              <PromptTemplateCards
                onSelect={(prompt) => {
                  setInput(prompt);
                  inputRef.current?.focus();
                }}
              />
            </div>
          ) : (
            <div className="space-y-4 p-3 sm:p-4">
              {active!.messages.map((message) => (
                <ChatMessageBubble key={message.id} message={message} onRetry={retry} />
              ))}
              {isThinking && <TypingIndicator />}
            </div>
          )}
        </div>

        {/* Composer — flexible on small screens */}
        <div className="space-y-2 border-t border-border p-3">
          {hasMessages && (
            <PromptTemplateChips
              onSelect={(prompt) => {
                setInput(prompt);
                inputRef.current?.focus();
              }}
            />
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-end gap-2"
          >
            <Textarea
              ref={inputRef}
              rows={1}
              placeholder="Ask Nexus AI anything…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              className="max-h-40 min-h-[42px] min-w-0 flex-1 resize-none"
            />
            <Button
              type="submit"
              size="icon"
              className="size-[42px] shrink-0"
              disabled={!input.trim() || isThinking}
              aria-label="Send message"
            >
              <Send className="size-4" />
            </Button>
          </form>
          <p className="text-[11px] text-muted-foreground">
            Enter to send · Shift + Enter for a new line · type “error” to preview the error state
          </p>
        </div>
      </Card>

      {/* ─── Desktop control panel ─── */}
      <div className="hidden min-w-0 lg:block">
        <AIControlPanel
          settings={settings}
          onSettingsChange={(patch) => setSettings((prev) => ({ ...prev, ...patch }))}
          usage={usage}
        />
      </div>

      {/* ─── Mobile control panel ─── */}
      <Dialog open={panelOpen} onOpenChange={setPanelOpen}>
        <DialogContent className="max-h-[85dvh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Model settings & usage</DialogTitle>
            <DialogDescription>Configure how Nexus AI responds.</DialogDescription>
          </DialogHeader>
          <AIControlPanel
            settings={settings}
            onSettingsChange={(patch) => setSettings((prev) => ({ ...prev, ...patch }))}
            usage={usage}
          />
        </DialogContent>
      </Dialog>

      {/* ─── Clear confirmation ─── */}
      <Dialog open={clearOpen} onOpenChange={setClearOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clear conversation</DialogTitle>
            <DialogDescription>
              This removes all messages in “{active?.title}”. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setClearOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={clearConversation}>Clear</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}