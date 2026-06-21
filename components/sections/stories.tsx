"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { successStories } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";

const categoryColor: Record<string, string> = {
  Student: "bg-mint/15 text-mint-dark",
  Volunteer: "bg-brand/10 text-brand",
  Community: "bg-gold/15 text-gold-dark",
};

export function Stories() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const story = successStories[index];

  const go = (dir: number) =>
    setIndex((i) => (i + dir + successStories.length) % successStories.length);

  return (
    <section className="section overflow-hidden bg-canvas">
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t("Success Stories")}</span>
          <h2 className="mt-5 font-display text-4xl font-semibold text-balance sm:text-5xl">
            <span className="text-gradient">{t("Lives changed, in their words")}</span>.
          </h2>
        </Reveal>

        <div className="relative mx-auto mt-14 max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-center gap-8 rounded-5xl border border-ink/5 bg-white p-6 shadow-card md:grid-cols-2 md:p-10"
            >
              <div className="relative h-72 overflow-hidden rounded-4xl md:h-96">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${categoryColor[story.category]}`}>
                  {story.category} Story
                </span>
              </div>

              <div>
                <Quote className="h-10 w-10 text-brand/20" />
                <p className="mt-4 font-display text-2xl font-medium leading-snug text-ink/90">
                  &ldquo;{story.quote}&rdquo;
                </p>
                <div className="mt-6">
                  <p className="font-semibold">{story.name}</p>
                  <p className="text-sm text-ink/50">{story.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Previous story"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white transition hover:border-brand hover:text-brand"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {successStories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to story ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-brand" : "w-2 bg-ink/15"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next story"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white transition hover:border-brand hover:text-brand"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
