"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"

interface ChatMessage {
  sender: "USER" | "TUNAI"
  text: string
}

const GREETING_MSGS: ChatMessage[] = [
  { sender: "TUNAI", text: "Hey! 👋 I'm Tunai." },
  { sender: "TUNAI", text: "I'm an Agentic Event Operating System. I help teams automate vendor management, logistics, outreach, and coordination for events at scale." },
  { sender: "TUNAI", text: "What kind of event are you working on?" }
]

const STORY_LINES = [
  "Every great event starts with a simple idea.",
  "But turning that idea into reality?",
  "That's where the magic happens.",
  "I'm Tunai, your AI co-pilot for events."
]

const INITIAL_SUGGESTIONS = [
  "Planning a college fest",
  "Organizing a conference",
  "Running a music festival",
  "What exactly does Tunai do?",
]

export default function Home() {
  const [showChat, setShowChat] = useState(false)
  const [storyStep, setStoryStep] = useState(0)
  const [sessionId, setSessionId] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "TUNAI", text: "What kind of event are you working on?" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>(INITIAL_SUGGESTIONS)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let id = localStorage.getItem("tunai_session")
    if (!id) {
      id = uuidv4()
      localStorage.setItem("tunai_session", id)
    }
    setSessionId(id)
  }, [])

  useEffect(() => {
    if (showChat) return
    let timeout: NodeJS.Timeout
    if (storyStep === 0) {
      timeout = setTimeout(() => setStoryStep(1), 800)
    } else if (storyStep <= STORY_LINES.length) {
      const delay = storyStep === STORY_LINES.length - 1 ? 2400 : 2000
      timeout = setTimeout(() => setStoryStep((prev) => prev + 1), delay)
    }
    return () => clearTimeout(timeout)
  }, [showChat, storyStep])

  const handleStoryClick = () => {
    if (storyStep <= STORY_LINES.length) {
      setStoryStep(STORY_LINES.length + 1)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  async function sendMessage(text?: string) {
    const msg = text || input
    if (!msg.trim() || loading) return

    setLoading(true)
    setInput("")
    setSuggestions([])

    const userMessage: ChatMessage = { sender: "USER", text: msg }
    setMessages((prev) => [...prev, userMessage])

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: msg }),
      })

      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        { sender: "TUNAI", text: data.reply || data.error || "Something went wrong." },
      ])

      if (data.nextQuestions?.length) {
        setSuggestions(data.nextQuestions)
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "TUNAI", text: "Connection error. Please try again." },
      ])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!showChat) {
    return (
      <div className="story-screen" onClick={handleStoryClick}>
        <div className="story-content">
          <div className="story-lines-container">
            {STORY_LINES.map((line, idx) => (
              <p
                key={idx}
                className={`story-line ${storyStep > idx ? "story-line-visible" : ""}`}
              >
                {line}
              </p>
            ))}
          </div>

          <div className={`story-final ${storyStep > STORY_LINES.length ? "story-final-visible" : ""}`}>
            <div className="story-avatar-wrapper">
              <Image src="/logo.png" alt="Tunai" width={80} height={80} className="story-avatar" />
              <div className="story-online-dot" />
            </div>
            <button className="story-button" onClick={(e) => { e.stopPropagation(); setShowChat(true) }}>
              Tell me about your event
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-shell chat-fade-in">
      {/* ── Top Bar ─── */}
      <div className="topbar">
        <div className="topbar-avatar">
          <Image src="/logo.png" alt="Tunai" width={40} height={40} />
        </div>
        <div className="topbar-info">
          <span className="topbar-name">Tunai</span>
          <span className="topbar-status">
            <span className="dot" />
            Online
          </span>
        </div>
      </div>

      {/* ── Messages ─── */}
      <div className="messages">

        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.sender === "USER" ? "msg-user" : "msg-ai"}`}>
            {m.sender === "TUNAI" && (
              <div className="msg-avatar">
                <Image src="/logo.png" alt="T" width={28} height={28} />
              </div>
            )}
            <div className={`bubble ${m.sender === "USER" ? "bubble-user" : "bubble-ai"}`}>
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="msg msg-ai">
            <div className="msg-avatar">
              <Image src="/logo.png" alt="T" width={28} height={28} />
            </div>
            <div className="bubble bubble-ai">
              <div className="typing">
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Quick Replies ─── */}
      {suggestions.length > 0 && !loading && (
        <div className="quick-replies">
          {suggestions.map((s, i) => (
            <button key={i} className="chip" onClick={() => sendMessage(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* ── Composer ─── */}
      <div className="composer">
        <div className="composer-inner">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={loading}
          />
          <button
            className="send"
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
