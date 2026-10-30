"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import Link from "next/link";
import {
  MessageCircle,
  X,
  Send,
  RotateCcw,
  Sparkles,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import "./chat-widget.css";

interface MessageItem {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: {
    id: string;
    title: string;
    url?: string;
  }[];
}

const INITIAL_GREETING: MessageItem = {
  id: "initial-greeting",
  role: "assistant",
  content:
    "こんにちは！POLARISS公式AIコンシェルジュです。\n料金プラン、愛車への設置方法、LINE通知、盗難対策などについてお気軽にご質問ください。",
};

const QUICK_SUGGESTIONS = [
  "料金プランと月額費用について",
  "バイクや車への取り付け方法は？",
  "LINE通知の仕組みと専用アプリ",
  "解約の条件や最低利用期間は？",
  "万一盗難に遭ったときの対応は？",
];

/**
 * Lightweight safe markdown renderer for assistant responses
 */
function FormattedMessage({ text }: { text: string }) {
  // Split into paragraphs / lines
  const paragraphs = text.split("\n\n").filter(Boolean);

  return (
    <div className="polariss-chat-formatted">
      {paragraphs.map((para, pIdx) => {
        // Blockquote
        if (para.startsWith("> ")) {
          const quoteContent = para.replace(/^>\s*/gm, "");
          return (
            <blockquote key={pIdx}>
              <InlineText text={quoteContent} />
            </blockquote>
          );
        }

        // Unordered list
        if (para.split("\n").every((l) => l.trim().startsWith("・") || l.trim().startsWith("- ") || l.trim().startsWith("* "))) {
          const items = para.split("\n").map((l) => l.replace(/^[・\-\*]\s*/, ""));
          return (
            <ul key={pIdx}>
              {items.map((item, iIdx) => (
                <li key={iIdx}>
                  <InlineText text={item} />
                </li>
              ))}
            </ul>
          );
        }

        // Regular paragraph (may contain line breaks)
        const lines = para.split("\n");
        return (
          <p key={pIdx}>
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                <InlineText text={line} />
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Render bold text and markdown links [text](url)
 */
function InlineText({ text }: { text: string }) {
  // Regex for [link text](url) or **bold**
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      // Markdown link
      const label = match[2];
      const href = match[3];
      const isInternal = href.startsWith("/");
      if (isInternal) {
        parts.push(
          <Link key={match.index} href={href}>
            {label}
          </Link>
        );
      } else {
        parts.push(
          <a
            key={match.index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </a>
        );
      }
    } else if (match[4]) {
      // Bold text
      parts.push(<strong key={match.index}>{match[4]}</strong>);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts.length > 0 ? parts : text}</>;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([INITIAL_GREETING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const msgCounterRef = useRef(0);
  const inputId = useId();

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 250);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Auto-dismiss tooltip after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const toggleOpen = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setShowTooltip(false);
      }
      return next;
    });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    msgCounterRef.current += 1;
    const userMessage: MessageItem = {
      id: `user-${msgCounterRef.current}`,
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();

      if (data.ok) {
        msgCounterRef.current += 1;
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${msgCounterRef.current}`,
            role: "assistant",
            content: data.content,
            sources: data.sources,
          },
        ]);
      } else {
        msgCounterRef.current += 1;
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${msgCounterRef.current}`,
            role: "assistant",
            content:
              data.error ||
              "申し訳ありません。回答の生成中にエラーが発生しました。時間を置いて再度お試しください。",
          },
        ]);
      }
    } catch {
      msgCounterRef.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${msgCounterRef.current}`,
          role: "assistant",
          content:
            "通信に失敗しました。ネットワーク状況をご確認の上、再度お試しください。",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([INITIAL_GREETING]);
    setInput("");
  };

  return (
    <>
      {/* Floating launcher button */}
      <button
        type="button"
        className="polariss-chat-launcher"
        onClick={toggleOpen}
        aria-label={isOpen ? "チャットを閉じる" : "POLARISS AIサポートを開く"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={26} />}
        {!isOpen && <span className="polariss-chat-launcher-badge" />}

        {!isOpen && showTooltip && (
          <div className="polariss-chat-tooltip">
            <Sparkles size={14} color="#7793f3" />
            <span>AIに質問する</span>
          </div>
        )}
      </button>

      {/* Floating chat window */}
      {isOpen && (
        <div
          className="polariss-chat-window"
          role="dialog"
          aria-label="POLARISS AI サポート"
        >
          {/* Header */}
          <div className="polariss-chat-header">
            <div className="polariss-chat-header-info">
              <div className="polariss-chat-avatar">
                <Sparkles size={18} />
              </div>
              <div className="polariss-chat-header-titles">
                <div className="polariss-chat-header-title">
                  <span>POLARISS AI</span>
                  <span
                    className="polariss-chat-status-dot"
                    title="オンライン"
                  />
                </div>
                <div className="polariss-chat-header-sub">
                  公式ナレッジ自動応答
                </div>
              </div>
            </div>

            <div className="polariss-chat-header-actions">
              <button
                type="button"
                className="polariss-chat-icon-btn"
                onClick={resetChat}
                title="会話をリセット"
                aria-label="会話をリセット"
              >
                <RotateCcw size={16} />
              </button>
              <button
                type="button"
                className="polariss-chat-icon-btn"
                onClick={() => setIsOpen(false)}
                title="閉じる"
                aria-label="閉じる"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages body */}
          <div className="polariss-chat-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`polariss-chat-msg-row ${msg.role}`}
              >
                <div className="polariss-chat-bubble">
                  {msg.role === "user" ? (
                    <p>{msg.content}</p>
                  ) : (
                    <FormattedMessage text={msg.content} />
                  )}

                  {/* Sources tags */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="polariss-chat-sources">
                      <span className="polariss-chat-sources-label">
                        <BookOpen size={12} />
                        参照:
                      </span>
                      {msg.sources.map((src) => {
                        const isInternal = src.url?.startsWith("/");
                        if (isInternal) {
                          return (
                            <Link
                              key={src.id}
                              href={src.url || "/faq"}
                              className="polariss-chat-source-tag"
                            >
                              {src.title}
                            </Link>
                          );
                        }
                        return (
                          <a
                            key={src.id}
                            href={src.url || "https://www.polariss.jp/faq"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="polariss-chat-source-tag"
                          >
                            {src.title}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Quick question suggestions (only shown when conversation is fresh) */}
            {messages.length === 1 && (
              <div className="polariss-chat-suggestions">
                <div className="polariss-chat-suggestion-title">
                  💡 よくある質問から選択
                </div>
                {QUICK_SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="polariss-chat-suggestion-chip"
                    onClick={() => handleSendMessage(suggestion)}
                  >
                    <span>{suggestion}</span>
                    <ChevronRight size={14} opacity={0.6} />
                  </button>
                ))}
              </div>
            )}

            {/* Loading typing indicator */}
            {isLoading && (
              <div className="polariss-chat-typing">
                <span />
                <span />
                <span />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input footer */}
          <div className="polariss-chat-footer">
            <form
              className="polariss-chat-input-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <label htmlFor={inputId} className="sr-only">
                POLARISSへの質問
              </label>
              <textarea
                id={inputId}
                ref={inputRef}
                className="polariss-chat-input"
                placeholder="POLARISSについて質問を入力..."
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <button
                type="submit"
                className="polariss-chat-send-btn"
                disabled={!input.trim() || isLoading}
                aria-label="送信"
              >
                <Send size={15} />
              </button>
            </form>
            <p className="polariss-chat-disclaimer">
              ※ 公式ナレッジに基づくAI応答です。契約詳細は公式サイトをご確認ください。
            </p>
          </div>
        </div>
      )}
    </>
  );
}
