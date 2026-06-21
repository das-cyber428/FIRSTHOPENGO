"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Globe, Hand } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav, site } from "@/lib/site";
import { languages } from "@/lib/i18n";
import { useI18n } from "@/components/i18n-provider";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2.5" : "py-4",
      )}
    >
      <div className="container-px">
        <nav
          className={cn(
            "flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5",
            scrolled
              ? "glass shadow-soft"
              : "bg-white/5 backdrop-blur-sm",
          )}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand to-mint text-sm font-display font-bold text-white">
              FH
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-sm font-bold tracking-tight">{site.name}</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-ink/50">
                {site.tagline}
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-ink/70 transition hover:bg-brand/5 hover:text-brand"
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden items-center rounded-full bg-ink/5 p-0.5 sm:flex">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  aria-label={`Switch language to ${l.name}`}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-semibold transition",
                    lang === l.code ? "bg-white text-brand shadow-sm" : "text-ink/50",
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <Link href="/volunteer" className="hidden btn-primary !px-5 !py-2.5 text-xs sm:inline-flex">
              <Hand className="h-4 w-4" /> {t("Volunteer")}
            </Link>

            <button
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-white p-6 shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-lg font-semibold">{site.name}</span>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/5"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="mt-8 space-y-1">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-lg font-medium text-ink/80 transition hover:bg-brand/5 hover:text-brand"
                    >
                      {t(item.label)}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/volunteer" onClick={() => setOpen(false)} className="btn-primary w-full">
                  <Hand className="h-4 w-4" /> {t("Become a Volunteer")}
                </Link>
              </div>
              <div className="mt-8">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink/40">
                  <Globe className="h-4 w-4" /> Language
                </div>
                <div className="flex gap-2">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code)}
                      className={cn(
                        "flex-1 rounded-2xl border px-3 py-2.5 text-sm font-semibold transition",
                        lang === l.code
                          ? "border-brand bg-brand text-white"
                          : "border-ink/15 text-ink/70",
                      )}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
