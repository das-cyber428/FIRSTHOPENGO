"use client";

import { motion } from "framer-motion";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
};

/** Consistent premium header for inner pages. */
export function PageHero({ eyebrow, title, highlight, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-36 text-white">
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-brand/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-mint/20 blur-[120px]" />
      <div className="container-px relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-white">
            {eyebrow}
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-tight text-balance sm:text-6xl">
            {title} {highlight && <span className="text-gradient-gold">{highlight}</span>}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-xl text-lg text-white/70">{subtitle}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
