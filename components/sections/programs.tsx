"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { programs } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";

const accentRing: Record<string, string> = {
  brand: "text-brand bg-brand/10",
  gold: "text-gold-dark bg-gold/15",
  mint: "text-mint-dark bg-mint/10",
};

export function Programs() {
  const { t } = useI18n();
  return (
    <section id="programs" className="section bg-white">
      <div className="container-px">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">{t("What We Do")}</span>
            <h2 className="mt-5 font-display text-4xl font-semibold text-balance sm:text-5xl">
              <span className="text-gradient">{t("Programs built around real needs")}</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-ink/60">
              {t("Six focused initiatives, one shared belief — that every community deserves dignity, opportunity, and hope.")}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => (
            <Reveal key={program.slug} delay={(i % 3) * 0.1}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group flex h-full flex-col overflow-hidden rounded-4xl border border-ink/5 bg-canvas shadow-soft"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <span className={cn("rounded-full px-3 py-1 text-xs font-semibold backdrop-blur", accentRing[program.accent])}>
                      {program.stat.value} {program.stat.label}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-semibold leading-snug">
                    {t(program.title)}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60">
                    {t(program.story)}
                  </p>
                  <button className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand transition group-hover:gap-2.5">
                    {t("Learn more")}
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
