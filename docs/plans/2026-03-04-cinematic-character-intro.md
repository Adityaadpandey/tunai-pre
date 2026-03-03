# Cinematic + Character Intro Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the abstract 4-line story screen with a 3-phase intro: 2 cinematic lines → Tunai character intro (messages bubble in) → fade into full chat.

**Architecture:** Single `page.tsx` file, phase state machine (`"cinematic" | "character" | "chat"`). Cinematic phase auto-advances, character phase reveals GREETING_MSGS one-by-one with typing indicators. Transitioning to chat seeds messages state with greeting history. New CSS classes in `globals.css`.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, custom CSS classes.

---

### Task 1: Update `page.tsx` — phase state machine + cinematic phase

**Files:**
- Modify: `app/page.tsx`

**Step 1: Replace the current story state with a 3-phase system**

Replace all state/logic in `page.tsx` with this updated version. Key changes:
- `showChat: boolean` + `storyStep: number` → `phase: "cinematic" | "character" | "chat"`
- `STORY_LINES` trimmed to 2 cinematic lines
- Cinematic phase auto-advances each line with 1800ms delay, then transitions to `"character"` after 1000ms pause
- Tap/click anywhere on cinematic screen skips to character phase immediately

Here is the complete new `app/page.tsx`:

```tsx
"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"

interface ChatMessage {
  sender: "USER" | "TUNAI"
  text: string
}

const CINEMATIC_LINES = [
  "Every great event starts with a simple idea.",
  "Turning that idea into reality?",
]

const GREETING_MSGS: ChatMessage[] = [
  { sender: "TUNAI", text: "Hey! 👋 I'm Tunai." },
  { sender: "TUNAI", text: "I help teams automate vendor ops, logistics, and coordination for events at scale." },
  { sender: "TUNAI", text: "What kind of event are you working on?" },
]

const INITIAL_SUGGESTIONS = [
  "Planning a college fest",
  "Organizing a conference",
  "Running a music festival",
  "What exactly does Tunai do?",
]

type Phase = "cinematic" | "character" | "chat"

export default function Home() {
  const [phase, setPhase] = useState<Phase>("cinematic")

  // Cinematic phase
  const [cinematicStep, setCinematicStep] = useState(0) // 0 = nothing visible, 1 = line1, 2 = line2

  // Character phase
  const [visibleMsgs, setVisibleMsgs] = useState(0) // how many GREETING_MSGS are visible
  const [showTyping, setShowTyping] = useState(false)
  const [showChips, setShowChips] = useState(false)

  // Chat phase
  const [sessionId, setSessionId] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>(INITIAL_SUGGESTIONS)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Session ID init
  useEffect(() => {
    let id = localStorage.getItem("tunai_session")
    if (!id) {
      id = uuidv4()
      localStorage.setItem("tunai_session", id)
    }
    setSessionId(id)
  }, [])

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
  // Sequence: typing → msg1 → typing → msg2 → typing → msg3 → chips
  const TYPING_DELAYS = [400, 1000, 800]
  const MSG_PAUSES   = [900, 1100, 1000]

  useEffect(() => {
    if (phase !== "character") return

    let elapsed = 0
    const timers: NodeJS.Timeout[] = []

    GREETING_MSGS.forEach((_, i) => {
      // show typing indicator
      const tTyping = setTimeout(() => setShowTyping(true), elapsed)
      timers.push(tTyping)
      elapsed += TYPING_DELAYS[i]

      // reveal message, hide typing
      const tMsg = setTimeout(() => {
        setShowTyping(false)
        setVisibleMsgs(i + 1)
      }, elapsed)
      timers.push(tMsg)
      elapsed += MSG_PAUSES[i]
    })

    // show chips after last message
    const tChips = setTimeout(() => setShowChips(true), elapsed)
    timers.push(tChips)

    return () => timers.forEach(clearTimeout)
  }, [phase])

  // ── Transition to chat ────────────────────
  const enterChat = (firstMsg?: string) => {
    setMessages([...GREETING_MSGS])
    setSuggestions([])
    setPhase("chat")
    if (firstMsg) {
      // send after state settles
      setTimeout(() => sendMessage(firstMsg, [...GREETING_MSGS]), 50)
    }
  }

  // ── Chat ─────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  async function sendMessage(text?: string, initialMessages?: ChatMessage[]) {
    const msg = text || input
    if (!msg.trim() || loading) return

    setLoading(true)
    setInput("")
    setSuggestions([])

    const userMsg: ChatMessage = { sender: "USER", text: msg }
    setMessages((prev) => [...(initialMessages ?? prev), userMsg])

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
          {/* Avatar */}
          <div className="char-avatar-wrap char-avatar-visible">
            <Image src="/logo.png" alt="Tunai" width={72} height={72} className="char-avatar" />
            <span className="char-online-dot" />
          </div>

          {/* Message bubbles */}
          <div className="char-bubbles">
            {GREETING_MSGS.slice(0, visibleMsgs).map((m, i) => (
              <div key={i} className="char-bubble char-bubble-in">
                {m.text}
              </div>
            ))}

            {/* Typing indicator */}
            {showTyping && (
              <div className="char-bubble char-typing-bubble">
                <div className="typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
          </div>

          {/* Quick-reply chips */}
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
      {/* Top Bar */}
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

      {/* Messages */}
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

      {/* Quick Replies */}
      {suggestions.length > 0 && !loading && (
        <div className="quick-replies">
          {suggestions.map((s, i) => (
            <button key={i} className="chip" onClick={() => sendMessage(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Composer */}
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
```

**Step 2: Verify it compiles (no build step needed in dev)**

Run: `pnpm dev` and check there are no TypeScript errors in terminal.

**Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: cinematic + character intro phase state machine"
```

---

### Task 2: Add CSS for character intro screen

**Files:**
- Modify: `app/globals.css`

**Step 1: Append new CSS classes at the bottom of `globals.css`**

Add these blocks after the last existing rule (after `.story-button:hover svg`):

```css
/* ══════════════════════════════════════════════
   CHARACTER INTRO SCREEN
   ══════════════════════════════════════════════ */

.char-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100dvh;
  width: 100vw;
  background: #000;
  padding: 24px;
  animation: chatFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.char-inner {
  max-width: 520px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
}

/* Avatar */
.char-avatar-wrap {
  position: relative;
  margin-bottom: 20px;
  opacity: 0;
  transform: scale(0.88);
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.char-avatar-visible {
  opacity: 1;
  transform: scale(1);
}

.char-avatar {
  border-radius: 96px;
  border: 1px solid var(--w-12);
  box-shadow: 0 0 48px rgba(255, 255, 255, 0.07);
  display: block;
}

.char-online-dot {
  position: absolute;
  bottom: 3px;
  right: 3px;
  width: 14px;
  height: 14px;
  background: #34D399;
  border: 2.5px solid #000;
  border-radius: 99px;
  animation: glow 2s ease-in-out infinite;
}

/* Bubbles container */
.char-bubbles {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  margin-bottom: 24px;
}

.char-bubble {
  background: var(--w-8);
  color: var(--w-84);
  border-radius: 20px 20px 20px 4px;
  padding: 12px 16px;
  font-size: 16px;
  line-height: 1.5;
  max-width: 88%;
  border: 1px solid var(--w-8);
}

.char-bubble-in {
  animation: rise 0.36s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.char-typing-bubble {
  padding: 10px 16px;
}

/* Chips */
.char-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  opacity: 0;
  transform: translateY(10px);
}

.char-chips-in {
  animation: fadeSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s forwards;
}

/* Story screen skip hint */
.story-skip-hint {
  font-size: 12px;
  color: var(--w-20);
  letter-spacing: 0.04em;
  margin-top: 48px;
  text-transform: lowercase;
  transition: opacity 0.4s ease;
}
```

**Step 2: Verify visually**

Open `http://localhost:3000` and watch:
1. Two cinematic lines appear with blur-in effect
2. After ~4s (or tap) → character screen fades in, avatar appears, typing dots show, messages bubble in one by one, then chips slide up
3. Tap a chip → fades into full chat with greeting history loaded

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add character intro CSS classes"
```

---

### Task 3: Fix `enterChat` — ensure chip tap transitions cleanly to chat

**Files:**
- Modify: `app/page.tsx`

**Note:** The `sendMessage` function in the chat phase references `initialMessages` for the first message after character phase. But because `setPhase("chat")` and `setMessages(...)` are batched, the `setTimeout` trick ensures the first user message is sent after state settles. Verify this works end-to-end:

**Step 1: Test chip → chat flow manually**
- Open `http://localhost:3000`
- Wait for chips to appear in character phase
- Tap "Planning a college fest"
- Verify: full chat opens with greeting messages + user message + Tunai typing indicator
- Verify: Tunai's reply arrives and quick-reply chips update

**Step 2: If `sendMessage` fires before `sessionId` is set**, there will be a 400 error. Add a guard:

In `sendMessage`, add early return if `!sessionId`:
```tsx
async function sendMessage(text?: string, initialMessages?: ChatMessage[]) {
  const msg = text || input
  if (!msg.trim() || loading || !sessionId) return
  // ... rest unchanged
```

**Step 3: Commit if any fix was needed**

```bash
git add app/page.tsx
git commit -m "fix: guard sendMessage against missing sessionId"
```

---

### Done

The feature is complete when:
- [ ] Cinematic screen shows 2 lines with blur-in, tap skips
- [ ] Character screen: avatar fades in, typing indicator, 3 messages bubble in, chips appear
- [ ] Tapping a chip opens full chat with history + sends the chip text
- [ ] Chat works exactly as before (API, quick replies, composer)
