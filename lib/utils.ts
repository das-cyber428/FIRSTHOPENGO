import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names safely. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number to a compact, friendly string (e.g. 5200 -> "5,200"). */
export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-IN").format(n);
}

/** Format INR currency. */
export function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}
