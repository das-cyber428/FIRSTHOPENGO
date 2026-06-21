"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Mail, Phone, Send, ArrowUpRight } from "lucide-react";
import { site, nav } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";

const quickLinks = [
  { label: "Volunteer Registration", href: "/volunteer" },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative mt-10 overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-mint/20 blur-[120px]" />

      <div className="container-px relative py-20">
        {/* Newsletter band */}
        <div className="mb-16 grid gap-8 rounded-4xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur md:grid-cols-2 md:items-center md:p-12">
          <div>
            <h3 className="font-display text-3xl font-semibold">
              Stay close to the <span className="text-gradient-gold">hope</span>.
            </h3>
            <p className="mt-3 text-white/60">
              {t("Monthly impact reports, stories, and ways to help — straight to your inbox.")}
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubscribed(true);
            }}
            className="flex w-full items-center gap-2 rounded-full bg-white/10 p-1.5 ring-1 ring-white/15"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={subscribed ? "Thank you for subscribing! 🎉" : "you@email.com"}
              disabled={subscribed}
              className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-white/50"
            />
            <button type="submit" className="btn-gold !py-2.5 whitespace-nowrap">
              <Send className="h-4 w-4" /> {t("Subscribe")}
            </button>
          </form>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand to-mint font-display font-bold">
                FH
              </span>
              <div>
                <p className="font-bold">{site.name}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                  {site.tagline}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              {site.mission}
            </p>
            <div className="mt-6 flex gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xs font-semibold transition hover:bg-brand"
                >
                  {s.label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
              {t("Quick Links")}
            </p>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1 text-sm text-white/70 transition hover:text-white"
                  >
                    {t(l.label)}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
              {t("Explore")}
            </p>
            <ul className="mt-5 space-y-3">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/70 transition hover:text-white">
                    {t(l.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/40">
              {t("Get in Touch")}
            </p>
            <ul className="mt-5 space-y-4 text-sm text-white/70">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-mint" />
                {site.location}
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 shrink-0 text-mint" />
                <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 shrink-0 text-mint" />
                <a href={`tel:${site.phone}`} className="hover:text-white">{site.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">{t("Privacy Policy")}</Link>
            <Link href="/terms" className="hover:text-white">{t("Terms")}</Link>
            <span>Made with 💙 in Assam</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
