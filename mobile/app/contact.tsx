import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button } from "@/components/ui";
import { org } from "@/constants/content";
import { colors, radius, shadow, spacing } from "@/constants/theme";

const channels = [
  { icon: "location" as const, label: "Visit Us", value: org.location },
  { icon: "mail" as const, label: "Email", value: org.email, link: `mailto:${org.email}` },
  { icon: "call" as const, label: "Call", value: org.phone, link: `tel:${org.phone}` },
  { icon: "logo-whatsapp" as const, label: "WhatsApp", value: "Chat instantly", link: `https://wa.me/${org.whatsapp}` },
];

export default function ContactScreen() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <ScrollView
      style={{ backgroundColor: colors.canvas }}
      contentContainerStyle={{ padding: spacing.lg, paddingBottom: 60 }}
      keyboardShouldPersistTaps="handled"
    >
      {channels.map((c) => (
        <Pressable
          key={c.label}
          onPress={() => c.link && Linking.openURL(c.link)}
          style={[styles.channel, c.icon === "logo-whatsapp" && styles.channelWhatsapp]}
        >
          <View style={[styles.channelIcon, c.icon === "logo-whatsapp" && { backgroundColor: "#25D366" }]}>
            <Ionicons name={c.icon} size={20} color={c.icon === "logo-whatsapp" ? colors.white : colors.brand} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.channelLabel}>{c.label}</Text>
            <Text style={styles.channelValue}>{c.value}</Text>
          </View>
        </Pressable>
      ))}

      <View style={styles.formCard}>
        {sent ? (
          <View style={{ alignItems: "center", paddingVertical: spacing.lg }}>
            <Ionicons name="checkmark-circle" size={48} color={colors.mint} />
            <Text style={styles.sentTitle}>Message sent!</Text>
            <Text style={styles.sentText}>We&apos;ll reply within one business day.</Text>
          </View>
        ) : (
          <>
            <Text style={styles.formTitle}>Send us a message</Text>
            <TextInput style={styles.input} placeholder="Your name" placeholderTextColor={colors.inkFaint} value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} />
            <TextInput style={styles.input} placeholder="Email address" placeholderTextColor={colors.inkFaint} keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={(v) => setForm({ ...form, email: v })} />
            <TextInput style={[styles.input, styles.textarea]} placeholder="How can we help?" placeholderTextColor={colors.inkFaint} multiline value={form.message} onChangeText={(v) => setForm({ ...form, message: v })} />
            <Button label="Send Message" icon="send" onPress={() => setSent(true)} style={{ marginTop: spacing.sm }} />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  channel: {
    flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: colors.white,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.line, padding: spacing.md,
    marginBottom: spacing.sm,
  },
  channelWhatsapp: { borderColor: "#25D36633", backgroundColor: "#25D3660D" },
  channelIcon: {
    width: 44, height: 44, borderRadius: radius.sm, backgroundColor: colors.brandSoft,
    alignItems: "center", justifyContent: "center",
  },
  channelLabel: { color: colors.inkFaint, fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5 },
  channelValue: { color: colors.ink, fontSize: 15, fontWeight: "700", marginTop: 2 },

  formCard: {
    backgroundColor: colors.white, borderRadius: radius.lg, borderWidth: 1,
    borderColor: colors.line, padding: spacing.lg, marginTop: spacing.md, ...shadow.card,
  },
  formTitle: { color: colors.ink, fontSize: 18, fontWeight: "900", marginBottom: spacing.md },
  input: {
    backgroundColor: colors.canvas, borderRadius: radius.md, borderWidth: 1,
    borderColor: colors.line, paddingHorizontal: 14, paddingVertical: 13,
    fontSize: 15, color: colors.ink, marginBottom: spacing.sm,
  },
  textarea: { height: 110, textAlignVertical: "top" },
  sentTitle: { color: colors.ink, fontSize: 20, fontWeight: "900", marginTop: 12 },
  sentText: { color: colors.inkSoft, fontSize: 14, marginTop: 4 },
});
