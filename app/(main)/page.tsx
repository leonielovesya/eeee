"use client";

import { useState, useEffect, useRef } from "react";
import { useChat, Message } from "ai/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble";
import { ChatInput } from "@/components/ui/chat-input";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import { Button } from "@/components/ui/button";
import {
  CopyIcon,
  CornerDownLeft,
  Mic,
  Paperclip,
  RefreshCcw,
  Volume2,
} from "lucide-react";

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const {
    messages,
    input,
    handleInputChange,
    isLoading,
    setMessages,
  } = useChat({
    onResponse: () => setIsGenerating(false),
    onError: () => setIsGenerating(false),
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  async function askai(prompt: string): Promise<string> {
    setIsGenerating(true);

    try {
      const response = await fetch(`${process.env.API}/${process.env.VERSION}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) return "Something went wrong.";
      const data = await response.json();
      return data.words || "Something went wrong.";
    } catch (e) {
      console.error(e);
      return "Something went wrong.";
    } finally {
      setIsGenerating(false);
    }
  }

  async function ask() {
    if (!input.trim() || isLoading || isGenerating) return;

    const userMessage = input.trim();
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      parts: [{ type: "text", text: userMessage }],
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    handleInputChange({ target: { value: "" } } as React.ChangeEvent<HTMLTextAreaElement>);

    const aiResponse = await askai(userMessage);
    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: aiResponse,
      parts: [{ type: "text", text: aiResponse }],
    };

    setMessages([...updatedMessages, aiMsg]);
  }

  async function handleActionClick(action: string, index: number) {
    if (action === "Refresh") {
      setIsGenerating(true);
      const userIndex = index - 1;

      if (userIndex >= 0 && messages[userIndex]?.role === "user") {
        const aiResponse = await askai(messages[userIndex].content);
        const newMessages = [...messages];
        newMessages[index] = {
          ...messages[index],
          content: aiResponse,
          parts: [{ type: "text", text: aiResponse }],
        };
        setMessages(newMessages);
      }
    } else if (action === "Copy") {
      try {
        await navigator.clipboard.writeText(messages[index].content);
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="overflow-hidden flex-grow w-full py-6 z-10 max-w-3xl mx-auto">
        <div
          ref={messageListRef}
          className="overflow-auto h-full" 
        >
          <ChatMessageList>
            {messages.map((message, index) => (
              <ChatBubble
                key={message.id}
                variant={message.role === "user" ? "sent" : "received"}
              >
                <ChatBubbleAvatar
                  fallback={message.role === "user" ? "US" : "AI"}
                />
                <ChatBubbleMessage>
                  <Markdown key={index} remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </Markdown>

                  {message.role === "assistant" && (
                    <div className="flex items-center mt-1.5 gap-1">
                      {!isGenerating && [
                        { icon: CopyIcon, label: "Copy" },
                        { icon: RefreshCcw, label: "Refresh" },
                        { icon: Volume2, label: "Volume" }
                      ].map((btn, i) => (
                        <ChatBubbleAction
                          key={i}
                          className="size-5"
                          icon={<btn.icon className="size-3" />}
                          onClick={() => handleActionClick(btn.label, index)}
                          disabled={index !== messages.length - 1} 
                        />
                      ))}
                    </div>
                  )}
                </ChatBubbleMessage>
              </ChatBubble>
            ))}

            {isGenerating && (
              <ChatBubble variant="received">
                <ChatBubbleAvatar fallback="AI" />
                <ChatBubbleMessage isLoading />
              </ChatBubble>
            )}
          </ChatMessageList>
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="px-4 py-2 sticky bottom-0 bg-transparent z-10">
        <form className="bg-background relative rounded-lg border focus-within:ring-1 focus-within:ring-ring max-w-2xl w-full mx-auto">
          <ChatInput
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && input.trim() && !isLoading && !isGenerating) {
                e.preventDefault();
                ask();
              }
            }}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="rounded-lg border-0 shadow-none !bg-background"
          />
          <div className="flex items-center p-3 pt-1 justify-between">
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="bg-transparent text-accent" type="button" disabled>
                <Paperclip className="size-4" />
                <span className="sr-only">Attach file</span>
              </Button>
              <Button variant="ghost" size="icon" className="bg-transparent text-accent" type="button" disabled>
                <Mic className="size-4" />
                <span className="sr-only">Use Microphone</span>
              </Button>
            </div>

            <Button
              disabled={!input.trim() || isLoading || isGenerating}
              type="submit"
              size="sm"
              onClick={ask}
              loading={isGenerating}
              className="gap-1.5"
            >
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
