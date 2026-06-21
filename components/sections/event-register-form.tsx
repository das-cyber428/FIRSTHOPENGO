"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Users } from "lucide-react";

export function EventRegisterForm({ eventTitle }: { eventTitle: string }) {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", guests: "1" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/events/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: eventTitle, ...form }),
    }).catch(() => {});
    setDone(true);
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-4xl border border-mint/30 bg-mint/5 p-8 text-center"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mint text-white">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold">You&apos;re registered!</h3>
        <p className="mt-2 text-sm text-ink/60">
          A confirmation and event pass are on the way to {form.email}.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-4xl border border-ink/5 bg-white p-7 shadow-card">
      <div className="flex items-center gap-2 text-brand">
        <Users className="h-5 w-5" />
        <span className="text-sm font-semibold uppercase tracking-widest">Register</span>
      </div>
      <h3 className="mt-2 font-display text-2xl font-semibold">Reserve your spot</h3>
      <div className="mt-6 space-y-4">
        <input
          required
          className="input"
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          required
          type="email"
          className="input"
          placeholder="Email address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <select
          className="input"
          value={form.guests}
          onChange={(e) => setForm({ ...form, guests: e.target.value })}
        >
          {["1", "2", "3", "4", "5+"].map((g) => (
            <option key={g} value={g}>{g} {g === "1" ? "person" : "people"}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn-primary mt-6 w-full">
        Confirm Registration
      </button>
      <p className="mt-3 text-center text-xs text-ink/40">Free · No payment required</p>
    </form>
  );
}
