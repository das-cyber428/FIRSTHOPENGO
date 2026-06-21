/** FIRST HOPE NGO — mobile design tokens (mirrors the website brand). */

export const colors = {
  brand: "#0B5FFF",
  brandDark: "#094ccc",
  brandSoft: "#EAF1FF",
  gold: "#F5A623",
  goldSoft: "#FEF1DC",
  mint: "#00C48C",
  mintSoft: "#E0F8F1",
  ink: "#111827",
  inkSoft: "#6B7280",
  inkFaint: "#9CA3AF",
  line: "#ECECEF",
  canvas: "#FAFAFA",
  white: "#FFFFFF",
};

export const radius = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 32,
  pill: 999,
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 36,
};

export const shadow = {
  card: {
    shadowColor: "#111827",
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
  },
  glow: {
    shadowColor: "#0B5FFF",
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
};

export const font = {
  // Using system fonts for reliability; swap for a custom display face if desired.
  display: undefined as string | undefined,
};
