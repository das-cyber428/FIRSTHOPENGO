import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Badge, Button, Card, Counter, SectionHeader } from "@/components/ui";
import {
  heroStats,
  impactStats,
  org,
  programs,
  stories,
} from "@/constants/content";
import { colors, radius, shadow, spacing } from "@/constants/theme";

const HERO_IMG =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80";

const accentColor = { brand: colors.brand, gold: colors.gold, mint: colors.mint };

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ backgroundColor: colors.canvas }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ───── Hero ───── */}
      <View style={styles.hero}>
        <Image source={{ uri: HERO_IMG }} style={StyleSheet.absoluteFill} />
        <LinearGradient
          colors={["rgba(11,95,255,0.82)", "rgba(17,24,39,0.92)"]}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.heroContent, { paddingTop: insets.top + 24 }]}>
          <View style={styles.heroTopRow}>
            <View style={styles.logoDot}>
              <Text style={styles.logoText}>FH</Text>
            </View>
            <Badge label={org.tagline} tone="light" />
          </View>

          <Text style={styles.heroTitle}>
            Creating Hope.{"\n"}
            <Text style={{ color: colors.gold }}>Transforming Lives.</Text>
          </Text>
          <Text style={styles.heroSub}>{org.mission}</Text>

          <View style={styles.heroBtns}>
            <Button
              label="Become a Volunteer"
              variant="gold"
              icon="hand-left"
              onPress={() => router.push("/volunteer")}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </View>

      {/* ───── Hero stats ───── */}
      <View style={styles.statsRow}>
        {heroStats.map((s) => (
          <View key={s.label} style={styles.statPill}>
            <Counter value={s.value} suffix={s.suffix} style={styles.statValue} />
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* ───── Programs preview ───── */}
      <View style={styles.section}>
        <SectionHeader
          eyebrow="What We Do"
          title="Programs built around real needs"
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: spacing.md, paddingRight: spacing.lg }}
        >
          {programs.slice(0, 4).map((p) => (
            <Pressable
              key={p.slug}
              onPress={() => router.push("/programs")}
              style={styles.programCard}
            >
              <Image source={{ uri: p.image }} style={styles.programImg} />
              <View style={styles.programBody}>
                <View
                  style={[styles.dot, { backgroundColor: accentColor[p.accent] }]}
                />
                <Text style={styles.programTitle}>{p.title}</Text>
                <Text style={styles.programStat}>{p.stat}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* ───── Impact ───── */}
      <View style={styles.section}>
        <SectionHeader
          eyebrow="Impact Dashboard"
          title="Numbers that carry stories"
        />
        <View style={styles.impactGrid}>
          {impactStats.map((s) => (
            <Card key={s.label} style={styles.impactCard}>
              <Counter
                value={s.value}
                suffix={s.suffix}
                style={[styles.impactValue, { color: accentColor[s.accent] }]}
              />
              <Text style={styles.impactLabel}>{s.label}</Text>
            </Card>
          ))}
        </View>
      </View>

      {/* ───── Story ───── */}
      <View style={styles.section}>
        <SectionHeader eyebrow="Success Stories" title="Lives changed, in their words" />
        {stories.map((st) => (
          <Card key={st.name} style={{ marginBottom: spacing.md }}>
            <Ionicons name="chatbubble-ellipses" size={26} color={colors.brandSoft} />
            <Text style={styles.quote}>&ldquo;{st.quote}&rdquo;</Text>
            <View style={styles.storyAuthor}>
              <Image source={{ uri: st.image }} style={styles.avatar} />
              <View>
                <Text style={styles.storyName}>{st.name}</Text>
                <Text style={styles.storyRole}>{st.role}</Text>
              </View>
            </View>
          </Card>
        ))}
      </View>

      {/* ───── CTA ───── */}
      <View style={{ paddingHorizontal: spacing.lg }}>
        <LinearGradient
          colors={[colors.brand, colors.mint]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cta}
        >
          <Text style={styles.ctaTitle}>Hope is a verb.{"\n"}Let&apos;s act on it.</Text>
          <Text style={styles.ctaSub}>
            Give an hour or a gift — you become part of a story that ends with a
            child fed and a village rising.
          </Text>
          <Button
            label="Join the Movement"
            variant="light"
            icon="arrow-forward"
            onPress={() => router.push("/volunteer")}
            style={{ marginTop: spacing.md }}
          />
        </LinearGradient>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 440,
    justifyContent: "flex-end",
    overflow: "hidden",
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  heroContent: { padding: spacing.lg, paddingBottom: spacing.xl },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: spacing.lg,
  },
  logoDot: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.brand,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { color: colors.white, fontWeight: "900", fontSize: 15 },
  heroTitle: { color: colors.white, fontSize: 38, fontWeight: "900", lineHeight: 42 },
  heroSub: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 14,
  },
  heroBtns: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg },

  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  statPill: {
    flexGrow: 1,
    flexBasis: "47%",
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.md,
    ...shadow.card,
  },
  statValue: { color: colors.ink, fontSize: 26, fontWeight: "900" },
  statLabel: { color: colors.inkSoft, fontSize: 13, marginTop: 2 },

  section: { paddingHorizontal: spacing.lg, marginTop: spacing.xl },

  programCard: {
    width: 230,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: "hidden",
    ...shadow.card,
  },
  programImg: { width: "100%", height: 130 },
  programBody: { padding: spacing.md },
  dot: { width: 10, height: 10, borderRadius: 5, marginBottom: 8 },
  programTitle: { color: colors.ink, fontSize: 16, fontWeight: "800" },
  programStat: { color: colors.inkSoft, fontSize: 13, marginTop: 4 },

  impactGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  impactCard: { flexGrow: 1, flexBasis: "47%", padding: spacing.md },
  impactValue: { fontSize: 30, fontWeight: "900" },
  impactLabel: { color: colors.inkSoft, fontSize: 13, marginTop: 4 },

  quote: { color: colors.ink, fontSize: 17, lineHeight: 25, fontWeight: "600", marginTop: 10 },
  storyAuthor: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: spacing.md },
  avatar: { width: 44, height: 44, borderRadius: 22 },
  storyName: { color: colors.ink, fontWeight: "800", fontSize: 15 },
  storyRole: { color: colors.inkSoft, fontSize: 13 },

  cta: { borderRadius: radius.xl, padding: spacing.lg, marginTop: spacing.xl },
  ctaTitle: { color: colors.white, fontSize: 26, fontWeight: "900", lineHeight: 32 },
  ctaSub: { color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 21, marginTop: 10 },
});
