"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryCategories, galleryImages } from "@/lib/site";
import { cn } from "@/lib/utils";

export function GalleryMasonry() {
  const [category, setCategory] = useState<string>("All");
  const [active, setActive] = useState<number | null>(null);

  const filtered =
    category === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === category);

  const rowSpan: Record<string, number> = { tall: 52, mid: 34, short: 24 };

  const move = (dir: number) => {
    if (active === null) return;
    setActive((active + dir + filtered.length) % filtered.length);
  };

  return (
    <>
      {/* Filters */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {galleryCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              category === c
                ? "border-brand bg-brand text-white shadow-soft"
                : "border-ink/15 text-ink/60 hover:border-brand",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <motion.div layout className="grid auto-rows-[10px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence>
          {filtered.map((img, i) => (
            <motion.button
              layout
              key={img.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => setActive(i)}
              className="group relative overflow-hidden rounded-3xl"
              style={{ gridRow: `span ${rowSpan[img.h]}` }}
            >
              <Image
                src={img.src}
                alt={img.category}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 translate-y-2 text-sm font-semibold text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                {img.category}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur"
            onClick={() => setActive(null)}
          >
            <button className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white" aria-label="Close">
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); move(-1); }}
              className="absolute left-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-[70vh] w-full max-w-4xl overflow-hidden rounded-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={filtered[active].src} alt={filtered[active].category} fill className="object-contain" />
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); move(1); }}
              className="absolute right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
