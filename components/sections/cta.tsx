"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Hand, ArrowRight } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";

export function CTA() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 -z-10 bg-ink" />
      <div className="absolute inset-0 -z-10 opacity-90">
        <div className="absolute -left-20 top-0 h-96 w-96 animate-float rounded-full bg-brand/40 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 h-96 w-96 animate-float-slow rounded-full bg-mint/40 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-[120px]" />
      </div>

      <div className="container-px text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-mint">
            {t("Join the movement")}
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight text-white text-balance sm:text-6xl">
            {t("Hope is a verb.")} <span className="text-gradient-gold">{t("Let's act on it.")}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            {t("Whether you give an hour or a gift, you become part of a story that ends with a child fed, a student dreaming, a village rising.")}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/volunteer" className="btn-gold">
              <Hand className="h-4 w-4" /> {t("Become a Volunteer")}
            </Link>
            <Link href="/contact" className="btn-primary">
              {t("Get Involved")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
