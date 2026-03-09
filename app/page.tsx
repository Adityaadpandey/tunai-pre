"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"

interface ChatMessage {
  sender: "USER" | "TUNAI"
  text: string
}

const CINEMATIC_LINES = [
  "Events are creative.",
  "The operations behind them? Chaos.",
]

const GREETING_MSGS: ChatMessage[] = [
  { sender: "TUNAI", text: "Hey 👋 I'm Tunai." },
  { sender: "TUNAI", text: "I'm building the operating system for events — one place to run your team, vendors, tickets, and payments." },
  { sender: "TUNAI", text: "What kind of event are you organising?" },
]

const INITIAL_SUGGESTIONS = [
  "Planning a college fest",
  "Organising a hackathon",
  "Running a concert or show",
  "What exactly does Tunai do?",
]

const TYPING_DELAYS = [400, 1000, 800]
const MSG_PAUSES   = [900, 1100, 1000]

type Phase = "cinematic" | "character" | "chat"

function initSessionId(): string {
  if (typeof window === "undefined") return ""
  let id = localStorage.getItem("tunai_session")
  if (!id) {
    id = uuidv4()
    localStorage.setItem("tunai_session", id)
  }
  return id
}

export default function Home() {
  const [phase, setPhase] = useState<Phase>("cinematic")

  // Cinematic phase
  const [cinematicStep, setCinematicStep] = useState(0)

  // Character phase
  const [visibleMsgs, setVisibleMsgs] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const [showChips, setShowChips] = useState(false)

  // Chat phase
  const [sessionId] = useState<string>(initSessionId)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>(INITIAL_SUGGESTIONS)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const pendingFirstMsg = useRef<string | null>(null)

  // ── Phase: cinematic ─────────────────────
  useEffect(() => {
    if (phase !== "cinematic") return

    const t1 = setTimeout(() => setCinematicStep(1), 600)
    const t2 = setTimeout(() => setCinematicStep(2), 2400)
    const t3 = setTimeout(() => setPhase("character"), 4200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [phase])

  const skipCinematic = () => {
    if (phase === "cinematic") {
      setCinematicStep(2)
      setPhase("character")
    }
  }

  // ── Phase: character ─────────────────────
  useEffect(() => {
    if (phase !== "character") return

    let elapsed = 0
    const timers: NodeJS.Timeout[] = []

    GREETING_MSGS.forEach((_, i) => {
      const tTyping = setTimeout(() => setShowTyping(true), elapsed)
      timers.push(tTyping)
      elapsed += TYPING_DELAYS[i]

      const tMsg = setTimeout(() => {
        setShowTyping(false)
        setVisibleMsgs(i + 1)
      }, elapsed)
      timers.push(tMsg)
      elapsed += MSG_PAUSES[i]
    })

    const tChips = setTimeout(() => setShowChips(true), elapsed)
    timers.push(tChips)

    return () => timers.forEach(clearTimeout)
  }, [phase])

  // ── Transition to chat ────────────────────
  const enterChat = (firstMsg?: string) => {
    setMessages([...GREETING_MSGS])
    setSuggestions([])
    if (firstMsg) {
      pendingFirstMsg.current = firstMsg
    }
    setPhase("chat")
  }

  // Fire pending first message once phase = "chat" has committed
  useEffect(() => {
    if (phase !== "chat") return
    const msg = pendingFirstMsg.current
    if (!msg) return
    pendingFirstMsg.current = null
    sendMessage(msg)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // ── Chat ─────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  async function sendMessage(text?: string) {
    const msg = text || input
    if (!msg.trim() || loading || !sessionId) return

    setLoading(true)
    setInput("")
    setSuggestions([])

    const userMsg: ChatMessage = { sender: "USER", text: msg }
    setMessages((prev) => [...prev, userMsg])

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: msg }),
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

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

  // ══════════════════════════════════════════
  // RENDER: Cinematic
  // ══════════════════════════════════════════
  if (phase === "cinematic") {
    return (
      <div className="story-screen" onClick={skipCinematic}>
        <div className="story-content">
          <div className="story-lines-container">
            {CINEMATIC_LINES.map((line, idx) => (
              <p
                key={idx}
                className={`story-line ${cinematicStep > idx ? "story-line-visible" : ""}`}
              >
                {line}
              </p>
            ))}
          </div>
          <p className="story-skip-hint">tap to skip</p>
        </div>
      </div>
    )
  }

  // ══════════════════════════════════════════
  // RENDER: Character intro
  // ══════════════════════════════════════════
  if (phase === "character") {
    return (
      <div className="char-screen">
        <div className="char-inner">
          <div className="char-avatar-wrap char-avatar-visible">
            <Image src="/logo.png" alt="Tunai" width={72} height={72} className="char-avatar" />
            <span className="char-online-dot" />
          </div>

          <div className="char-bubbles">
            {visibleMsgs > 0 && <span className="char-sender">Tunai</span>}
            {GREETING_MSGS.slice(0, visibleMsgs).map((m, i) => (
              <div key={i} className="char-bubble char-bubble-in">
                {m.text}
              </div>
            ))}

            {showTyping && (
              <div className="char-bubble char-typing-bubble">
                <div className="typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>

          {showChips && (
            <div className="char-chips char-chips-in">
              {INITIAL_SUGGESTIONS.map((s, i) => (
                <button key={i} className="chip" onClick={() => enterChat(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // ══════════════════════════════════════════
  // RENDER: Chat
  // ══════════════════════════════════════════
  return (
    <div className="chat-shell chat-fade-in">
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

      {suggestions.length > 0 && !loading && (
        <div className="quick-replies">
          {suggestions.map((s, i) => (
            <button key={i} className="chip" onClick={() => sendMessage(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

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
