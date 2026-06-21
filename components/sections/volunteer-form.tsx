"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Upload, PartyPopper } from "lucide-react";
import { indianStates } from "@/lib/site";
import { cn } from "@/lib/utils";

type FormData = {
  name: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  skills: string[];
  availability: string;
  motivation: string;
  resume: string;
};

const steps = ["About You", "Location", "Skills & Time", "Your Why"];

const skillOptions = [
  "Teaching", "Medical", "Cooking", "Fundraising", "Photography",
  "Social Media", "Event Management", "Logistics", "Counselling", "Tech / Web",
];

const availabilityOptions = ["Weekends", "Weekday Evenings", "Full-time", "Remote", "On-call"];

const empty: FormData = {
  name: "", phone: "", email: "", state: "", city: "",
  skills: [], availability: "", motivation: "", resume: "",
};

export function VolunteerForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(empty);
  const [submitted, setSubmitted] = useState(false);

  const set = (patch: Partial<FormData>) => setData((d) => ({ ...d, ...patch }));
  const toggleSkill = (s: string) =>
    set({ skills: data.skills.includes(s) ? data.skills.filter((x) => x !== s) : [...data.skills, s] });

  const canProceed =
    (step === 0 && data.name && data.phone && data.email) ||
    (step === 1 && data.state && data.city) ||
    (step === 2 && data.skills.length > 0 && data.availability) ||
    step === 3;

  const submit = async () => {
    // Wire to /api/volunteer (Supabase). Optimistic UI for now.
    try {
      await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch(() => {});
    } finally {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-xl rounded-5xl border border-ink/5 bg-white p-12 text-center shadow-card"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint/15 text-mint-dark">
          <PartyPopper className="h-8 w-8" />
        </div>
        <h3 className="mt-6 font-display text-3xl font-semibold">Welcome to the movement!</h3>
        <p className="mt-3 text-ink/60">
          Thank you, {data.name.split(" ")[0]}. Our team will reach out within 48 hours
          to match you with a program near {data.city}.
        </p>
        <button
          onClick={() => { setData(empty); setStep(0); setSubmitted(false); }}
          className="btn-ghost mt-8"
        >
          Register another volunteer
        </button>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-10 flex items-center justify-between">
        {steps.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition",
                  i < step && "bg-mint text-white",
                  i === step && "bg-brand text-white shadow-glow",
                  i > step && "bg-ink/5 text-ink/40",
                )}
              >
                {i < step ? <Check className="h-5 w-5" /> : i + 1}
              </div>
              <span className="mt-2 hidden text-xs font-medium text-ink/50 sm:block">{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("mx-2 h-0.5 flex-1 rounded", i < step ? "bg-mint" : "bg-ink/10")} />
            )}
          </div>
        ))}
      </div>

      <div className="rounded-5xl border border-ink/5 bg-white p-6 shadow-card sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
          >
            {step === 0 && (
              <div className="space-y-5">
                <Field label="Full Name">
                  <input className="input" value={data.name} onChange={(e) => set({ name: e.target.value })} placeholder="Anjali Das" />
                </Field>
                <Field label="Phone">
                  <input className="input" value={data.phone} onChange={(e) => set({ phone: e.target.value })} placeholder="+91 98765 43210" />
                </Field>
                <Field label="Email">
                  <input type="email" className="input" value={data.email} onChange={(e) => set({ email: e.target.value })} placeholder="you@email.com" />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <Field label="State">
                  <select className="input" value={data.state} onChange={(e) => set({ state: e.target.value })}>
                    <option value="">Select your state</option>
                    {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="City / Village">
                  <input className="input" value={data.city} onChange={(e) => set({ city: e.target.value })} placeholder="Dhekiajuli" />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <Field label="Your Skills (pick all that apply)">
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSkill(s)}
                        className={cn(
                          "rounded-full border px-4 py-2 text-sm font-medium transition",
                          data.skills.includes(s)
                            ? "border-brand bg-brand text-white"
                            : "border-ink/15 text-ink/70 hover:border-brand",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Availability">
                  <div className="flex flex-wrap gap-2">
                    {availabilityOptions.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => set({ availability: a })}
                        className={cn(
                          "rounded-full border px-4 py-2 text-sm font-medium transition",
                          data.availability === a
                            ? "border-mint bg-mint text-white"
                            : "border-ink/15 text-ink/70 hover:border-mint",
                        )}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <Field label="Why do you want to volunteer?">
                  <textarea
                    className="input min-h-32 resize-none"
                    value={data.motivation}
                    onChange={(e) => set({ motivation: e.target.value })}
                    placeholder="Share what inspires you to give back…"
                  />
                </Field>
                <Field label="Upload Resume (optional)">
                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-ink/20 px-4 py-4 text-sm text-ink/50 transition hover:border-brand">
                    <Upload className="h-5 w-5" />
                    {data.resume || "Drop your PDF or click to browse"}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => set({ resume: e.target.files?.[0]?.name ?? "" })}
                    />
                  </label>
                </Field>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={cn("btn-ghost", step === 0 && "invisible")}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {step < steps.length - 1 ? (
            <button
              type="button"
              disabled={!canProceed}
              onClick={() => setStep((s) => s + 1)}
              className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button type="button" onClick={submit} className="btn-gold">
              Join the Movement <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-ink/70">{label}</span>
      {children}
    </label>
  );
}
