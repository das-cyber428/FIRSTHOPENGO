"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Heart, Play } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import { heroStats, site } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background video with image fallback */}
      <motion.div style={{ scale }} className="absolute inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80"
          className="h-full w-full object-cover"
        >
          {/* Drop your own footage at /public/hero.mp4 */}
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/80" />
        <div className="absolute inset-0 bg-hero-gradient opacity-40 mix-blend-multiply" />
      </motion.div>

      {/* Floating glass orbs */}
      <div className="pointer-events-none absolute right-[8%] top-[22%] hidden h-28 w-28 animate-float rounded-3xl glass lg:block" />
      <div className="pointer-events-none absolute left-[6%] top-[55%] hidden h-20 w-20 animate-float-slow rounded-2xl glass lg:block" />

      <motion.div style={{ y, opacity }} className="container-px relative w-full pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-mint" />
            {site.location}
          </span>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-white text-balance sm:text-6xl lg:text-7xl">
            {t("Creating Hope.")}
            <br />
            <span className="text-gradient-gold">{t("Transforming Lives.")}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            {t(
              "First Hope NGO is dedicated to empowering communities through education, food security, volunteerism, and sustainable development.",
            )}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/volunteer" className="btn-gold">
              <Heart className="h-4 w-4" /> {t("Become a Volunteer")}
            </Link>
            <button className="group flex items-center gap-3 text-sm font-medium text-white">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur transition group-hover:bg-white/20">
                <Play className="h-4 w-4 fill-current" />
              </span>
              {t("Watch our story")}
            </button>
          </div>
        </motion.div>

        {/* Hero statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl glass-dark p-5 text-white"
            >
              <Counter
                value={stat.value}
                suffix={stat.suffix}
                className="font-display text-3xl font-semibold sm:text-4xl"
              />
              <p className="mt-1 text-sm text-white/70">{t(stat.label)}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="h-2 w-1 rounded-full bg-white"
          />
        </div>
      </div>
    </section>
  );
}
