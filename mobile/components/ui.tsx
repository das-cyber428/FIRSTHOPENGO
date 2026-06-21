import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { colors, radius, shadow, spacing } from "@/constants/theme";

/* ───────────────────────── Button ───────────────────────── */
type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "gold" | "ghost" | "light";
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  label,
  onPress,
  variant = "primary",
  icon,
  loading,
  style,
}: ButtonProps) {
  const bg =
    variant === "primary" ? colors.brand
    : variant === "gold" ? colors.gold
    : variant === "light" ? colors.white
    : "transparent";
  const fg =
    variant === "gold" ? colors.ink
    : variant === "light" ? colors.ink
    : variant === "ghost" ? colors.brand
    : colors.white;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: bg, opacity: pressed ? 0.85 : 1 },
        variant === "ghost" && styles.btnGhost,
        variant === "primary" && shadow.glow,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <>
          {icon && <Ionicons name={icon} size={18} color={fg} />}
          <Text style={[styles.btnText, { color: fg }]}>{label}</Text>
        </>
      )}
    </Pressable>
  );
}

/* ───────────────────────── Badge ───────────────────────── */
export function Badge({
  label,
  tone = "brand",
}: {
  label: string;
  tone?: "brand" | "gold" | "mint" | "light";
}) {
  const map = {
    brand: { bg: colors.brandSoft, fg: colors.brand },
    gold: { bg: colors.goldSoft, fg: "#9a6a05" },
    mint: { bg: colors.mintSoft, fg: colors.mint },
    light: { bg: "rgba(255,255,255,0.18)", fg: colors.white },
  }[tone];
  return (
    <View style={[styles.badge, { backgroundColor: map.bg }]}>
      <Text style={[styles.badgeText, { color: map.fg }]}>{label}</Text>
    </View>
  );
}

/* ───────────────────────── SectionHeader ───────────────────────── */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={{ marginBottom: spacing.lg }}>
      {eyebrow && <Text style={styles.eyebrow}>{eyebrow.toUpperCase()}</Text>}
      <Text style={styles.h2}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

/* ───────────────────────── Card ───────────────────────── */
export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

/* ───────────────────────── Animated Counter ───────────────────────── */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1600,
  style,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  style?: StyleProp<TextStyle>;
}) {
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const start = Date.now();
    let raf: number;
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * p);
      setDisplay(Math.round((p === 1 ? 1 : eased) * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  const text =
    value >= 1_000_000
      ? `${(display / 1_000_000).toFixed(1)}M`
      : display.toLocaleString("en-IN");

  return (
    <Text style={style}>
      {prefix}
      {text}
      {suffix}
    </Text>
  );
}

/* ───────────────────────── Gradient header ───────────────────────── */
export function GradientHeader({
  eyebrow,
  title,
  highlight,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle?: string;
}) {
  return (
    <LinearGradient
      colors={[colors.brand, "#1f7be0", colors.mint]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientHeader}
    >
      <Badge label={eyebrow} tone="light" />
      <Text style={styles.gradientTitle}>
        {title}
        {highlight ? <Text style={{ color: colors.gold }}> {highlight}</Text> : null}
      </Text>
      {subtitle && <Text style={styles.gradientSubtitle}>{subtitle}</Text>}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: radius.pill,
  },
  btnGhost: { borderWidth: 1.5, borderColor: colors.brand },
  btnText: { fontSize: 15, fontWeight: "700", letterSpacing: 0.2 },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  badgeText: { fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  eyebrow: {
    color: colors.brand,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  h2: { color: colors.ink, fontSize: 26, fontWeight: "800", lineHeight: 32 },
  subtitle: { color: colors.inkSoft, fontSize: 15, lineHeight: 22, marginTop: 8 },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.lg,
    ...shadow.card,
  },
  gradientHeader: {
    paddingTop: 70,
    paddingBottom: 34,
    paddingHorizontal: spacing.lg,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  gradientTitle: {
    color: colors.white,
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 38,
    marginTop: 14,
  },
  gradientSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
  },
});
