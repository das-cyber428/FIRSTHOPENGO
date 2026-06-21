"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Utensils, GraduationCap, Users, FolderKanban, IndianRupee } from "lucide-react";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { impactStats } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n-provider";

const icons = [Utensils, GraduationCap, Users, FolderKanban, IndianRupee];

const accentMap: Record<string, string> = {
  brand: "from-brand/15 to-brand/0 text-brand",
  gold: "from-gold/20 to-gold/0 text-gold-dark",
  mint: "from-mint/15 to-mint/0 text-mint-dark",
};

export function Impact() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="impact" ref={ref} className="section overflow-hidden bg-canvas">
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" />
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-mint/10 blur-[100px]"
      />

      <div className="container-px relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t("Impact Dashboard")}</span>
          <h2 className="mt-5 font-display text-4xl font-semibold text-balance sm:text-5xl">
            <span className="text-gradient">{t("Numbers that carry stories")}</span>.
          </h2>
          <p className="mt-4 text-ink/60">
            {t("Real, measurable change — tracked transparently and updated as we grow.")}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {impactStats.map((stat, i) => {
            const Icon = icons[i % icons.length];
            const wide = i === impactStats.length - 1;
            return (
              <Reveal key={stat.label} delay={i * 0.08} className={cn(wide && "lg:col-span-1")}>
                <div
                  className={cn(
                    "group relative h-full overflow-hidden rounded-4xl border border-ink/5 bg-white p-7 shadow-soft card-hover",
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 transition group-hover:opacity-100",
                      accentMap[stat.accent],
                    )}
                  />
                  <div className="relative">
                    <span
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br",
                        accentMap[stat.accent],
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <Counter
                      value={stat.value}
                      prefix={"prefix" in stat ? stat.prefix : ""}
                      suffix={stat.suffix}
                      className="mt-6 block font-display text-5xl font-semibold tracking-tight"
                    />
                    <p className="mt-2 text-sm font-medium uppercase tracking-wide text-ink/50">
                      {t(stat.label)}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}

          {/* Highlight CTA tile */}
          <Reveal delay={0.4}>
            <div className="flex h-full flex-col justify-between rounded-4xl bg-gradient-to-br from-brand to-mint p-7 text-white shadow-glow">
              <p className="font-display text-2xl font-semibold leading-snug">
                {t("Every hour you give creates lasting change.")}
              </p>
              <a href="/volunteer" className="btn-light mt-6 w-fit">
                {t("Join as a volunteer")}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
