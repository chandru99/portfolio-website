import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import TagRow from '../components/TagRow.jsx'
import { DURATION_BASE, DURATION_FAST, DURATION_SLOW, EASE_STANDARD } from '../lib/motion.js'
import './AskAnything.css'

const MAX_QUESTION_LENGTH = 500

const SAMPLE_PROMPTS = [
  "What's Chandra's experience with SAP?",
  'Tell me about BillBack',
  'Why did Chandra do an MBA?',
  "What's Chandra like to work with?",
  "Tell me about a time he didn't get it right",
  'What is Chandra into outside of work?',
]

function LoadingDots({ shouldReduceMotion }) {
  return (
    <span className="ask-loading-dots" aria-label="Thinking">
      {[0, 1, 2].map((i) =>
        shouldReduceMotion ? (
          <span key={i} className="ask-loading-dot" />
        ) : (
          <motion.span
            key={i}
            className="ask-loading-dot"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: DURATION_SLOW,
              ease: EASE_STANDARD,
              repeat: Infinity,
              delay: i * DURATION_FAST,
            }}
          />
        ),
      )}
    </span>
  )
}

function Message({ message, shouldReduceMotion }) {
  const isUser = message.role === 'user'
  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: DURATION_BASE, ease: EASE_STANDARD },
      }

  return (
    <motion.div
      className={isUser ? 'ask-message ask-message-user' : 'ask-message ask-message-assistant'}
      {...reveal}
    >
      <p className="ask-bubble">{message.text}</p>
      {!isUser && message.sources?.length > 0 && (
        <details className="ask-sources">
          <summary>Sources</summary>
          <TagRow items={message.sources.map((source) => source.heading)} />
        </details>
      )}
    </motion.div>
  )
}

function AskAnything() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const scrollAnchorRef = useRef(null)

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
      block: 'end',
    })
  }, [messages, isLoading, shouldReduceMotion])

  async function sendQuestion(rawQuestion) {
    const question = rawQuestion.trim()
    if (!question || isLoading) return

    setMessages((prev) => [...prev, { role: 'user', text: question }])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })

      if (!res.ok) {
        const errorBody = await res.json().catch(() => null)
        throw new Error(errorBody?.error || 'Request failed')
      }

      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: data.answer, sources: data.sources || [] },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Something went wrong, try asking again.', isError: true },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    sendQuestion(input)
  }

  return (
    <div className="ask">
      <h1 className="ask-title">Ask Anything</h1>

      <div className="ask-messages">
        <AnimatePresence initial={false}>
          {messages.length === 0 && (
            <motion.div
              key="empty-state"
              className="ask-empty"
              exit={{ opacity: 0, height: 0 }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { duration: DURATION_BASE, ease: EASE_STANDARD }
              }
            >
              <p className="ask-empty-intro">
                I'm here to help you get to know Chandra a bit faster, ask me anything, or try one
                of these:
              </p>
              <div className="ask-chips">
                {SAMPLE_PROMPTS.map((prompt) => (
                  <motion.button
                    key={prompt}
                    type="button"
                    className="ask-chip"
                    onClick={() => sendQuestion(prompt)}
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                  >
                    {prompt}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {messages.map((message, index) => (
          <Message key={index} message={message} shouldReduceMotion={shouldReduceMotion} />
        ))}

        {isLoading && (
          <div className="ask-message ask-message-assistant">
            <div className="ask-bubble ask-bubble-loading">
              <LoadingDots shouldReduceMotion={shouldReduceMotion} />
            </div>
          </div>
        )}

        <div ref={scrollAnchorRef} />
      </div>

      <form className="ask-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="ask-input"
          placeholder="Ask about Chandra..."
          value={input}
          maxLength={MAX_QUESTION_LENGTH}
          onChange={(event) => setInput(event.target.value)}
          disabled={isLoading}
          aria-label="Your question"
        />
        <motion.button
          type="submit"
          className="ask-send"
          disabled={isLoading || input.trim().length === 0}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        >
          Send
        </motion.button>
      </form>
    </div>
  )
}

export default AskAnything
