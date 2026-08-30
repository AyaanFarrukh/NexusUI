"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, MessageSquare, Paperclip, Send, X } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/input";
import { conversationsData, simulatedReplies } from "@/data/messages";
import { timeAgo } from "@/lib/calendar";
import { cn } from "@/lib/utils";
import type { Conversation, MessageAttachment } from "@/types/message";

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function MessagesView() {
  const [conversations, setConversations] = useState<Conversation[]>(conversationsData);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [pendingFiles, setPendingFiles] = useState<MessageAttachment[]>([]);
  const [isReplying, setIsReplying] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selected = conversations.find((c) => c.id === selectedId) ?? null;

  const filteredConversations = useMemo(() => {
    const searchLower = search.toLowerCase();
    return conversations.filter(
      (c) =>
        c.participantName.toLowerCase().includes(searchLower) ||
        c.messages.some((m) => m.content.toLowerCase().includes(searchLower))
    );
  }, [conversations, search]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selected?.messages.length, isReplying, selectedId]);

  const openConversation = (id: string) => {
    setSelectedId(id);
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const next = Array.from(files).map((f) => ({ name: f.name }));
    setPendingFiles((prev) => [...prev, ...next]);
  };

  const send = () => {
    const text = input.trim();
    if ((!text && pendingFiles.length === 0) || !selected || isReplying) return;

    const conversationId = selected.id;
    const message = {
      id: `msg_${Date.now()}`,
      sender: "me" as const,
      content: text,
      timestamp: new Date().toISOString(),
      attachments: pendingFiles.length > 0 ? pendingFiles : undefined,
    };

    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, messages: [...c.messages, message] } : c))
    );
    setInput("");
    setPendingFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";

    // Simulated reply from the other side
    setIsReplying(true);
    setTimeout(() => {
      const reply = simulatedReplies[Math.floor(Math.random() * simulatedReplies.length)];
      setConversations((prev) =>
        prev.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  { id: `msg_${Date.now()}_r`, sender: "them" as const, content: reply, timestamp: new Date().toISOString() },
                ],
              }
            : c
        )
      );
      setIsReplying(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <Card className="flex h-[calc(100dvh-230px)] min-h-[540px] min-w-0 flex-col overflow-hidden">
      <div className="grid min-h-0 w-full flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)] md:grid-cols-[300px_minmax(0,1fr)]">
        {/* ─── Conversation list ─── */}
        <div className={cn("min-h-0 flex-col border-r border-border", selected ? "hidden md:flex" : "flex")}>
          <div className="border-b border-border p-3">
            <Input
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search conversations"
            />
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin">
            {filteredConversations.length === 0 ? (
              <EmptyState
                icon={<MessageSquare className="size-6" />}
                title="No conversations"
                description="No matches for your search."
                className="py-12"
              />
            ) : (
              <ul className="divide-y divide-border">
                {filteredConversations.map((conversation) => {
                  const last = conversation.messages[conversation.messages.length - 1];
                  return (
                    <li key={conversation.id}>
                      <button
                        type="button"
                        onClick={() => openConversation(conversation.id)}
                        className={cn(
                          "focus-ring flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/40",
                          selectedId === conversation.id && "bg-muted/60"
                        )}
                      >
                        <Avatar fallback={conversation.participantName} size="md" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate text-sm font-medium text-foreground">
                              {conversation.participantName}
                            </p>
                            {last && <span className="shrink-0 text-[11px] text-muted-foreground">{timeAgo(last.timestamp)}</span>}
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate text-xs text-muted-foreground">
                              {last ? (last.sender === "me" ? `You: ${last.content}` : last.content) : "No messages yet"}
                            </p>
                            {conversation.unread > 0 && (
                              <span className="grid h-4 min-w-4 shrink-0 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-fg">
                                {conversation.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* ─── Thread ─── */}
        <div className={cn("min-h-0 flex-col overflow-hidden", selected ? "flex" : "hidden md:flex")}>
          {!selected ? (
            <EmptyState
              icon={<MessageSquare className="size-8" />}
              title="Your messages"
              description="Select a conversation to start chatting."
              className="flex-1 py-16"
            />
          ) : (
            <>
              {/* Thread header */}
              <div className="flex shrink-0 items-center gap-3 border-b border-border px-4 py-3">
                <Button variant="ghost" size="icon" className="size-8 md:hidden" aria-label="Back to conversations" onClick={() => setSelectedId(null)}>
                  <ArrowLeft className="size-4" />
                </Button>
                <Avatar fallback={selected.participantName} size="sm" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{selected.participantName}</p>
                  <p className="truncate text-xs text-muted-foreground">{selected.participantRole}</p>
                </div>
              </div>

              {/* Messages — now actually scrolls */}
              <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4 scrollbar-thin">
                {selected.messages.map((message) => (
                  <div key={message.id} className={cn("flex", message.sender === "me" ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap sm:max-w-[70%]",
                        message.sender === "me"
                          ? "rounded-br-md bg-accent text-accent-fg"
                          : "rounded-bl-md border border-border bg-surface text-foreground"
                      )}
                    >
                      {message.content}
                      {message.attachments && (
                        <div className="mt-2 space-y-1">
                          {message.attachments.map((attachment) => (
                            <span
                              key={attachment.name}
                              className={cn(
                                "flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium",
                                message.sender === "me" ? "bg-accent-fg/15" : "bg-muted"
                              )}
                            >
                              <Paperclip className="size-3" />
                              {attachment.name}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className={cn("mt-1 text-[10px]", message.sender === "me" ? "text-accent-fg/70" : "text-muted-foreground")}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}

                {isReplying && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-bl-md border border-border bg-surface px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                        <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                        <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Composer — pinned, never disappears */}
              <div className="shrink-0 space-y-2 border-t border-border p-3">
                {pendingFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {pendingFiles.map((file) => (
                      <span key={file.name} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
                        <Paperclip className="size-3" />
                        {file.name}
                        <button
                          type="button"
                          aria-label={`Remove ${file.name}`}
                          onClick={() => setPendingFiles((prev) => prev.filter((f) => f.name !== file.name))}
                          className="focus-ring rounded-full text-muted-foreground hover:text-foreground"
                        >
                          <X className="size-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send();
                  }}
                  className="flex items-end gap-2"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                    aria-label="Attach files"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-[42px] shrink-0"
                    aria-label="Attach files"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="size-4" />
                  </Button>
                  <Textarea
                    rows={1}
                    placeholder={`Message ${selected.participantName}…`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    className="max-h-32 min-h-[42px] min-w-0 flex-1 resize-none"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="size-[42px] shrink-0"
                    disabled={(!input.trim() && pendingFiles.length === 0) || isReplying}
                    aria-label="Send message"
                  >
                    <Send className="size-4" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}