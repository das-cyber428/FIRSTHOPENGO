import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Badge, SectionHeader } from "@/components/ui";
import { events } from "@/constants/content";
import { colors, radius, shadow, spacing } from "@/constants/theme";

function useCountdown(date: string) {
  const target = new Date(date).getTime();
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const ms = Math.max(0, target - now);
  return {
    d: Math.floor(ms / 86_400_000),
    h: Math.floor((ms / 3_600_000) % 24),
    m: Math.floor((ms / 60_000) % 60),
    s: Math.floor((ms / 1000) % 60),
  };
}

function Countdown({ date }: { date: string }) {
  const { d, h, m, s } = useCountdown(date);
  const units = [
    { v: d, l: "Days" },
    { v: h, l: "Hrs" },
    { v: m, l: "Min" },
    { v: s, l: "Sec" },
  ];
  return (
    <View style={styles.countdown}>
      {units.map((u) => (
        <View key={u.l} style={styles.cdUnit}>
          <Text style={styles.cdValue}>{String(u.v).padStart(2, "0")}</Text>
          <Text style={styles.cdLabel}>{u.l}</Text>
        </View>
      ))}
    </View>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "long",
  });
}

export default function EventsScreen() {
  return (
    <ScrollView
      style={{ backgroundColor: colors.canvas }}
      contentContainerStyle={{ padding: spacing.lg, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <SectionHeader
        eyebrow="Events"
        title="Show up. Change everything."
        subtitle="Join an upcoming drive, fair, or camp — and be part of the change in person."
      />

      {events.map((e) => (
        <Pressable
          key={e.slug}
          onPress={() => router.push(`/event/${e.slug}`)}
          style={styles.card}
        >
          <Image source={{ uri: e.image }} style={styles.img} />
          <View style={styles.body}>
            <Badge label={e.category} tone="gold" />
            <Text style={styles.title}>{e.title}</Text>
            <View style={styles.meta}>
              <Ionicons name="calendar-outline" size={15} color={colors.brand} />
              <Text style={styles.metaText}>{formatDate(e.date)}</Text>
            </View>
            <View style={styles.meta}>
              <Ionicons name="location-outline" size={15} color={colors.brand} />
              <Text style={styles.metaText}>{e.location}</Text>
            </View>
            <Countdown date={e.date} />
            <View style={styles.cta}>
              <Text style={styles.ctaText}>Register & view details</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.brand} />
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: "hidden",
    marginBottom: spacing.md,
    ...shadow.card,
  },
  img: { width: "100%", height: 160 },
  body: { padding: spacing.lg },
  title: { color: colors.ink, fontSize: 20, fontWeight: "800", marginTop: 10 },
  meta: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 },
  metaText: { color: colors.inkSoft, fontSize: 14, flex: 1 },

  countdown: { flexDirection: "row", gap: 8, marginTop: spacing.md },
  cdUnit: {
    backgroundColor: colors.ink,
    borderRadius: radius.sm,
    paddingVertical: 8,
    alignItems: "center",
    minWidth: 56,
  },
  cdValue: { color: colors.white, fontSize: 18, fontWeight: "900" },
  cdLabel: { color: "rgba(255,255,255,0.6)", fontSize: 10, letterSpacing: 1 },

  cta: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: spacing.md },
  ctaText: { color: colors.brand, fontWeight: "800", fontSize: 14 },
});
