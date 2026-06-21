"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { storyChapters } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";

/**
 * Cinematic horizontal-scroll storytelling section.
 * The vertical scroll over a tall pinned container is translated
 * into horizontal movement across the chapters.
 */
export function Storytelling() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  // Move the track horizontally. -? % depends on the number of panels.
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-82%"]);

  return (
    <section ref={ref} className="relative h-[400vh] bg-ink">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-px">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mint">
            {t("Our Story")}
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold text-white text-balance sm:text-5xl">
            {t("Every Act of Kindness Creates Hope")}
          </h2>
        </div>

        <motion.div style={{ x }} className="mt-12 flex gap-6 pl-5 sm:pl-8">
          {storyChapters.map((chapter, i) => (
            <article
              key={chapter.id}
              className="group relative h-[60vh] w-[78vw] shrink-0 overflow-hidden rounded-4xl sm:w-[46vw] lg:w-[34vw]"
            >
              <Image
                src={chapter.image}
                alt={chapter.title}
                fill
                sizes="(max-width: 768px) 78vw, 34vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  {chapter.kicker}
                </span>
                <h3 className="mt-2 font-display text-3xl font-semibold text-white">
                  {chapter.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                  {chapter.body}
                </p>
              </div>
              <span className="absolute right-6 top-6 font-display text-6xl font-bold text-white/10">
                0{i + 1}
              </span>
            </article>
          ))}

          {/* Closing panel */}
          <div className="flex h-[60vh] w-[78vw] shrink-0 flex-col items-center justify-center rounded-4xl bg-gradient-to-br from-brand to-mint p-10 text-center text-white sm:w-[46vw] lg:w-[34vw]">
            <p className="font-display text-4xl font-semibold">{t("Be the next chapter.")}</p>
            <p className="mt-4 max-w-xs text-white/80">
              Your time, your gift, your voice — they all become someone&apos;s hope.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
