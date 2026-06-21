import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Badge, Button } from "@/components/ui";
import { events } from "@/constants/content";
import { colors, radius, shadow, spacing } from "@/constants/theme";

export default function EventDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const event = events.find((e) => e.slug === slug);
  const [form, setForm] = useState({ name: "", email: "" });
  const [registered, setRegistered] = useState(false);

  if (!event) {
    return (
      <View style={styles.center}>
        <Text style={{ color: colors.inkSoft }}>Event not found.</Text>
      </View>
    );
  }

  const date = new Date(event.date);
  const dateLabel = date.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const timeLabel = date.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });

  return (
    <>
      <Stack.Screen options={{ title: event.category }} />
      <ScrollView style={{ backgroundColor: colors.canvas }} contentContainerStyle={{ paddingBottom: 50 }}>
        <View style={styles.hero}>
          <Image source={{ uri: event.image }} style={StyleSheet.absoluteFill} />
          <LinearGradient colors={["transparent", "rgba(17,24,39,0.9)"]} style={StyleSheet.absoluteFill} />
          <View style={styles.heroBody}>
            <Badge label={event.category} tone="gold" />
            <Text style={styles.heroTitle}>{event.title}</Text>
          </View>
        </View>

        <View style={{ padding: spacing.lg }}>
          <View style={styles.metaCard}>
            <Meta icon="calendar" label="Date" value={dateLabel} />
            <Meta icon="time" label="Time" value={timeLabel} />
            <Meta icon="location" label="Location" value={event.location} />
          </View>

          <Text style={styles.h2}>About this event</Text>
          <Text style={styles.body}>{event.excerpt}</Text>
          <Text style={styles.body}>
            Bring your energy and your heart. Volunteers are briefed on arrival,
            provided refreshments, and grouped into teams. Whether you stay an hour
            or the whole day, your presence makes the difference.
          </Text>

          <View style={styles.bullets}>
            {["Free entry · all ages welcome", "Volunteer certificates provided", "Transport from the town centre"].map((b) => (
              <View key={b} style={styles.bullet}>
                <Ionicons name="checkmark-circle" size={18} color={colors.mint} />
                <Text style={styles.bulletText}>{b}</Text>
              </View>
            ))}
          </View>

          {/* Registration */}
          <View style={styles.regCard}>
            {registered ? (
              <View style={{ alignItems: "center", paddingVertical: spacing.md }}>
                <Ionicons name="checkmark-circle" size={44} color={colors.mint} />
                <Text style={styles.regDone}>You&apos;re registered!</Text>
                <Text style={styles.regDoneSub}>A confirmation is on its way to {form.email}.</Text>
              </View>
            ) : (
              <>
                <Text style={styles.regTitle}>Reserve your spot</Text>
                <TextInput style={styles.input} placeholder="Full name" placeholderTextColor={colors.inkFaint} value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} />
                <TextInput style={styles.input} placeholder="Email address" placeholderTextColor={colors.inkFaint} keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={(v) => setForm({ ...form, email: v })} />
                <Button label="Confirm Registration" icon="checkmark" onPress={() => setRegistered(true)} style={{ marginTop: spacing.sm }} />
                <Text style={styles.regFree}>Free · No payment required</Text>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

function Meta({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }) {
  return (
    <View style={styles.meta}>
      <View style={styles.metaIcon}>
        <Ionicons name={icon} size={18} color={colors.brand} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.metaLabel}>{label}</Text>
        <Text style={styles.metaValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.canvas },
  hero: { height: 280, justifyContent: "flex-end" },
  heroBody: { padding: spacing.lg },
  heroTitle: { color: colors.white, fontSize: 28, fontWeight: "900", lineHeight: 34, marginTop: 10 },

  metaCard: {
    backgroundColor: colors.white, borderRadius: radius.lg, borderWidth: 1,
    borderColor: colors.line, padding: spacing.md, gap: spacing.md, ...shadow.card,
  },
  meta: { flexDirection: "row", alignItems: "center", gap: 12 },
  metaIcon: { width: 40, height: 40, borderRadius: radius.sm, backgroundColor: colors.brandSoft, alignItems: "center", justifyContent: "center" },
  metaLabel: { color: colors.inkFaint, fontSize: 11, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5 },
  metaValue: { color: colors.ink, fontSize: 14, fontWeight: "700", marginTop: 1 },

  h2: { color: colors.ink, fontSize: 20, fontWeight: "900", marginTop: spacing.lg },
  body: { color: colors.inkSoft, fontSize: 15, lineHeight: 23, marginTop: 8 },

  bullets: { marginTop: spacing.md, gap: 8 },
  bullet: { flexDirection: "row", alignItems: "center", gap: 8 },
  bulletText: { color: colors.ink, fontSize: 14 },

  regCard: {
    backgroundColor: colors.white, borderRadius: radius.lg, borderWidth: 1,
    borderColor: colors.line, padding: spacing.lg, marginTop: spacing.lg, ...shadow.card,
  },
  regTitle: { color: colors.ink, fontSize: 18, fontWeight: "900", marginBottom: spacing.md },
  input: {
    backgroundColor: colors.canvas, borderRadius: radius.md, borderWidth: 1,
    borderColor: colors.line, paddingHorizontal: 14, paddingVertical: 13,
    fontSize: 15, color: colors.ink, marginBottom: spacing.sm,
  },
  regFree: { textAlign: "center", color: colors.inkFaint, fontSize: 12, marginTop: 10 },
  regDone: { color: colors.ink, fontSize: 20, fontWeight: "900", marginTop: 10 },
  regDoneSub: { color: colors.inkSoft, fontSize: 14, textAlign: "center", marginTop: 4 },
});
