"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";

export function ContactForm() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).catch(() => {});
    setDone(true);
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex h-full min-h-80 flex-col items-center justify-center rounded-4xl border border-mint/30 bg-mint/5 p-10 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-mint text-white">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold">Message sent!</h3>
        <p className="mt-2 text-sm text-ink/60">We&apos;ll get back to you within one business day.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-4xl border border-ink/5 bg-white p-7 shadow-card sm:p-9">
      <div className="grid gap-4 sm:grid-cols-2">
        <input required className="input" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input required type="email" className="input" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <input className="input mt-4" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
      <textarea required className="input mt-4 min-h-36 resize-none" placeholder="How can we help?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      <button type="submit" className="btn-primary mt-6 w-full">
        Send Message <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
