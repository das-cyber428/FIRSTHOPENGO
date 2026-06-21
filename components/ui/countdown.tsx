"use client";

import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

/** Live event countdown timer. */
export function Countdown({ date, compact = false }: { date: string; compact?: boolean }) {
  const target = new Date(date).getTime();
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: t.days },
    { label: "Hrs", value: t.hours },
    { label: "Min", value: t.minutes },
    { label: "Sec", value: t.seconds },
  ];

  if (compact) {
    return (
      <span className="font-mono text-sm font-semibold text-brand">
        {t.days}d {String(t.hours).padStart(2, "0")}:{String(t.minutes).padStart(2, "0")}:
        {String(t.seconds).padStart(2, "0")}
      </span>
    );
  }

  return (
    <div className="flex gap-3">
      {units.map((u) => (
        <div
          key={u.label}
          className="flex min-w-[64px] flex-col items-center rounded-2xl bg-white/10 px-3 py-2 backdrop-blur"
        >
          <span className="font-display text-2xl font-semibold tabular-nums">
            {String(u.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-white/60">{u.label}</span>
        </div>
      ))}
    </div>
  );
}
