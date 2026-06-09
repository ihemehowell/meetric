"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User } from "lucide-react"
import type { MeetingAnalysis } from "@/types/analysis"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface Props {
  analysis: MeetingAnalysis
}

export default function FollowUpChat({ analysis }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `I've analyzed your meeting. Ask me anything about it — action items, decisions, what someone committed to, or anything else.`,
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { role: "user", content: text }
    setMessages((m) => [...m, userMsg])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          analysis,
          messages: [...messages, userMsg],
        }),
      })

      const data = await res.json()
      setMessages((m) => [...m, { role: "assistant", content: data.reply }])
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Sorry, I couldn't process that. Try again." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-3xl border bg-card/70 p-7 backdrop-blur">
      <div className="flex items-center gap-2 mb-6">
        <Bot className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Ask About This Meeting</h2>
      </div>

      {/* Messages */}
      <div className="space-y-4 max-h-90 overflow-y-auto pr-1">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === "assistant" ? "bg-primary/10" : "bg-muted"}`}>
              {msg.role === "assistant"
                ? <Bot className="h-4 w-4 text-primary" />
                : <User className="h-4 w-4" />
              }
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
              msg.role === "assistant"
                ? "bg-background/70 border text-foreground"
                : "bg-primary text-primary-foreground"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="rounded-2xl border bg-background/70 px-4 py-3">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="mt-5 flex gap-3">
        <input
          className="flex-1 rounded-2xl border bg-background/60 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="What did Sarah commit to? Who owns the API docs?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button
          onClick={send}
          disabled={!input.trim() || loading}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground disabled:opacity-40 hover:bg-primary/90 transition-colors"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}