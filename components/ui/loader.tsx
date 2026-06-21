"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/** Cinematic loading screen shown once on first paint. */
export function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <div className="relative flex flex-col items-center">
            <div className="relative h-20 w-20">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand/40" />
              <span className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-brand to-mint text-2xl font-display font-semibold text-white">
                FH
              </span>
            </div>
            <motion.div
              className="mt-7 h-[3px] w-44 overflow-hidden rounded-full bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.span
                className="block h-full bg-gradient-to-r from-brand via-gold to-mint"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            </motion.div>
            <p className="mt-4 text-xs uppercase tracking-[0.4em] text-white/60">
              Hope Changes Everything
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
