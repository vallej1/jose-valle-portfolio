"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Send, MessageCircle, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "What PM frameworks do you use?",
  "Tell me about a time you drove revenue growth",
  "Describe your technical background",
  "How do you handle cross-functional alignment?",
];

export default function ChatBox() {
  const ref = useRef(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I'm having trouble connecting right now. Please try again later or reach out directly via the contact form below.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <section id="chat" className="py-24" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ask Me Anything
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Have questions about my experience, skills, or projects? Chat with
            my AI assistant trained on my portfolio.
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden"
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-[var(--border)] flex items-center gap-3">
            <div className="p-2 bg-[var(--primary)] bg-opacity-20 rounded-lg">
              <MessageCircle className="text-[var(--primary)]" size={20} />
            </div>
            <div>
              <h3 className="font-semibold">Ask about Jose&apos;s experience</h3>
              <p className="text-xs text-[var(--text-tertiary)]">
                Powered by Claude
              </p>
            </div>
          </div>

          {/* Suggested Questions */}
          {messages.length === 0 && (
            <div className="p-4 border-b border-[var(--border)]">
              <p className="text-sm text-[var(--text-tertiary)] mb-3">
                Suggested questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="px-3 py-2 text-sm bg-[var(--background)] border border-[var(--border)] rounded-lg text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-[var(--text-tertiary)]">
                <p className="text-center">
                  Start a conversation by asking a question or selecting one
                  above.
                </p>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`p-2 rounded-lg flex-shrink-0 ${
                    message.role === "user"
                      ? "bg-[var(--primary)] bg-opacity-20"
                      : "bg-[var(--surface-elevated)]"
                  }`}
                >
                  {message.role === "user" ? (
                    <User size={16} className="text-[var(--primary)]" />
                  ) : (
                    <Bot size={16} className="text-[var(--accent)]" />
                  )}
                </div>
                <div
                  className={`px-4 py-3 rounded-xl max-w-[80%] ${
                    message.role === "user"
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--background)] border border-[var(--border)]"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[var(--surface-elevated)]">
                  <Bot size={16} className="text-[var(--accent)]" />
                </div>
                <div className="px-4 py-3 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                  <Loader2 className="animate-spin text-[var(--text-tertiary)]" size={16} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-[var(--border)]"
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="px-6 py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex items-center gap-2"
              >
                <Send size={18} />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Privacy Note */}
        <p className="text-center text-xs text-[var(--text-tertiary)] mt-4">
          Conversations are not stored. Powered by Claude AI trained on Jose&apos;s
          portfolio content.
        </p>
      </div>
    </section>
  );
}
