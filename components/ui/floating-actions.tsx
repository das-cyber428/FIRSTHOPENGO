"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { site } from "@/lib/site";

const quickReplies = [
  "How can I volunteer?",
  "What programs do you run?",
  "Where do you operate?",
];

const botAnswers: Record<string, string> = {
  "How can I volunteer?":
    "Wonderful! Head to our Volunteer page and complete the quick multi-step form. We'll match you to a program near you. 💙",
  "What programs do you run?":
    "We focus on food distribution, education support, health awareness, environmental drives, and volunteer development across Assam.",
  "Where do you operate?":
    "We're based in Dhekiajuli, Sonitpur, Assam and serve 50+ villages across the region.",
};

/** Floating WhatsApp button + lightweight AI chatbot stub. */
export function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "Hi! I'm Hope, your First Hope assistant. How can I help today?" },
  ]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text }]);
    const answer =
      botAnswers[text] ??
      "Thanks for reaching out! A team member will follow up. You can also WhatsApp us anytime.";
    setTimeout(
      () => setMessages((m) => [...m, { from: "bot", text: answer }]),
      500,
    );
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="flex h-[460px] w-[min(360px,calc(100vw-3rem))] flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink/10"
            >
              <div className="flex items-center gap-3 bg-gradient-to-r from-brand to-mint p-4 text-white">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Hope Assistant</p>
                  <p className="text-xs text-white/80">Typically replies instantly</p>
                </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${
                      m.from === "bot"
                        ? "bg-canvas text-ink"
                        : "ml-auto bg-brand text-white"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>

              <div className="border-t border-ink/5 p-3">
                <div className="mb-2 flex flex-wrap gap-1.5">
                  {quickReplies.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand transition hover:bg-brand/20"
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <ChatInput onSend={send} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-3">
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glow transition hover:scale-105"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.945zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.074-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </a>

          <button
            onClick={() => setChatOpen((v) => !v)}
            aria-label="Open chat assistant"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-glow transition hover:scale-105"
          >
            {chatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </>
  );
}

function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSend(value);
        setValue("");
      }}
      className="flex items-center gap-2 rounded-full bg-canvas px-3 py-1.5"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type a message…"
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink/40"
      />
      <button
        type="submit"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white"
        aria-label="Send"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
