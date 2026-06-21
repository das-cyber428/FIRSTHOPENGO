import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, type Href } from "expo-router";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Counter } from "@/components/ui";
import { heroStats, org } from "@/constants/content";
import { colors, radius, shadow, spacing } from "@/constants/theme";

type Item = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  sub: string;
  href?: Href;
  action?: () => void;
};

const links: Item[] = [
  { icon: "hand-left", label: "Become a Volunteer", sub: "Register in 4 quick steps", href: "/volunteer" },
  { icon: "images", label: "Photo Gallery", sub: "Moments of hope", href: "/gallery" },
  { icon: "newspaper", label: "Stories & Blog", sub: "Impact reports & updates", href: "/blog" },
  { icon: "mail", label: "Contact Us", sub: "We'd love to hear from you", href: "/contact" },
];

export default function MoreScreen() {
  const actions: Item[] = [
    {
      icon: "logo-whatsapp",
      label: "Chat on WhatsApp",
      sub: "Typically replies instantly",
      action: () => Linking.openURL(`https://wa.me/${org.whatsapp}`),
    },
    {
      icon: "call",
      label: "Call Us",
      sub: org.phone,
      action: () => Linking.openURL(`tel:${org.phone}`),
    },
    {
      icon: "mail-open",
      label: "Email",
      sub: org.email,
      action: () => Linking.openURL(`mailto:${org.email}`),
    },
  ];

  return (
    <ScrollView
      style={{ backgroundColor: colors.canvas }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Org header */}
      <LinearGradient
        colors={[colors.brand, colors.mint]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.logoDot}>
          <Text style={styles.logoText}>FH</Text>
        </View>
        <Text style={styles.orgName}>{org.name}</Text>
        <Text style={styles.orgTagline}>{org.tagline}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location" size={14} color="rgba(255,255,255,0.85)" />
          <Text style={styles.location}>{org.location}</Text>
        </View>
      </LinearGradient>

      {/* Mini stats */}
      <View style={styles.statsRow}>
        {heroStats.map((s) => (
          <View key={s.label} style={styles.stat}>
            <Counter value={s.value} suffix={s.suffix} style={styles.statValue} />
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle}>Explore</Text>
        {links.map((item) => (
          <Row key={item.label} item={item} onPress={() => item.href && router.push(item.href)} />
        ))}
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle}>Get in Touch</Text>
        {actions.map((item) => (
          <Row key={item.label} item={item} onPress={item.action} />
        ))}
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle}>Language</Text>
        <View style={styles.langRow}>
          {["English", "हिंदी", "অসমীয়া"].map((l, i) => (
            <View key={l} style={[styles.langChip, i === 0 && styles.langChipActive]}>
              <Text style={[styles.langText, i === 0 && styles.langTextActive]}>{l}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.footer}>
        © {new Date().getFullYear()} {org.name} · Made with 💙 in Assam
      </Text>
    </ScrollView>
  );
}

function Row({ item, onPress }: { item: Item; onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, { opacity: pressed ? 0.6 : 1 }]}
    >
      <View style={styles.rowIcon}>
        <Ionicons name={item.icon} size={20} color={colors.brand} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{item.label}</Text>
        <Text style={styles.rowSub}>{item.sub}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.inkFaint} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 70,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  logoDot: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { color: colors.white, fontWeight: "900", fontSize: 18 },
  orgName: { color: colors.white, fontSize: 22, fontWeight: "900", marginTop: 12 },
  orgTagline: { color: "rgba(255,255,255,0.85)", fontSize: 13, letterSpacing: 1, marginTop: 2 },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 10 },
  location: { color: "rgba(255,255,255,0.85)", fontSize: 13 },

  statsRow: {
    flexDirection: "row",
    marginHorizontal: spacing.lg,
    marginTop: -22,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    paddingVertical: spacing.md,
    ...shadow.card,
  },
  stat: { flex: 1, alignItems: "center" },
  statValue: { color: colors.ink, fontSize: 18, fontWeight: "900" },
  statLabel: { color: colors.inkSoft, fontSize: 11, marginTop: 2 },

  group: { paddingHorizontal: spacing.lg, marginTop: spacing.xl },
  groupTitle: {
    color: colors.inkFaint,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  rowIcon: {
    width: 42,
    height: 42,
    borderRadius: radius.sm,
    backgroundColor: colors.brandSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: { color: colors.ink, fontSize: 15, fontWeight: "700" },
  rowSub: { color: colors.inkSoft, fontSize: 13, marginTop: 1 },

  langRow: { flexDirection: "row", gap: spacing.sm },
  langChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
  },
  langChipActive: { backgroundColor: colors.brand, borderColor: colors.brand },
  langText: { color: colors.inkSoft, fontWeight: "700" },
  langTextActive: { color: colors.white },

  footer: { textAlign: "center", color: colors.inkFaint, fontSize: 12, marginTop: spacing.xl },
});
